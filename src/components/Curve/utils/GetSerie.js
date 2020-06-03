// 曲线的基本配置
const SERIE_BASE_CONFIG = {
    type: "line",
    smooth: true,
    symbol: "circle",
    symbolSize: 1,
    showSymbol: false,
    lineStyle: {
        width: 2
    }
};

export default (serie) => {
    const { legend, data = [] } = serie;

    return Object.assign(
        {
            name: legend,
            type: "line",
            data
        },
        SERIE_BASE_CONFIG
    )
}