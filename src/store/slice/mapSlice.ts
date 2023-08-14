import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid'
import {
  ALARMING,
  GB2018_BASE_KEY,
  GET_ENT_SUB_POINTS,
  GET_MAP_ENTERPRISE,
  GET_MAP_POINTS,
  GET_MAP_WATER,
  GET_MONITOR_LATEST,
  MAP_SLICE,
  POLLUTION_AIR_TYPE,
  POLLUTION_WATER_TYPE,
  PREALARMING,
  VIDEO_FORMAT
} from '@/constant';
import request, { API_URL } from '@/service/axios'
import {
  ISynthesisEnterpriseBigIcon,
  ISynthesisEnterpriseIcon,
  ISynthesisWaterStationIcon,
  Pollution_Air_Alarm_Icon,
  Pollution_Air_Icon,
  Pollution_Facility_Icon,
  Pollution_Water_Alarm_Icon,
  Pollution_Water_Icon,
  Synthesis_Enterprise_Big_Icon,
  Synthesis_Enterprise_Icon,
  Synthesis_waterStation_Icon
} from '@/constant/MapIconConfig'
import store from '../index';
import { convertAxis } from '@/utils/structUtil'
import {
  IEntMapPointsFetchData, IMapEnterpriseFetch, IMapWaterFetch, IMonitorLatest, InitialStateData, IOptions,
  IPmsMapPointsFetchData, TCameraItem,
  TEntItem,
  TEntMapPointsData, TOptionsItem,
  TPmsMapPointsItem, TWaterMapPointsFetch,
  TWmsItem,
} from "@/store/types/mapTypes";

const handleAlarmIcon = (type: string, map: Map<string, string>, item: TEntItem | TWmsItem | TPmsMapPointsItem) => {
  if (map.has(item.id.toString())) {
    item.isAlarming = true
    switch (type) {
      case 'ent':
        item.isBig = true
        item.iconUrl = '/enterprise-alarm.svg'
        break;
      case 'waterStation':
        item.isBig = true
        item.iconUrl = '/water-alarm.svg'
        break;
      case 'pollution-air-alarm':
        item.isBig = true
        item.iconUrl = '/pollution-air-alarm.svg'
        break;
      case 'pollution-water-alarm':
        item.isBig = true
        item.iconUrl = '/pollution-water-alarm.svg'
        break;
      case 'facility-alarm':
        item.isBig = true
        item.iconUrl = '/facility-alarm.svg'
        break;
      default:
        return
    }
  }
}

export const getMapPoints = createAsyncThunk<
  InitialStateData['mapPoints'],
  string
