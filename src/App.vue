<template>
    <div id="app">
        <vue-curve :data="data" :tooltip="curveTooltip"></vue-curve>
    </div>
</template>

<script>
import VueCurve from "./components/Curve";

const legends = ["巨量", "广点通"];
const date = ["2020-06-03", "2020-06-04", "2020-06-04", "2020-06-05"];

export default {
    name: "App",
    components: {
        VueCurve
    },
    data: () => ({
        data: [...Array(30)].map((item, index) => {
            return {
                legend: legends[index % 2],
                xAxis: date[index % 4],
                yAxis: Math.floor(Math.random() * 100)
            };
        })
    }),
    methods: {
        curveTooltip(aa) {
            return 2;
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