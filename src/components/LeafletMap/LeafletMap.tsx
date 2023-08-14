import React, { useEffect, useMemo, useRef, useState } from 'react';
// @ts-ignore
import L from 'leaflet'
import {
  GeoJSON,
  MapContainer,
  TileLayer,
  useMapEvent,
} from 'react-leaflet'
import { Tabs, Menu, Empty, Select } from 'antd';
import classnames from 'classnames'
import { AlertFilled } from '@ant-design/icons'
import { isEmpty } from 'lodash'
// @ts-ignore
import { v4 as uuidv4 } from 'uuid'
// import {CRS} from 'leaflet';
import { Map as LeafletMapType } from "leaflet";
import type {GeoJsonObject} from 'geojson'
import type { SelectProps } from 'antd';

import styles from './LeafletMap.module.less'
import { Modal } from '@/components/Modal';
import { MarkerList } from '@/components/MarkerList';
import warningSvg from '@/assets/svg/leafletMap/warning.svg';
import pointNormal from '@/assets/svg/leafletMap/point-normal.svg';
import pointAlarm from '@/assets/svg/leafletMap/point-alarm.svg';
import iconNormal from '@/assets/img/leafletMap/iconNormal.png';
import noData from '@/assets/img/noData.png';
import {
  BOOT_SLICE,
  MAP_SLICE,
  NANCHENG_CENTER,
  POLLUTION_CENTER,
  POLLUTION_SLICE,
  ROOT_SLICE, SYNTHESIS_SLICE,
  WATER_CENTER
} from '@/constant';
import { VideoIcon } from '@/components/CustomSvg';
import TabChildren from './TabChildren';
import {
  setSingle,
  showEntModal,
  showWaterModal,
  showPollutionWaterModal,
  setTabActiveKey,
  getMapPoints,
  getMonitorLatest,
  resetEntInfo, resetSubPoints, setSelectedEnt
} from '@/store/slice/mapSlice';
import { getEnterprise, getMonitorEnterprise, resetEnterprise } from '@/store/slice/pollutionSlice'
import { transferType } from '@/utils/structUtil'
import nancheng from './nancheng-geoJson.json';
import { RootState, useAppDispatch, useAppSelector} from "@/store";
import {
  IEntMapPointsFetchData,
  InitialStateData,
  TAirItem,
  TEntItem,
  TOptionsItem, TPmsMapPointsItem, TWmsItem
} from "@/store/types/mapTypes";

// 修改leaflet默认的图标
// 图标必须放在public文件夹下
Object.assign(L.Icon.Default.prototype.options, {
  iconUrl: '/enterprise.svg',
  iconSize: [30],
  shadowUrl: ''
})

