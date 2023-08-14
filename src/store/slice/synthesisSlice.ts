import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import {
  alarm_level_alarming,
  alarm_level_initial,
  alarm_level_normal,
  alarm_level_preAlarm,
  GET_MAP_STATE,
  GET_PMS_LIST,
  GET_PMS_STATE,
  GET_SYNTHESIS_ENTERPRISE,
  GET_WASTE,
  GET_WMS,
  SYNTHESIS_SLICE,
} from '@/constant';
import request from '@/service/axios'
import store from '@/store'
import { saveStatistics } from '@/store/slice/mapSlice'
import {
  EnterpriseData,
  InitialState,
  MapStateData,
  PmsLatestData,
  PmsListData,
  PmsStateData
} from "@/store/types/synthesisTyps";

export const getSynthesisEnterprise = createAsyncThunk<EnterpriseData, string>(
  GET_SYNTHESIS_ENTERPRISE,
  async (payload) => {
    const data = await request<EnterpriseData>(payload, {})
    let portrait: EnterpriseData['portrait']
    if (data.portrait) {
      portrait = data.portrait.map(item => {
        item.value = item.counts
        return item
      })
    } else {
      portrait = []
    }
    Object.assign(data, {portrait: portrait})
    return data
  }
)
export const getPmsState = createAsyncThunk<PmsStateData, string>(
  GET_PMS_STATE,
  async (payload) => {
    return await request<PmsStateData>(payload, {})
  }
)

export const getPmsList = createAsyncThunk<Array<PmsListData>, string>(
  GET_PMS_LIST,
  async (payload) => {
    const data = await request<PmsLatestData>(payload, {})
    let result: Array<PmsListData> = []
    let indexTwo_alarm = '<span class="hoverContent_alarm">报警</span>'
    let indexTwo_preAlarm = '<span class="hoverContent_preAlarm">预警</span>'
    data.forEach(item => {
      let entAndPoint = `${ item.enterprise_name }${ item.point_name }`
      let indexOne: string = `${ entAndPoint }<span class="hoverContent left">${ entAndPoint }</span>`
      let indexThree: string = dayjs(item.timestamp).format('HH:mm')
      let subResult: PmsListData
      item.data.forEach((subItem) => {
        subResult = []
        let indexTwo: string = `${ subItem.pollutant_name }<span class="hoverContent middleLeft">${ subItem.pollutant_name }</span>`
        // 数据结构 [xxx排放口，xx污染物，状态，时间]
        if (!subItem.alert_severity) return
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
  }
)
export const getWaste = createAsyncThunk<InitialState['waste'], string>(
  GET_WASTE,
  async (payload) => {
    return await request<InitialState['waste']>(payload, {})
  }
)
export const getWms = createAsyncThunk<InitialState['wms'], string>(
  GET_WMS,
  async (payload) => {
    const data = await request<InitialState['wms']>(payload, {})
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
      } else {
        seriesData.push(' ')
      }
      // }
    }
    return Object.assign({}, data, {xData: xData, seriesData: seriesData})
  }
)
export const getEntMapState = createAsyncThunk<string[]>(
  GET_MAP_STATE,
  async () => {
    const data = await request<MapStateData>('/imc/comprehensive/map/state', {})
    const statistics = data ?? {}
    const alarmIds = data?.point ?? {}
    statistics ? store.dispatch(saveStatistics(statistics)) : store.dispatch(saveStatistics({}))
    return Object.keys(alarmIds).map(id => id)
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
      .addCase(getSynthesisEnterprise.fulfilled, (state, {payload}) => ({...state, enterprise: payload}))
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
