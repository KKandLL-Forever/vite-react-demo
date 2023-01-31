import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  alarm_level_alarming, alarm_level_initial, alarm_level_normal, alarm_level_preAlarm,
  GET_ALARM_CURRENT,
  GET_ENTERPRISE,
  GET_ENTERPRISE_LIST,
  GET_ENTERPRISE_STAT,
  GET_MONITOR_ENTERPRISE,
  GET_SUMMARY_ALARMS,
  GET_SUMMARY_RANK, POLLUTION_MAP_STATE,
  POLLUTION_SLICE,
} from '@/constant';
import request from '@/service/axios'
import * as dayjs from 'dayjs'
import { convertAxis } from '@/utils/structUtil'

export const getEnterprise = createAsyncThunk(
  GET_ENTERPRISE,
  payload => {
    return request('/imc/pollution/map/enterprise', {id: payload}).then(res => res.data)
  }
)
export const getMonitorEnterprise = createAsyncThunk(
  GET_MONITOR_ENTERPRISE,
  payload => {
    return request('/imc/pollution/monitor/enterprise', {id: payload}).then(res => {
      const { data } = res
      const xData = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24']
      const seriesData = ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0']
      data.history.forEach(item => {
        xData.forEach((x,index) => {
          if(x === item.date){
            seriesData[index] = item.total
          }
        })
      })
      return {
        xData,
        seriesData,
        current:data.current
      }
    })
  }
)
export const getEnterpriseList = createAsyncThunk(
  GET_ENTERPRISE_LIST,
  (payload:string) => {
    return request(payload, {})
      .then(({data}) => {
        let depth = 0
        let subIndex = 1
        function traverseMenuData(data) {
          return data.map((item, index) => {
            if(item.lat && item.lng) {
              let {lat, lng} = convertAxis(item.lng, item.lat)
              item.lat = lat
              item.lng = lng
            }
            item['label'] = item.name
            if (depth === 0) {
              item['key'] = `menu${ index + 1 }`
            }
            if (depth === 1) {
              item['key'] = `sub${ subIndex }`
              subIndex++
            }
            if (item.children && item.children.length > 0) {
              depth++
              traverseMenuData(item.children)
              depth = 0
            }
            return item
          })
        }
        return traverseMenuData(data)
      })
  }
)
export const getEnterpriseStat = createAsyncThunk(
  GET_ENTERPRISE_STAT,
  (payload:string) => {
    return request(payload, {}).then(res => res.data)
  }
)
export const getSummaryRank = createAsyncThunk(
  GET_SUMMARY_RANK,
  (payload:string) => {
    return request(payload, {}).then(res => {
      const { data } = res
      const yData = []
      const seriesData = []
      data.forEach(item => {
        yData.push(item.enterprise_name)
        seriesData.push(item.amount)
      })
      return {
        yData,
        seriesData,
      }
    })
  }
)
export const getSummaryAlarms = createAsyncThunk(
  GET_SUMMARY_ALARMS,
  (payload:string) => {
    return request(payload, {}).then(res => {
      const { data } = res
      const seriesData = []
      const today = dayjs().startOf('month').format('YYYY-MM-DD')
      const daysInMonth = dayjs(today).daysInMonth()
      const daysInMonthArray = []
      for (let i = 1; i <= daysInMonth; i++) {
        const date = dayjs().date(i).format('MM-DD')
        daysInMonthArray.push(date)
      }
      daysInMonthArray.forEach(date => seriesData.push('0'))
      data.history.forEach(item => {
        daysInMonthArray.forEach((date,index) => {
          if (date === item.date) {
            seriesData[index]= item.total
          }
        })
      })
      return {
        current: data.current,
        xData: daysInMonthArray,
        seriesData,
      }
    })
  }
)
export const getAlarmCurrent = createAsyncThunk(
  GET_ALARM_CURRENT,
  (payload:string) => {
    return request(payload, {}).then(res => {
      let result = []
      res.data.forEach(item => {
        let entAndPoint = `${item?.tags?.enterprise_name}${item?.tags.point_name}`
        let indexOne = `${entAndPoint}<span class="hoverContent left">${entAndPoint}</span>`
        let indexThree = dayjs(item.trigger_time * 1000).format('HH:mm')
        let subResult = []
        let indexTwo_alarm = '<span class="hoverContent_alarm">报警</span>'
        let indexTwo_preAlarm = '<span class="hoverContent_preAlarm">预警</span>'
        switch (item.severity.toString()) {
          case alarm_level_initial:
            subResult.push(indexOne, '正常', indexThree)
            break;
          case alarm_level_normal:
            subResult.push(indexOne, '正常', indexThree)
            break;
          case alarm_level_alarming:
            subResult.push(indexOne, indexTwo_alarm, indexThree)
            break;
          case alarm_level_preAlarm:
            subResult.push(indexOne, indexTwo_preAlarm, indexThree)
            break;
          default:
            return
        }
        result.push(subResult)
      })
      return result
    })
  }
)
export const pollutionMapState = createAsyncThunk(
  POLLUTION_MAP_STATE,
  payload => {
    return request('/imc/pollution/map/state',{}).then(res => {
      return res.data.map(point => point.point_id)
    })
  }
)

const {reducer: pollutionReducer, actions} = createSlice({
  name: POLLUTION_SLICE,
  initialState: {
    enterprise: {},
    monitorEnterprise: {},
    enterpriseList: [],
    enterpriseStat: [],
    summaryRank: {},
    summaryAlarms: {},
    alarmCurrent: {},
    alarmingPoints: []
  },
  reducers: {
    resetEnterprise: (state, {payload}) => ({...state, enterprise: payload}),
    resetPollutionAlarming: (state, {payload}) => ({...state, alarmingPoints: payload}),
  },
  extraReducers: builder => {
    builder
      .addCase(getEnterprise.fulfilled,(state, {payload}) => ({...state, enterprise: payload}))
      .addCase(getMonitorEnterprise.fulfilled,(state, {payload}) => ({...state, monitorEnterprise: payload}))
      .addCase(getEnterpriseList.fulfilled,(state, {payload}) => ({...state, enterpriseList: payload}))
      .addCase(getEnterpriseStat.fulfilled,(state, {payload}) => ({...state, enterpriseStat: payload}))
      .addCase(getSummaryRank.fulfilled,(state, {payload}) => ({...state, summaryRank: payload}))
      .addCase(getSummaryAlarms.fulfilled,(state, {payload}) => ({...state, summaryAlarms: payload}))
      .addCase(getAlarmCurrent.fulfilled,(state, {payload}) => ({...state, alarmCurrent: payload}))
      .addCase(pollutionMapState.fulfilled,(state, {payload}) => ({...state, alarmingPoints: payload}))
  },
})

export const {resetEnterprise,resetPollutionAlarming} = actions
export default pollutionReducer
