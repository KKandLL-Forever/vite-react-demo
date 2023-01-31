import {PieSeriesOption} from 'echarts'
const colorRightTop = [
  '#54dcff',
  '#3ead91',
  '#2d62ff',
  '#f58039',
  '#684bff',
];
const legendData: never[] = [
  // '污泥',
  // '废酸',
  // '金属碎屑',
  // '其他'
];
const seriesData: any[] = [
  // {'name': '污泥', 'value': 30},
  // {'name': '废酸', 'value': 10},
  // {'name': '金属碎屑', 'value': 15},
  // {'name': '其他', 'value': 12}
]
// https://www.makeapie.cn/echarts_content/xzpJWdcQCX.html
export const BottomRightOpts:PieSeriesOption = {
// @ts-ignore
  backgroundColor: 'transparent',
  color: colorRightTop,
  grid: {
    top: 0,
    left: 0,
    right: '1%',
    bottom: 0,
    containLabel: true,
  },
  legend: {
    orient: 'vertical',
    top: 'center',
    right: 30,
    textStyle: {
      align: 'left',
      verticalAlign: 'middle',
      rich: {
        name: {
          color: 'rgba(255,255,255,0.5)',
          fontSize: 10,
        },
        value: {
          color: 'rgba(255,255,255,0.5)',
          fontSize: 10,
        },
        rate: {
          color: 'rgba(255,255,255,0.9)',
          fontSize: 10,
        },
      },
    },
    data: legendData,
    formatter: (name: any) => {
      if (seriesData.length) {
        const item = seriesData.filter((item) => item.name === name)[0];
        return `{name|${ name }：}{rate|${ item.value }%}`;
      }
    },
  },
  series: [{
    name: '占比',
    type: 'pie',
    center: ['30%', '50%'],
    radius: ['45%', '65%'],
    label: {
      show: false,
      position: 'center',
      formatter: '{value|{c}}\n{label|{b}}',
      rich: {
        value: {
          padding: 5,
          align: 'center',
          verticalAlign: 'middle',
          fontSize: 32,
        },
        label: {
          align: 'center',
          verticalAlign: 'middle',
          fontSize: 16,
        },
      },
    },
    emphasis: {
      label: {
        show: true,
        fontSize: '8',
      }
    },
    labelLine: {
      show: false,
      length: 0,
      length2: 0,
    },
    data: seriesData,
  }],
};

