export const UpLeftOpts = {
  tooltip: {
    borderColor: 'transparent',
    trigger: 'item',
    formatter: '{c}家'
  },
  color: ['#3ead91', '#2d62ff', '#f58039', '#684bff', '#54dcff'],
  series: [
    {
      type: 'treemap',
      width: '100%',
      height: '100%',
      top: '0',
      roam: false, //是否开启拖拽漫游（移动和缩放）
      nodeClick: false, //点击节点后的行为,false无反应
      breadcrumb: {
        show: false
      },
      label: { //描述了每个矩形中，文本标签的样式。
        show: true,
        position: ['10%', '40%'],
        fontSize: '18px',
        formatter: '{b}'
      },
      itemStyle: {
        show: true,
        borderWidth: 0,
      },
      // 聚焦某一数据时的表现
      emphasis: {
        // focus: 'self'
      },
      data: []
    }
  ]
};

