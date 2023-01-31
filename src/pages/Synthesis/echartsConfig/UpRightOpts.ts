import * as echarts from 'echarts'

export const UpRightOpts = {
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    top: '3%',
    left: '10%',
    right: '0.5%',
    bottom: '15%'
  },
  xAxis: [{
    type: 'category',
    // data: synthesis.wms.xData ?? [],
    data: [],
    axisLine: {
      lineStyle: {
        color: 'rgba(255,255,255,0.12)'
      }
    },
    axisLabel: {
      margin: 10,
      color: '#e2e9ff',
      fontSize: 14,
      interval: 0,
    },
  }],
  yAxis: [{
    data: [' ','Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', '劣Ⅴ'],
    axisLabel: {
      formatter: '{value}',
      // formatter: function (value) {
      //   if (value === 0) {
      //     console.log('wo shi 0')
      //     return ''
      //   }
      // },
      color: '#e2e9ff',
    },
    axisLine: {
      show: false
    },
    splitLine: {
      show: false
    }
  }],
  series: [{
    type: 'bar',
    // data: synthesis.wms.seriesData ?? [],
    data: [],
    barWidth: '20px',
    itemStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(0,244,255,1)' // 0% 处的颜色
      }, {
        offset: 1,
        color: 'rgba(0,77,167,1)' // 100% 处的颜色
      }], false),
      shadowColor: 'rgba(0,160,221,1)',
      shadowBlur: 4,
    },
    label: {
      show: true,
      lineHeight: 30,
      width: 50,
      height: 30,
      // backgroundColor: 'rgba(0,160,221,0.1)',
      borderRadius: 200,
      // position: ['-8', '-60'],
      distance: 1,
      formatter: function({data}){
        if (data === ' ') return '无数据'
        return data
      },
      // formatter: [
      //   '    {d|●}',
      //   ' {a|{c}}     \n',
      //   '    {b|}'
      // ].join(','),
      // rich: {
      //   d: {
      //     color: '#3CDDCF',
      //   },
      //   a: {
      //     color: '#fff',
      //     align: 'center',
      //   },
      //   b: {
      //     width: 1,
      //     height: 30,
      //     borderWidth: 1,
      //     borderColor: '#234e6c',
      //     align: 'left'
      //   },
      // }
    }
  }]
};