function LeafletMap () {
  const leafletMap = useAppSelector((state:RootState) => state[MAP_SLICE])
  const root = useAppSelector((state:RootState) => state[ROOT_SLICE])
  const boot = useAppSelector((state:RootState) => state[BOOT_SLICE])
  const pollution = useAppSelector((state:RootState) => state[POLLUTION_SLICE])
  const synthesis = useAppSelector((state:RootState) => state[SYNTHESIS_SLICE])
  const dispatch = useAppDispatch()
  // const rootSubmenuKeys = pollution.enterpriseList.map(item => item.key);
  const [list, setList] = useState<InitialStateData['mapPoints']>([])
  const mapRef = useRef<LeafletMapType| null>(null)
  const [video, setVideoUrl] = useState<{url: string,name: string}>({url: '',name: ''})
  const [waterVideo, setWaterVideoUrl] = useState<{url: string, name:string}>({url: '', name:''})
  const [statistics, setStatistics] = useState<IEntMapPointsFetchData['state']>({} as IEntMapPointsFetchData['state'])
  
  useEffect(() => {
    dispatch(getMapPoints(root.module))
  }, [root.module, leafletMap.selectedEntId])
  useEffect(() => setList([...leafletMap.mapPoints, ...leafletMap.subPoints]), [leafletMap.mapPoints, leafletMap.subPoints])
  useEffect(() => {
    if (root.module === 'water') {
      (mapRef.current as LeafletMapType).setView(WATER_CENTER.axis, WATER_CENTER.zoom)
    } else if (root.module === 'synthesis') {
      (mapRef.current as LeafletMapType).setView(NANCHENG_CENTER.axis, NANCHENG_CENTER.zoom)
    } else if (root.module === 'pollution') {
      (mapRef.current as LeafletMapType).setView(POLLUTION_CENTER.axis, POLLUTION_CENTER.zoom)
    }
  }, [root.module])
  
  function handleAlarmIcon (type:string, item:TEntItem | TWmsItem | TPmsMapPointsItem, isAlarm:boolean) {
    item.isAlarming = isAlarm
    switch (type) {
      case 'ent':
        return {
          ...item,
          isBig: isAlarm,
          iconUrl: `/enterprise${ isAlarm ? '-alarm' : '' }.svg`,
          renderId: uuidv4()
        }
      case 'waterStation':
        return {
          ...item,
          isBig: isAlarm,
          iconUrl: `/water${ isAlarm ? '-alarm' : '' }.svg`,
          renderId: uuidv4()
        }
      case 'pollution-air-alarm':
        return {
          ...item,
          isBig: isAlarm,
          iconUrl: `/pollution-air${ isAlarm ? '-alarm' : '' }.svg`,
          renderId: uuidv4()
        }
      case 'pollution-water-alarm':
        return {
          ...item,
          isBig: isAlarm,
          iconUrl: `/pollution-water${ isAlarm ? '-alarm' : '' }.svg`,
          renderId: uuidv4()
        }
      case 'facility-alarm':
        return {
          ...item,
          isBig: isAlarm,
          iconUrl: `/facility${ isAlarm ? '-alarm' : '' }.svg`,
          renderId: uuidv4()
        }
      default:
        return item
    }
  }
  
  function handleAlarmingPoints (pre:InitialStateData['mapPoints'], alarmingPoints:string[]) {
    let newArr: Array<TEntItem | TWmsItem | TPmsMapPointsItem> = []
    if (!pre) return []
    pre.forEach(p => {
      let found = alarmingPoints.find(points => points === p.id.toString())
      if (found) {
        let temp
        if (p.type === 'air' || p.type === '100001') {
          temp = handleAlarmIcon('pollution-air-alarm', {...p}, true)
        } else if (p.type === 'water' || p.type === '100002') {
          temp = handleAlarmIcon('pollution-water-alarm', {...p}, true)
        } else if (p.type === 'facility') {
          temp = handleAlarmIcon('facility-alarm', {...p}, true)
        } else {
          console.log(alarmingPoints)
          console.log(p.type,'found')
          temp = handleAlarmIcon('ent', {...p}, true)
        }
        newArr.push(temp)
      } else if (!found && p.isAlarming) {
        let temp
        if (p.type === 'air') {
          temp = handleAlarmIcon('pollution-air-alarm', {...p}, false)
        } else if (p.type === 'water') {
          temp = handleAlarmIcon('pollution-water-alarm', {...p}, false)
        } else if (p.type === 'facility') {
          temp = handleAlarmIcon('facility-alarm', {...p}, false)
        } else {
          temp = handleAlarmIcon('ent', {...p}, false)
        }
        newArr.push(temp)
      } else {
        newArr.push(p)
      }
    })
    return newArr
  }
  
  useEffect(() => {
    setList(pre => {
      return handleAlarmingPoints(pre, synthesis.alarmingPoints as string[]) ?? []
    })
  }, [synthesis.alarmingPoints])
  useEffect(() => {
    setStatistics(leafletMap.statistics as IEntMapPointsFetchData['state'])
  }, [leafletMap.statistics])
  
  function entCancel () {
    // 关闭企业Modal
    dispatch(showEntModal(false));
    // 取消single模式
    dispatch(setSingle(false))
    // 重新设定map视图
    const map = mapRef.current as LeafletMapType
    map.flyTo(NANCHENG_CENTER.axis, NANCHENG_CENTER.zoom, {duration: 0.15})
    // 置空store中的企业数据（entInfo）
    dispatch(resetEntInfo({}))
    // 置空selectedEntId
    dispatch(setSelectedEnt(''))
    // 置空子mark
    dispatch(resetSubPoints([]))
    dispatch(getMapPoints(root.module))
  }
  
  function waterCancel () {
    // close Modal
    dispatch(showWaterModal(false))
    dispatch(setSingle(false))
    // map relocate
    const map = mapRef.current as LeafletMapType
    map.setView(NANCHENG_CENTER.axis, NANCHENG_CENTER.zoom, {duration: 0.15})
  }
  
  function waterQualityTransfer () {
    // console.log(boot.idTable.name(data),'test')
  }
  
  function onCameraSelect (value:string, opts:TOptionsItem) {
    setVideoUrl(() => ({...video, ...{url: value, name: opts.label}}))
  }
  
  function onWaterStationCameraSelect (value:string, opts:TOptionsItem) {
    setWaterVideoUrl(() => ({...video, ...{url: value, name: opts.label}}))
  }
  
  function isTabAlarming (tabData:Array<TAirItem>) {
    if (isEmpty(tabData)) return false
    let found = tabData.find(t => (t.alarm === 2) || (t.alarm === 1))
    if (found) {
      return true
    } else {
      return false
    }
  }
  
  function onTabFly () {
    const map = mapRef.current as LeafletMapType
    map.flyTo([27.554329375563494, 116.64980226978534], 18, {duration: 0.15})
  }
  // console.log(pollution, "pollution")
  console.log(leafletMap, 'leafletMap')
  
  return useMemo(() =>
      <div className={ styles.LeafletMap } id='leafletMap'>
        {/*综合统计浮窗*/ }
        <div
          className={ styles.floatWrap }
          style={ root.module === 'synthesis' ? {display: 'flex'} : {display: 'none'} }
        >
          <div className={ statistics?.total > 0 ? styles.alarmFloat : styles.normalFloat }>
            <div className={ styles.title }>
              <img src={ statistics?.total > 0 ? warningSvg : iconNormal } alt=''/>
              <span>
              正在报警
            </span>
              <span className={ styles.total }>{ statistics?.total ?? 0 }</span>
              <span>处</span>
            </div>
            <div className={ styles.list }>
              <div className={ styles.listItem }>
                <span>污染源监控：</span>
                <span>{ statistics?.cate?.pms ?? 0 }</span>
              </div>
              <div className={ styles.listItem }>
                <span>治污设施：</span>
                <span>{ statistics?.cate?.fms ?? 0 }</span>
              </div>
              {/*<div className={ styles.listItem }>*/ }
              {/*  <span>废水监控：</span>*/ }
              {/*  <span>{ leafletMap.statistics?.cate?.wms ?? 0 }</span>*/ }
              {/*</div>*/ }
              <div className={ styles.listItem }>
                <span>地表水站：</span>
                <span>{ statistics?.cate?.wms ?? 0 }</span>
              </div>
              <div className={ styles.listItem }>
                <span>证后监督：</span>
                <span>{ statistics?.cate?.examen ?? 0 }</span>
              </div>
            </div>
          </div>
        
        </div>
        <MapContainer
          className={ styles.map }
          // crs={CRS.EPSG4326}
          center={ root.module === 'water' ? WATER_CENTER.axis : NANCHENG_CENTER.axis }
          zoom={ root.module === 'water' ? WATER_CENTER.zoom : NANCHENG_CENTER.zoom }
          scrollWheelZoom={ true }
          doubleClickZoom={ false }
          //@ts-ignore
          whenReady={ (map) => {
            mapRef.current = map.target
          } }
        >
          <TileLayer
            url='http://t{s}.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=eb5dc46c8e9cb17edc6e9579368a5951'
            subdomains={ ['0', '1', '2', '3', '4', '5', '6', '7'] }
          />
          {/*<TileLayer*/}
          {/*  url='http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=eb5dc46c8e9cb17edc6e9579368a5951'*/}
          {/*/>*/}
          <TileLayer
            url='http://t{s}.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=eb5dc46c8e9cb17edc6e9579368a5951'
            subdomains={ ['0', '1', '2', '3', '4', '5', '6', '7'] }
          />
          {/*<TileLayer*/ }
          {/*  url='http://t{s}.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=eb5dc46c8e9cb17edc6e9579368a5951'*/ }
          {/*  subdomains={ ['0', '1', '2', '3', '4', '5', '6', '7'] }*/ }
          {/*/>*/ }
          
          <MarkerList list={ list }/>
          <GeoJSON data={ nancheng as GeoJsonObject }></GeoJSON>
        </MapContainer>
        {/*点击企业的浮窗*/ }
        <Modal
          show={ leafletMap.entShow }
          // show={ true }
          onCancel={ entCancel }
        >
          <div slot='title'>
            <div className={ styles.mainTitle }>
              { leafletMap.entInfo?.info?.enterprise_name ?? '无数据' }
            </div>
            <div className={ styles.subTitle }>
              { leafletMap.entInfo?.info?.metadata?.register_address ?? '无数据' }
            </div>
          </div>
          <div slot='default' className={ styles.entDefault }>
            <Tabs
              defaultActiveKey='1'
              animated={ false }
              activeKey={ leafletMap.tabActiveKey }
              onTabClick={ key => dispatch(setTabActiveKey(key)) }
              items={ [
                {
                  label: (
                    <span>
                      {
                        isTabAlarming(leafletMap.entInfo?.air)
                          ? <AlertFilled style={ {color: 'red', marginRight: '6px'} }/>
                          : ''
                      }
                      废气监控
                      </span>
                  ),
                  key: '1',
                  children:
                    leafletMap.entInfo?.air?.length > 0
                      ? leafletMap.entInfo.air.map((item, index) => <TabChildren key={ index } data={ item }
                                                                                 onTabFly={ onTabFly }/>)
                      : <Empty image={ noData } imageStyle={ {height: 60,} }/>,
                },
                {
                  label: (
                    <span>
                      {
                        isTabAlarming(leafletMap.entInfo?.water)
                          ? <AlertFilled style={ {color: 'red', marginRight: '6px'} }/>
                          : ''
                      }
                      废水监控
                      </span>
                  ),
                  key: '2',
                  children:
                    leafletMap.entInfo?.water?.length > 0
                      ? leafletMap.entInfo.water.map((item, index) => <TabChildren key={ index } data={ item }
                                                                                   onTabFly={ onTabFly }/>)
                      : <Empty image={ noData } imageStyle={ {height: 60,} }/>,
                  style: {color: 'red'}
                },
                {
                  label: (
                    <span>
                      {
                        isTabAlarming(leafletMap.entInfo?.facility)
                          ? <AlertFilled style={ {color: 'red', marginRight: '6px'} }/>
                          : ''
                      }
                      治污设施
                      </span>
                  ),
                  key: '3',
                  children:
                    leafletMap.entInfo?.facility?.length > 0
                      ? leafletMap.entInfo.facility.map((item, index) => <TabChildren key={ index } data={ item }
                                                                                      onTabFly={ onTabFly }/>)
                      : <Empty image={ noData } imageStyle={ {height: 60,} }/>,
                },
                {
                  label: '证后监管',
                  key: '4',
                  children: <Empty image={ noData } imageStyle={ {height: 60,} }/>,
                },
              ] }
            />
          </div>
          <div slot='video' className={ classnames(styles.video) }>
            {/*pollution的时候不显示*/ }
            <div>
              <VideoIcon/>
              <span style={ {marginLeft: '5px'} }>视频监控</span>
            </div>
            <Select
              // defaultValue='lucy'
              value={ video.name }
              placeholder='请选择摄像头'
              bordered={ false }
              style={ {color: 'white', border: '1px solid #75FBFD'} }
              options={ leafletMap.cameraOptions }
              onSelect={ onCameraSelect }
            />
            <div className={ styles['video-body'] }>
            </div>
            {/*<img src={ videoImg } alt='' width='100%'/>*/ }
          </div>
        </Modal>
        {/*点击水站的浮窗*/ }
        <Modal
          show={ leafletMap.waterShow }
          // show={ true }
          onCancel={ waterCancel }
        >
          <div slot='title'>
            <div className={ styles.mainTitle }>
              { leafletMap.waterInfo?.point?.name ?? '暂无数据' }
            </div>
            <div className={ styles.subTitle }>
              { leafletMap.waterInfo?.point?.metadata?.point_location ?? '暂无数据' }
            </div>
          </div>
          <div slot='default' className={ styles.waterDefault }>
            <div className={ styles.infoWrap }>
              <div className={ styles.info }>
                <div className={ styles.infoItem }>
                  <span>水体种类：</span>
                  <span className={ styles.waterCate }>{ leafletMap.waterInfo?.point?.water_cate ?? '暂无数据' }</span>
                </div>
                <div className={ styles.infoItem }>
                  <span>设备名称：</span>
                  <span>{ leafletMap.waterInfo?.facility?.name ?? '暂无数据' }</span>
                </div>
                <div className={ styles.infoItem }>
                  <span>生产产商：</span>
                  <span>{ leafletMap.waterInfo?.facility?.metadata?.manufacturer ?? '暂无数据' }</span>
                </div>
                <div className={ styles.infoItem }>
                  <span>唯一识别码：</span>
                  <span>{ leafletMap.waterInfo?.facility?.key ?? '暂无数据' }</span>
                </div>
              </div>
              <div className={ styles.waterQuality }>
                <div>水质类别：</div>
                <div>
                  Ⅰ 类
                </div>
              </div>
            </div>
            <div className={ styles.chemical }>
              {
                leafletMap.waterInfo?.latest?.length > 0
                  ? leafletMap.waterInfo?.latest.map(() =>
                    <div className={ styles.item }>
                      <div className='flex justify-center'>总磷</div>
                      <div>335.99</div>
                      <div>ug/L</div>
                    </div>)
                  : <Empty image={ noData } imageStyle={ {height: 60,} }/>
              }
            </div>
          </div>
          <div slot='video' className={ styles.video }>
            {/*pollution的时候不显示*/ }
            <div>
              <VideoIcon/>
              <span style={ {marginLeft: '5px'} }>视频监控</span>
            </div>
            <Select
              // defaultValue='lucy'
              value={ waterVideo.name }
              placeholder='请选择摄像头'
              bordered={ false }
              style={ {color: 'white', border: '1px solid #75FBFD'} }
              options={ leafletMap.waterStationCameraOptions }
              onSelect={ onWaterStationCameraSelect }
            />
            <div className={ styles['video-body'] }>

            </div>
          </div>
        </Modal>
      </div>
    , [leafletMap, pollution.enterpriseList, list, root.module, video])
}

export default LeafletMap
