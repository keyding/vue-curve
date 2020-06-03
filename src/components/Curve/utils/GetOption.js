
import { LINE_COLOR, LABEL_COLOR } from './Constants';
import GetSerie from './GetSerie';

export default function (xAxis = [], series = []) {
    return {
        tooltip: {
            trigger: "axis",
            backgroundColor: "#322F4B",
            padding: [12, 17],
            axisPointer: {
                lineStyle: {
                    color: LINE_COLOR
                }
            },
            transitionDuration: 0
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            top: "5%",
            containLabel: true
        },
        textStyle: {
            color: LABEL_COLOR,
            fontSize: 12
        },
        xAxis: {
            type: "category",
            boundaryGap: false,
            data: xAxis,
            axisLine: {
                lineStyle: {
                    color: LINE_COLOR
                }
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: "value",
            axisLine: {
                lineStyle: {
                    color: LINE_COLOR
                }
            },
            axisTick: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: LINE_COLOR
                }
            }
        },
        series: series.map(GetSerie)
    }
}