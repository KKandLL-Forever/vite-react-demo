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
  IPollutionAirIcon,
  IPollutionFacilityIcon,
  IPollutionWaterIcon,
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

type TModuleMapPoints = 'synthesis' | 'pollution' | 'water'
enum xxx {
  SYNTHESIS = 'synthesis',
  POLLUTION = 'pollution',
  WATER = 'water'
}

type TEntItem = ISynthesisEnterpriseIcon & TMapPointsFetchItem

type TWmsItem = ISynthesisWaterStationIcon & TMapPointsFetchItem

interface IEntMapPointsFetchData {
  ent: Array<TMapPointsFetchItem>,
  wms: Array<TWmsItem>,
  state: {
    total: number,
    cate: {
      ams: number,
      wms: number,
      fms: number,
      pms: number,
      examen: number,
      formalities: number
    },
    point: {
      [key: string]: {
        rule_name: string,
        trigger_time: number,
        trigger_value: string,
        type: number
      }
    }
  }
}

type TEntMapPointsData = Array<TEntItem | TWmsItem>
type TMapPointsFetchItem = {
  id: string,
  key: string,
  name: string,
  type: string,
  lng: string,
  lat: string,
  enterprise_name?: string,
  state?: number,
  alarm?: number,
  alert_severity?: number,
}

interface IPmsMapPointsFetchData {
  point: {
    [key: string]: TPmsMapPointsItem
  }
}

type TPmsMapPointsItem = TMapPointsFetchItem & IPollutionAirIcon & IPollutionWaterIcon & IPollutionFacilityIcon

type TWaterMapPointsFetch = Array<TMapPointsFetchItem>

type TLatestItemKey = `${ number }_${ 'avg' | 'flag' | 'unit' | 'max' | 'min' }`

interface ILatestItem {
  [key: TLatestItemKey]: string,
  
  alert_severity: number,
  alert_type: number,
  data_cate: number,
  data_type: number,
  point_id: string,
  point_name: string,
  point_no: string,
  point_type: string,
  pollutant: number,
  pollutant_name: string,
  region_id: number,
  region_name: string,
  timestamp: string,
  wql: number
}

interface IWqlItem {
  timestamp: string,
  date: string,
  point_id: string,
  point_no: string,
  point_name: string,
  point_type: string,
  wql_type: number,
  wql: number,
  pollutant: number,
  pollutant_name: string,
  alert_type: number,
  alert_tags: string,
  created_at: string,
  subs: null
}

type TCameraItem = {
  ip: string
  name: string
  password?: string | null
  username?: string | null
  id?: string
  owner?: string,
  key?: string,
  type?: string,
  state?: number,
  metadata?: {
    facilities_model: string,
    facilities_no: string,
    manufacturer: string,
    monitor_type: null,
    operator: string,
    password: null,
    username: null
  },
  updated_at?: number,
  created_at?: string
}

type TPoint = {
  id: string,
  key: string,
  type: string,
  owner: string,
  name: string,
  lng: string,
  lat: string,
  updated_at: number,
  created_at: string
}

interface IMapWaterFetch {
  latest: Array<ILatestItem> | [],
  point: TPoint & {
    metadata: {
      lal: [string, string],
      point_location: string,
      pollutants: Array<{ pollutant: number, pollutant_name: string }>,
      water_cate: number,
      water_functional_level: number
    },
  },
  facility: {
    id: string,
    owner: string,
    name: string,
    key: string,
    type: string,
    state: number,
    metadata: {
      facilities_model: string,
      facilities_name: string,
      facilities_no: string,
      manufacturer: string,
      monitor_type: string | null,
      operator: string | null,
      password: string | null,
      remark: string | null,
      username: string | null
    },
    updated_at: number,
    created_at: string
  },
  camera: Array<TCameraItem> | [],
  wql: Array<IWqlItem> | []
}

type TAirItem = TMapPointsFetchItem & { mn: string, camera: Array<TCameraItem> }
type TFormalityItem = {
  enterprise_id: number,
  formality: string,
  need: number,
  has: number,
  metadata: Record<string, any>,
  updated_at: number,
  created_at: string
}
type TWaterItem = TAirItem
type TFacilityItem = TAirItem

interface IMapEnterpriseFetch {
  air: Array<TAirItem>
  facility: Array<TFacilityItem>
  formality: Array<TFormalityItem>
  info: {
    id: number,
    ident: string,
    enterprise_name: string,
    social_credit_code: string,
    industry_classification: string,
    permit_management_type: number,
    enterprise_state: number,
    enterprise_scale: number,
    production_state: number,
    is_registered: number,
    region: number,
    lng: string,
    lat: string,
    pollutions: [],
    boundary: Record<string, any>,
    industry_classification_others: [],
    metadata: {
      area_construction: string,
      area_green: string,
      area_site: string,
      enterprise_corporation_name: string,
      enterprise_postcode: string,
      enterprise_scale_is_above: number,
      environment_contactor_name: string,
      environment_contactor_phone: string,
      environment_contactor_tel: string,
      industry_classification_name: string,
      industry_park_id: string,
      industry_park_name: number,
      investment_environment: string,
      investment_rate: string,
      investment_total: string,
      is_air_control: number,
      is_hm_control: number,
      is_tn_control: number,
      is_tp_control: number,
      lal: [string, string],
      organization_code: string,
      production_address: string,
      production_date: string,
      production_region: number,
      production_region_name: string,
      production_town: string,
      register_address: string,
      register_capital: string,
      register_region: number,
      register_region_name: string
    },
    register_date: string,
    updated_at: number,
    created_at: string
  }
  water: Array<TWaterItem>
}

