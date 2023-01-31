import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import {
  alarm_level_alarming,
  alarm_level_initial, alarm_level_normal, alarm_level_preAlarm, GET_MAP_STATE,
  GET_PMS_LIST,
  GET_PMS_STATE,
  GET_SYNTHESIS_ENTERPRISE,
  GET_WASTE, GET_WMS,
  SYNTHESIS_SLICE,
} from '@/constant';
import request from '@/service/axios'
import store from '@/store'
import { saveStatistics } from '@/store/slice/mapSlice'

interface EnterpriseData {
  ent_total?: number,
  air_total?: number,
  water_total?: number,
  facility_total?: number,
  portrait?: Array<{
    tag: number,
    name: string,
    counts: number,
    value?: number,
  }>
}
interface PmsStateData {
  total: number,
  online: number,
  alarm?: number
}
type PmsListData = Array<string>
type PmsLatestInnerData = {
  alert_severity?: number,
  alert_tags?: {
    __name__: string,
    data_cate: string,
    data_item: string,
    data_type: string,
    enterprise_id: string,
    enterprise_name: string,
    ident: string,
    point_id: string,
    point_name: string,
    pollutant: string,
    type: string
  },
  alert_type?: number,
  data_avg?: string,
  data_flag?: string,
  data_max?: string,
  data_min?: string,
  data_unit?: string,
  pollutant?: number,
  pollutant_name?: string
}
type PmsLatestData = Array<{
  timestamp?: string,
  enterprise_id?: number,
  enterprise_name?: string,
  point_id?: string,
  point_no?: string,
  point_name?: string,
  region_name?: string,
  pollutant?: number,
  pollutant_name?: string,
  pollution_source?: number,
  data_cate?: number,
  data_type?: number,
  data_alias?: string,
  data_min?: string,
  data_max?: string,
  data_avg?: string,
  data_flag?: string,
  data_sample_time?: string,
  alert_type?: number,
  alert_tags?: string | null,
  updated_at?: number,
  data: Array<PmsLatestInnerData>
}> | []
interface MapStateData {
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
    [key:string]: {
      rule_name: string,
      trigger_time: number,
      trigger_value: string,
      type: number
    },
  }
}
export interface InitialState {
  enterprise: EnterpriseData,
  pmsState: PmsStateData,
  pmsList: Array<PmsListData>,
  wms: {
    station?: {
      [key:string]: {
        id: string,
        name: string,
        wfl: number,
        wql: number
      },
    },
    srr?: number,
    xData?: string[],
    seriesData?:string[]
  },
  waste: {
    cate?: any[],
    store?: any[]
  },
  alarmingPoints?: string[]
}
export const getSynthesisEnterprise = createAsyncThunk(
  GET_SYNTHESIS_ENTERPRISE,
  (payload:string) => {
    return request<EnterpriseData>(payload, {})
      .then(res => {
        let portrait:EnterpriseData['portrait']
        if (res.portrait) {
          portrait = res.portrait.map(item => {
            item.value = item.counts
            return item
          })
        }else {
          portrait = []
        }
        Object.assign(res, {portrait: portrait})
        return res
      })
  }
)
export const getPmsState = createAsyncThunk(
  GET_PMS_STATE,
    (payload:string) => {
    return request<PmsStateData>(payload, {}).then(res => res)
  }
)

export const getPmsList = createAsyncThunk(
  GET_PMS_LIST,
    (payload:string) => {
    return request<PmsLatestData>(payload, {})
      .then(res => {
        let result:Array<PmsListData> = []
        let indexTwo_alarm = '<span class="hoverContent_alarm">报警</span>'
        let indexTwo_preAlarm = '<span class="hoverContent_preAlarm">预警</span>'
        res.forEach(item => {
          let entAndPoint = `${ item.enterprise_name }${ item.point_name }`
          let indexOne:string = `${ entAndPoint }<span class="hoverContent left">${ entAndPoint }</span>`
          let indexThree:string = dayjs(item.timestamp).format('HH:mm')
          let subResult:PmsListData
          item.data.forEach((subItem) => {
            subResult = []
            let indexTwo:string = `${subItem.pollutant_name}<span class="hoverContent middleLeft">${subItem.pollutant_name}</span>`
            // 数据结构 [xxx排放口，xx污染物，状态，时间]
            if(!subItem.alert_severity) return
            switch (subItem.alert_severity.toString()) {
              case alarm_level_initial:
                subResult.push(indexOne, indexTwo, '正常', indexThree)
                break;
              case alarm_level_normal:
                subResult.push(indexOne, indexTwo, '正常', indexThree)
                break;
              case alarm_level_alarming:
                subResult.push(indexOne, indexTwo, indexTwo_alarm, indexThree)
                break;
              case alarm_level_preAlarm:
                subResult.push(indexOne, indexTwo, indexTwo_preAlarm, indexThree)
                break;
              default:
                return
            }
            result.push(subResult)
          })
        })
        return result
      })
  }
)
export const getWaste = createAsyncThunk(
  GET_WASTE,
  (payload:string) => {
    return request<InitialState['waste']>(payload, {}).then(res => res)
  }
)
export const getWms = createAsyncThunk(
  GET_WMS,
    (payload:string) => {
    return request<InitialState['wms']>(payload, {})
      .then(res => {
        const data = res
        let station = data.station
        let xData = []
        let seriesData = []
        for (let i in station) {
          xData.push(station[i].name)
          // if(station[i].wql !== 0){
          const {boot_slice} = store.getState()
          const transfered = boot_slice.idTable.name(station[i].wql)
          if (transfered) {
            seriesData.push(transfered)
          }else {
            seriesData.push(' ')
          }
          // }
        }
        return Object.assign({}, data, {xData: xData, seriesData: seriesData})
      })
  }
)
export const getEntMapState = createAsyncThunk(
  GET_MAP_STATE,
  () => {
    return request<MapStateData>('/imc/comprehensive/map/state', {}).then(res => {
      const data = res
      const statistics = data ?? {}
      const alarmIds = data?.point ?? {}
      statistics ? store.dispatch(saveStatistics(statistics)) : store.dispatch(saveStatistics({}))
      
      return Object.keys(alarmIds).map(id => id)
    })
  }
)

const synthesisSlice = createSlice({
  name: SYNTHESIS_SLICE,
  initialState: {
    enterprise: {},
    pmsState: {
      total: 0,
      online: 0
    },
    pmsList: [],
    wms: {},
    waste: {},
    alarmingPoints: []
  } as InitialState,
  reducers: {
    resetEntAlarming: (state, {payload}) => ({...state, alarmingPoints: payload}),
  },
  extraReducers: builder => {
    builder
      .addCase(getSynthesisEnterprise.fulfilled,(state, {payload}) => ({...state, enterprise: payload}))
      .addCase(getPmsState.fulfilled, (state, {payload}) => ({...state, pmsState: payload}))
      .addCase(getPmsList.fulfilled, (state, {payload}) => ({...state, pmsList: payload}))
      .addCase(getWaste.fulfilled, (state, {payload}) => ({...state, waste: payload}))
      .addCase(getWms.fulfilled, (state, {payload}) => ({...state, wms: payload}))
      .addCase(getEntMapState.fulfilled, (state, {payload}) => ({...state, alarmingPoints: payload}))
  }
})

export const {
  resetEntAlarming
} = synthesisSlice.actions
export default synthesisSlice.reducer
