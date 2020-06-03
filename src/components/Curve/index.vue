<template>
    <div class="curve-wrapper">
        <Legend :data="legends" @on-change="handleLegendChange" @on-remove="handleLegendRemove"></Legend>
        <div class="curve" ref="curve"></div>
    </div>
</template>

<script>
/**
 * Vue Curve
 */
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import GetOption from "./utils/GetOption";

import Legend from "./Legend";

export default {
    name: "VueCureve",
    props: {
        data: {
            type: Array,
            default: () => []
        },
        tooltip: {
            type: Function
        }
    },
    components: {
        Legend
    },
    data: () => ({
        legends: [],
        localData: []
    }),
    mounted() {
        this.init();
        this.handleResize();
    },
    methods: {
        init() {
            this.localData = this.data.map(item =>
                Object.assign({ hide: false }, { ...item })
            );

            if (this.localData.length) {
                this.initEcharts();
                this.updateLegends();
                this.updateOption();
            } else {
                this.destoryEcharts();
            }
        },
        initEcharts() {
            this.echartIns = this.echartIns || echarts.init(this.$refs.curve);
        },
        destoryEcharts() {
            this.echartIns && this.echartIns.destory();
            this.echartIns = null;
        },
        // 处理页面 resize 时，图表自适应缩放
        handleResize() {
            window.addEventListener("resize", this.bindEchartsResize);

            this.$once("hook:beforeDestroy", () => {
                window.removeEventListener("resize", this.bindEchartsResize);
            });
        },
        bindEchartsResize() {
            this.echartIns && this.echartIns.resize();
        },
        updateOption() {
            const _legends =
                this.legends ||
                [
                    ...new Set(this.localData.map(({ legend }) => legend))
                ].map(label => ({ label }));

            const xAxis = [
                ...new Set(this.localData.map(({ xAxis }) => xAxis))
            ];

            const yAxis = _legends.map(({ label }) => ({
                legend: label,
                data: this.localData
                    .filter(item => !item.hide && item.legend === label)
                    .map(({ yAxis }) => yAxis)
            }));

            const option = GetOption(xAxis, yAxis); //tooltip

            if (this.tooltip) {
                option.tooltip.formatter = this.tooltip;
            }

            this.echartIns && this.echartIns.setOption(option, true);
        },
        updateLegends(data) {
            this.legends =
                data ||
                [
                    ...new Set(this.localData.map(({ legend }) => legend))
                ].map(label => ({ label }));
        },
        // 图例选中切换
        handleLegendChange(legends) {
            const filterLegends = legends.filter(({ selected }) => selected);
            const legendLabels = filterLegends.map(({ label }) => label);

            this.localData.forEach(item => {
                const { legend } = item;
                item.hide = !legendLabels.includes(legend);
            });

            this.updateOption();
        },
        // 图例删除
        handleLegendRemove(item, legends) {
            const { label } = item;

            this.updateLegends(legends);

            this.localData = this.localData.filter(
                ({ legend }) => legend !== label
            );

            this.updateOption();
        }
    }
};
</script>

<style lang="scss" scoped>
.curve-wrapper {
    width: 100%;
    box-sizing: border-box;

    .curve {
        width: 100%;
        min-height: 360px;
        box-sizing: border-box;
    }
}
</style>