type TOptionsItem = { value: string, label: string }

interface IOptions {
  label: string
  options: Array<TOptionsItem>
}

type TLatestItem = {
  timestamp: string,
  enterprise_id: number,
  enterprise_name: string,
  point_id: string,
  point_no: string,
  point_name: string,
  region_name: string,
  pollutant: number,
  pollutant_name: string,
  pollution_source: number,
  data_cate: number,
  data_type: number,
  data_alias: string,
  data_min: string,
  data_max: string,
  data_avg: string,
  data_flag: string,
  data_sample_time: string,
  alert_type: number,
  alert_tags: null,
  updated_at: number,
  data: Array<TLatestItemDataItem>
}
type TLatestItemDataItem = {
  alert_severity: number,
  alert_tags: Record<string, any>,
  alert_type: number,
  data_avg: string,
  data_flag: string,
  data_max: string,
  data_min: string,
  data_unit: string,
  pollutant: number,
  pollutant_name: string
}

interface IMonitorLatest {
  point: TPoint & {
    state: number,
    alarm: number,
    metadata: {
      enterprise_id: number,
      enterprise_name: string,
      lal: [string, string],
      outlet_id: string,
      outlet_name: string,
      outlet_no: string,
      point_location: string,
      point_no: null
    },
  },
  facility: TPoint & {
    state: number,
    metadata: {
      facilities_model: string,
      facilities_no: string,
      manufacturer: string,
      monitor_type: number,
      operator: string,
      password: string | null,
      username: string | null
    },
  },
  camera: Array<TCameraItem>,
  latest: Array<TLatestItem>
}

const handleAlarmIcon = (type: string, map: Map<string, string>, item: TEntItem | TWmsItem | TPmsMapPointsItem) => {
  if (map.has(item.id.toString())) {
    item.isAlarming = true
    switch (type) {
      case 'ent':
        item.isBig = true
        item.iconUrl = '/imc/map/enterprise-alarm.svg'
        break;
      case 'waterStation':
        item.isBig = true
        item.iconUrl = '/imc/map/water-alarm.svg'
        break;
      case 'pollution-air-alarm':
        item.isBig = true
        item.iconUrl = '/imc/map/pollution-air-alarm.svg'
        break;
      case 'pollution-water-alarm':
        item.isBig = true
        item.iconUrl = '/imc/map/pollution-water-alarm.svg'
        break;
      case 'facility-alarm':
        item.isBig = true
        item.iconUrl = '/imc/map/facility-alarm.svg'
        break;
      default:
        return
    }
  }
}

export const getMapPoints = createAsyncThunk<
  InitialStateData['mapPoints'],
  xxx
>(
  GET_MAP_POINTS,
// @ts-ignore
  async (payload: xxx) => {
    switch (payload) {
      case xxx.SYNTHESIS:
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
          if (item.id === (selectedEntId as number).toString()) {
            // 单独处理被选中的企业,用放大的icon
            bigEnterpriseConfig.position = [parseFloat(item.lat), parseFloat(item.lng)]
            Object.assign(item, bigEnterpriseConfig, {renderId: uuidv4()})
          } else {
            enterpriseConfig.position = [parseFloat(item.lat), parseFloat(item.lng)]
            Object.assign(item, enterpriseConfig, {renderId: uuidv4()})
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
        // console.log(mapPoints,'mapPoints')
        return points
      case xxx.POLLUTION:
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
      case xxx.WATER:
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
      const options: Array<IOptions> = []
      
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

interface InitialStateData {
  single: boolean,
  entShow: boolean,
  waterShow: boolean,
  pollutionWaterShow: boolean,
  tabActiveKey: string,
  entInfo: IMapEnterpriseFetch | {},
  waterInfo: IMapWaterFetch | {},
  mapPoints: TEntMapPointsData | Array<TPmsMapPointsItem> | Array<TWmsItem> | [],
  subPoints: Array<TPmsMapPointsItem> | [],
  statistics: IEntMapPointsFetchData['state'] | {},
  alarmIds: Map<string, string> | {},
  monitorLatest: IMonitorLatest | {},
  selectedEntId: number | null,
  cameraOptions: Array<IOptions> | [],
  waterStationCameraOptions: Array<{ value: string, label: string }> | [],
  pollutionCameras: Array<{ value: string, name: string, id: string }> | [],
}

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
    mapPoints: {},
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
