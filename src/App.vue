<template>
    <div id="app">
        <vue-curve :data="data" :tooltip="curveTooltip" style="margin-top: 100px;"></vue-curve>
    </div>
</template>

<script>
import VueCurve from "./components/Curve";
import { rows, columns, param, data } from "./data";
import { combinePaths } from "./utils";

const xAxis = combinePaths(...rows.map(({ values }) => values));

const legend =
    columns.length > 1
        ? combinePaths(...columns.map(({ values }) => values))
        : columns[0].values;

const curveData = [];

xAxis.forEach(_xAxis => {
    legend.forEach(_legend => {
        curveData.push({
            xAxis: _xAxis.replace("__", "\n"),
            legend: _legend,
            yAxis: Math.floor(Math.random() * 100)
        });
    });
});

export default {
    name: "App",
    components: {
        VueCurve
    },
    data: () => ({
        data: curveData
    }),
    methods: {
        curveTooltip(tooltip) {
            const content = tooltip
                .map(item => {
                    const { seriesName, value } = item;
                    return `<div>${seriesName}</div><div>${param.label}: ${value}</div>`;
                })
                .join("");
            return `<div style="box-sizing: border-box; padding: 12px 17px; max-height: 400px; overflow-y: auto;"><div>${tooltip[0].axisValue.replace(
                "\n",
                " "
            )}</div>${content}</div>`;
        }
    }
};
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
}
html,
body {
    height: 100%;
    box-sizing: border-box;
}

body {
    padding: 20px;
}
</style>