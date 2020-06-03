<template>
    <div class="legned-wrapper">
        <div class="curve-legend" v-if="list.length">
            <div
                class="legend-item"
                :class="{ unselected: !item.selected }"
                v-for="(item, index) in list"
                :key="index"
            >
                <span class="icon" :class="['icon-active-' + ((index + 1) % 11)]"></span>
                <span class="text" @click="handleLegendClick(item)">{{ item.label }}</span>
                <span class="close-icon" @click="handleLegendRemove(item)"></span>
            </div>
        </div>
    </div>
</template>

<script>
/**
 * Curve Legend
 */

export default {
    name: "CurveLegend",
    props: {
        data: {
            type: Array,
            default: () => {}
        }
    },
    data: () => ({
        list: []
    }),
    created() {
        this.init();
    },
    methods: {
        _deepClone(value) {
            return JSON.parse(JSON.stringify(value));
        },
        init() {
            this.list = this.data.map(item =>
                Object.assign({ selected: true }, { ...item })
            );
        },
        handleLegendClick(item) {
            item.selected = !item.selected;
            this.$emit("on-change", this._deepClone(this.list));
        },
        handleLegendRemove(item) {
            this.list = this.list.filter(({ label }) => item.label !== label);
            this.$emit("on-remove", { ...item }, this._deepClone(this.list));
        }
    },
    watch: {
        data() {
            this.init();
        }
    }
};
</script>

<style lang="scss" scoped>
$colors: #c23531 #2f4554 #61a0a8 #d48265 #91c7ae #749f83 #ca8622 #bda29a #6e7074
    #546570 #c4ccd3;

.legned-wrapper {
    box-sizing: border-box;
    padding-left: 40px;
    .curve-legend {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        box-sizing: border-box;

        .legend-item {
            display: flex;
            align-items: center;
            height: 20px;
            line-height: 20px;
            cursor: pointer;
            margin-right: 9px;

            .icon {
                width: 6px;
                height: 6px;
                border-radius: 50%;

                @for $i from 1 through length($colors) {
                    &.icon-active-#{$i} {
                        background: nth($colors, $i);
                    }
                }
            }

            .text {
                font-size: 14px;
                color: #afafaf;
                margin-left: 6px;
            }

            .close-icon {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 12px;
                height: 12px;
                position: relative;
                margin-left: 5px;

                &:before,
                &:after {
                    content: "";
                    position: absolute;
                    left: 50%;
                    top: 0px;
                    width: 2px;
                    height: 100%;
                    margin-left: -0.5px;
                    background: #afafaf;
                }

                &:before {
                    transform: rotate(45deg);
                }

                &:after {
                    transform: rotate(-45deg);
                }
                // background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKBAMAAAB/HNKOAAAAFVBMVEXBwcEAAADBwcHBwcHBwcHBwcHBwcHzcVPMAAAABnRSTlPUABWyFh6gg1zPAAAAOUlEQVQI12MIVhQUMmUwYxJUSGZwSFBiY2IQYWNIUGQQdEhjEmQQVACSEBGgrApQFqjSIRmkS8QUAOFoB5Ong3sAAAAAAElFTkSuQmCC")
                //     0 0 no-repeat;
            }

            &.unselected {
                .icon {
                    background: #e4e4e4;
                }

                .text {
                    color: #e4e4e4;
                }

                .close-icon {
                    &:before,
                    &:after {
                        background: #e4e4e4;
                    }
                }
            }
        }
    }
}
</style>