>(
  GET_MAP_POINTS,
// @ts-ignore
  async (payload) => {
    switch (payload) {
      case 'synthesis':
        // console.log(payload,'ppp')
        const synthesis = await request<IEntMapPointsFetchData>('/imc/comprehensive/map/points', {})
        const enterprise: TEntMapPointsData = synthesis.ent
        const water: IEntMapPointsFetchData['wms'] = synthesis.wms
        const statistics: IEntMapPointsFetchData['state'] = synthesis.state ?? {}
        const alarmIds = synthesis.state?.point ?? {}
        const {selectedEntId} = store.getState().map_slice
  
        let idsMap = new Map<string, string>()
        // console.log(synthesisData.state,'alarmIds')
        Object.keys(alarmIds).forEach(id => idsMap.set(id, ''))
  
        store.dispatch(saveAlarmIds(alarmIds))
  
        if (enterprise.length === 0 && water.length === 0) return []
  
        let enterpriseConfig: ISynthesisEnterpriseIcon = Synthesis_Enterprise_Icon
        let waterConfig: ISynthesisWaterStationIcon = Synthesis_waterStation_Icon
        let bigEnterpriseConfig: ISynthesisEnterpriseBigIcon = Synthesis_Enterprise_Big_Icon
  
        enterprise.forEach(item => {
          let {lat, lng} = convertAxis(item.lng, item.lat)
          item.lat = lat
          item.lng = lng
          if (!selectedEntId) {
            enterpriseConfig.position = [parseFloat(item.lat), parseFloat(item.lng)]
            Object.assign(item, enterpriseConfig, {renderId: uuidv4()})
          }else{
            if (item.id === selectedEntId.toString()) {
              // 单独处理被选中的企业,用放大的icon
              bigEnterpriseConfig.position = [parseFloat(item.lat), parseFloat(item.lng)]
              Object.assign(item, bigEnterpriseConfig, {renderId: uuidv4()})
            }
          }
          // 处理报警的图标
          handleAlarmIcon('ent', idsMap, item)
        })
  
        water.forEach(item => {
          let {lat, lng} = convertAxis(item.lng, item.lat)
          item.lat = lat
          item.lng = lng
          waterConfig.position = [parseFloat(item.lat), parseFloat(item.lng)]
          Object.assign(item, waterConfig, {renderId: uuidv4()})
          handleAlarmIcon('waterStation', idsMap, item)
        })
  
        const points: TEntMapPointsData = enterprise.concat(water)
  
        statistics ? store.dispatch(saveStatistics(statistics)) : store.dispatch(saveStatistics({}))
        console.log(points,'mapPoints')
        return points
      case 'pollution':
        const {point} = await request<IPmsMapPointsFetchData>('/imc/pollution/map/points', {})
        let pmsPoints = point
        // 这里拿到的是对象
        let result: Array<TPmsMapPointsItem> = []
        for (let key in point) {
          let item = pmsPoints[key]
          let {lat, lng} = convertAxis(item.lng, item.lat)
          item.lat = lat
          item.lng = lng
          switch (item.type) {
            case POLLUTION_AIR_TYPE.toString():
              if (item.alarm === PREALARMING || item.alarm === ALARMING) {
                Object.assign(
                  item,
                  Pollution_Air_Alarm_Icon,
                  {
                    renderId: uuidv4(),
                    isBig: true,
                    isAlarming: true,
                    position: [parseFloat(item.lat), parseFloat(item.lng)]
                  }
                )
              } else {
                Object.assign(
                  item,
                  Pollution_Air_Icon,
                  {renderId: uuidv4(), isSubPoints: false, position: [parseFloat(item.lat), parseFloat(item.lng)]}
                )
              }
              break;
            case POLLUTION_WATER_TYPE.toString():
              if (item.alarm === PREALARMING || item.alarm === ALARMING) {
                Object.assign(
                  item,
                  Pollution_Water_Alarm_Icon,
                  {
                    renderId: uuidv4(),
                    isBig: true,
                    isAlarming: true,
                    position: [parseFloat(item.lat), parseFloat(item.lng)]
                  }
                )
              } else {
                Object.assign(
                  item,
                  Pollution_Water_Icon,
                  {renderId: uuidv4(), isSubPoints: false, position: [parseFloat(item.lat), parseFloat(item.lng)]}
                )
              }
              break;
            default:
              return item
          }
          result.push(item)
        }
        // console.log(result, 'pms points')
        return result
      case 'water':
        const waterData = await request<TWaterMapPointsFetch>('/imc/water/map/points', {})
        const waterConfig2 = Synthesis_waterStation_Icon
        return waterData.map(item => {
          let {lat, lng} = convertAxis(item.lng, item.lat)
          if (item.alarm === PREALARMING || item.alarm === ALARMING) {
            waterConfig2.isAlarming = true
            waterConfig2.isBig = true
            waterConfig2.iconUrl = '/map/water-alarm.svg'
          }
          waterConfig2.position = [parseFloat(item.lat), parseFloat(item.lng)]
          return {
            ...item,
            lat,
            lng,
            renderId: uuidv4(),
            ...waterConfig2
          }
        })
      default:
      // return new Promise<[]>(resolve => resolve([]))
    }
  }
)
export const getMapWater = createAsyncThunk<
  IMapWaterFetch
>(
  GET_MAP_WATER,
  async (payload) => {
    const data = await request<IMapWaterFetch>('/imc/comprehensive/map/water', {id: payload})
    const options: Array<{ value: string, label: string }> = []
    function handleCamera (item: TCameraItem) {
      let key = item.ip.replace('-', '/')
      return {
        value: `https://${ API_URL }/${ VIDEO_FORMAT }/${ GB2018_BASE_KEY }${ key }.flv`,
        label: item.name
      }
    }
    data.camera.forEach(c => {
      options.push(handleCamera(c))
    })
    store.dispatch(setWaterCamera(options))
    return data
  }
)
export const getEntSubPoints = createAsyncThunk(
  GET_ENT_SUB_POINTS,
  payload => {
    return request<Array<TPmsMapPointsItem>>('/imc/comprehensive/map/subPoints', {id: payload})
      .then(res => {
        const data = res
        !Array.isArray(data) && (store.dispatch(resetMapPoints([])))
        data.length <= 0 && (store.dispatch(resetMapPoints([])))
        const {alarmIds} = store.getState().map_slice
        let idsMap = new Map<string, string>()
        // console.log(synthesisData.state,'alarmIds')
        Object.keys(alarmIds).forEach(id => idsMap.set(id, ''))
        return data.map(item => {
          let {lat, lng} = convertAxis(item.lng, item.lat)
          if (item.type === 'water') {
            Object.assign(item, Pollution_Water_Icon)
            handleAlarmIcon('pollution-water-alarm', idsMap, item)
          }
          if (item.type === 'air') {
            Object.assign(item, Pollution_Air_Icon)
            handleAlarmIcon('pollution-air-alarm', idsMap, item)
          }
          if (item.type === 'facility') {
            Object.assign(item, Pollution_Facility_Icon)
            handleAlarmIcon('facility-alarm', idsMap, item)
          }
          item.position = [parseFloat(item.lat), parseFloat(item.lng)]
          return {
            ...item,
            lat,
            lng
          }
        })
      })
  }
)
export const getMapEnterprise = createAsyncThunk(
  GET_MAP_ENTERPRISE,
  payload => {
    return request<IMapEnterpriseFetch>('/imc/comprehensive/map/enterprise', {id: payload}).then(res => {
      const data = res
      const enterpriseId = data.info.id
      /* global BigInt */
      const baseKeyAndEntId = BigInt(GB2018_BASE_KEY) + BigInt(enterpriseId.toString())
      const options: InitialStateData['cameraOptions'] = []
      
      function handleCamera (item: TCameraItem) {
        let key = item.ip.replace('-', '/')
        return {
          value: `https://${ API_URL }/${ VIDEO_FORMAT }/${ baseKeyAndEntId.toString() }${ key }.flv`,
          label: item.name
        }
      }
      
      const airCameras: Array<TOptionsItem> = []
      data.air.forEach(a => {
        if (a.camera) {
          a.camera.forEach(item => {
            airCameras.push(handleCamera(item))
          })
        }
      })
      const facilityCameras: Array<TOptionsItem> = []
      data.facility.forEach(f => {
        if (f.camera) {
          f.camera.forEach(item => {
            facilityCameras.push(handleCamera(item))
          })
        }
      })
      const waterCameras: Array<TOptionsItem> = []
      data.water.forEach(w => {
        if (w.camera) {
          w.camera.forEach(item => {
            waterCameras.push(handleCamera(item))
          })
        }
      })
      options.push(
        {
          label: '废气摄像头',
          options: airCameras
        },
        {
          label: '废水摄像头',
          options: waterCameras
        },
        {
          label: '治污设施摄像头',
          options: facilityCameras
        }
      )
      // console.log(options,'waterCamera')
      store.dispatch(setCamera(options))
      return data
    })
  }
)
export const getMonitorLatest = createAsyncThunk(
  GET_MONITOR_LATEST,
  payload => {
    return request<IMonitorLatest>('/imc/pollution/monitor/latest', {id: payload}).then(res => {
      const data = res
      const enterpriseId = data.point.metadata.enterprise_id ?? ''
      const baseKeyAndEntId = BigInt(GB2018_BASE_KEY) + BigInt(enterpriseId.toString())
      
      function handleCamera (item: TCameraItem) {
        let key = (item.key as string).replace('-', '/')
        return {
          value: `https://${ API_URL }/${ VIDEO_FORMAT }/${ baseKeyAndEntId.toString() }${ key }.flv`,
          name: item.name,
          id: item.id
        }
      }
      
      let cameraArray = data.camera.map(c => {
        return handleCamera(c)
      })
      store.dispatch(setPollutionCameras(cameraArray))
      return data
    })
  }
)

