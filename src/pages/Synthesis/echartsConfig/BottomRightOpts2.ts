import * as echarts from 'echarts'

const charts = {
  unit: 'Kbps',
  names: ['库存量', '转移量'],
  lineX: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  value: [
    [451, 352, 303, 534, 95, 236, 217, 328, 159, 151, 231, 192],
    [360, 545, 80, 192, 330, 580, 192, 80, 250, 453, 352, 28]
  ]
}
const color = ['rgba(84,220,255,1)', 'rgba(62,173,145,1)']
const lineY = []
for (let i = 0; i < charts.names.length; i++) {
  let x = i
  if (x > color.length - 1) {
    x = color.length - 1
  }
  let data = {
    name: charts.names[i],
    type: 'line',
    color: color[x],
    smooth: true,
    areaStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: color[x]
      }, {
        offset: 0.8,
        color: color[x].replace(',1)', ',0)')
      }], false),
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowBlur: 10
    },
    symbol: 'circle',
    symbolSize: 5,
    // data: charts.value[i]
    data: []
  }
  lineY.push(data)
}
export const BottomRightOpts2 = {
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    // data: charts.names,
    data: [],
    textStyle: {
      fontSize: 12,
      color: 'rgb(255,255,255,0.9)'
    },
    right: '4%'
  },
  grid: {
    top: '15%',
    left: '1%',
    // right: '1%',
    bottom: '5%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: charts.lineX,
    axisLabel: {
      color: 'rgb(255,255,255,0.9)',
      formatter: function (params) {
        return params
      }
    },
    min: 0,
    max: 11,
    interval: 2
  },
  yAxis: {
    name: charts.unit,
    nameTextStyle: {
      color: 'rgb(255,255,255,0.9)',
      align: 'left'
    },
    type: 'value',
    axisLabel: {
      formatter: '{value}',
      color: 'rgb(255,255,255,0.9)'
    },
    splitLine: {
      show: false,
    },
    axisLine: {
      show: false,
    }
  },
  series: lineY
}

