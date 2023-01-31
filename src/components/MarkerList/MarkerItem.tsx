import { useDispatch } from 'react-redux'
import L from 'leaflet'
import { Marker, Tooltip, useMap } from 'react-leaflet'

import {
  setSingle,
  showEntModal,
  showWaterModal,
  showPollutionWaterModal,
  setTabActiveKey,
  setSelectedEnt,
  getEntSubPoints,
  getMapEnterprise,
  getMapWater,
  getMonitorLatest,
} from '@/store/slice/mapSlice'
import { getEnterprise, getMonitorEnterprise } from '@/store/slice/pollutionSlice';

function MarkerItem ({data}) {
  const map = useMap()
  const dispatch = useDispatch()
  const normalIcon = L.icon({
    iconUrl: data.iconUrl,
    iconSize: [30],
    iconAnchor: [15, 30]
  });
  const largeIcon = L.icon({
    iconUrl: data.iconUrl,
    iconSize: [40],
    iconAnchor: [20, 40]
  });
  const eventHandlers = {
    click: () => {
      if (data.needReloadMark) {
        // 打开企业Modal
        dispatch(showEntModal(true))
        // 关闭水站Modal
        dispatch(showWaterModal(false))
        // 获取企业下的subPoints
        dispatch(getEntSubPoints(data.id))
        // 获取单个企业信息
        dispatch(getMapEnterprise(data.id))
        // 默认tab
        dispatch(setTabActiveKey('1'))
        // 设置需要放大的那个企业
        dispatch(setSelectedEnt(data.id))
      } else if (data.isWaterStation) {
        dispatch(showEntModal(false))
        dispatch(showWaterModal(true))
        // 获取单个水站信息
        dispatch(getMapWater(data.id))
      } else if (data.isSubPoints) {
        dispatch(showEntModal(true))
        dispatch(showWaterModal(false))
        //
        dispatch(showPollutionWaterModal(false))
        if (data.isPollutionWater) {
          dispatch(setTabActiveKey('2'))
        }
        if (data.isPollutionAir) {
          dispatch(setTabActiveKey('1'))
        }
      } else {
        dispatch(showEntModal(false))
        dispatch(showWaterModal(false))
        dispatch(showPollutionWaterModal(true))
        // 设定为单击（pollution页面用）
        dispatch(setSingle(true))
        // 获取废气废水信息
        dispatch(getMonitorLatest(data.id))
        // // 污染源企业概况&手续情况
        dispatch(getEnterprise(data.id))
        // // 检测情况&视频监控
        dispatch(getMonitorEnterprise(data.id))
      }
      // 偏移地图
      map.flyTo([data.position[0] - 0.001, data.position[1] - 0.0005], 18, {duration: 0.15})
    },
  }
  
  return (
    <Marker
      className='HelloMark'
      position={ data.position }
      icon={ data.isBig ? largeIcon : normalIcon }
      eventHandlers={ eventHandlers }
      zIndexOffset={data.isAlarming ? 999 : 0}
    >
      <Tooltip direction='top' offset={[0, -30]} permanent={data.isAlarming}>
        {
          (data.isPollutionWater || data.isPollutionAir || data.isPollutionFacility)
            ? data.enterprise_name + '/'+ data.name ?? '暂无数据'
            : data.name ?? '暂无数据'
        }
      </Tooltip>
    </Marker>
  );
};

export default MarkerItem
