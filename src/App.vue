<template>
    <div id="app">
        <vue-curve style="margin: 20px;"></vue-curve>
    </div>
</template>

<script>
import VueCurve from "./components/Curve";

export default {
    name: "App",
    components: {
        VueCurve
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
}
</style>