const {reducer: mapReducer, actions} = createSlice({
  name: MAP_SLICE,
  initialState: {
    single: false,
    entShow: false,
    waterShow: false,
    pollutionWaterShow: false,
    tabActiveKey: '1',
    entInfo: {},
    waterInfo: {},
    mapPoints: [],
    subPoints: [],
    statistics: {},
    alarmIds: {},
    monitorLatest: {},
    selectedEntId: null,
    cameraOptions: [],
    waterStationCameraOptions: [],
    pollutionCameras: [],
  } as InitialStateData,
  reducers: {
    setSingle: (state, {payload}) => ({...state, single: payload}),
    showEntModal: (state, {payload}) => ({...state, entShow: payload}),
    showWaterModal: (state, {payload}) => ({...state, waterShow: payload}),
    showPollutionWaterModal (state, {payload}) {
      return {...state, pollutionWaterShow: payload}
    },
    setTabActiveKey: (state, {payload}) => ({...state, tabActiveKey: payload}),
    resetEntInfo: (state, {payload}) => ({...state, entInfo: payload}),
    saveStatistics: (state, {payload}) => ({...state, statistics: payload}),
    saveAlarmIds: (state, {payload}) => ({...state, alarmIds: payload}),
    resetMapPoints: (state, {payload}) => ({...state, mapPoints: payload}),
    resetSubPoints: (state, {payload}) => ({...state, subPoints: payload}),
    setSelectedEnt: (state, {payload}) => ({...state, selectedEntId: payload}),
    setCamera: (state, {payload}) => ({...state, cameraOptions: payload}),
    setWaterCamera: (state, {payload}) => ({...state, waterStationCameraOptions: payload}),
    setPollutionCameras: (state, {payload}) => ({...state, pollutionCameras: payload})
  },
  extraReducers: builder => {
    builder
      .addCase(getMapEnterprise.fulfilled, (state, {payload}) => ({...state, entInfo: payload}))
      .addCase(getMapWater.fulfilled, (state, {payload}) => ({...state, waterInfo: payload}))
      .addCase(getMapPoints.fulfilled, (state, action) => ({...state, mapPoints: action.payload}))
      .addCase(getEntSubPoints.fulfilled, (state, {payload}) => ({...state, subPoints: payload}))
      .addCase(getMonitorLatest.fulfilled, (state, {payload}) => ({...state, monitorLatest: payload}))
  }
})

export const {
  setSingle,
  showEntModal,
  showWaterModal,
  showPollutionWaterModal,
  setTabActiveKey,
  resetEntInfo,
  saveStatistics,
  saveAlarmIds,
  resetMapPoints,
  resetSubPoints,
  setSelectedEnt,
  setCamera,
  setWaterCamera,
  setPollutionCameras
} = actions
export default mapReducer
