// 南城中心点坐标
export const NANCHENG_CENTER = {
  axis: [27.554329375563494, 116.64980226978534],
  zoom: 11
}
export const WATER_CENTER = {
  axis: [27.534329375563494, 116.65980226978534],
  zoom: 11
}
export const POLLUTION_CENTER = {
  axis: [27.534329375563494, 116.57980226978534],
  zoom: 11
}
// mark 类型
export const POLLUTION_AIR_TYPE = 100001
export const POLLUTION_WATER_TYPE = 100002

// 视频格式相关
export const GB2018_BASE_KEY = '3402000000111000000'
export const VIDEO_FORMAT = 'hdl'
// 状态 初始值-1 报警2 正常1
export const DISCONNECT = '0'
export const NORMAL = 0
export const ALARMING = 1
export const PREALARMING = 2
export const alarm_level_alarming = '2'
export const alarm_level_preAlarm = '1'
export const alarm_level_initial = '-1'
export const alarm_level_normal = '0'
export const AIR = 'air'
export const WATER = 'water'
export const FACILITY = 'facility'

// 企业手续
export const FORMALITY_CERTIFICATION = 'certification'
export const FORMALITY_ASSESS = 'assess'
export const FORMALITY_CONTINGENCY = 'contingency'
export const FORMALITY_HW = 'hw'
export const FORMALITY_RADIATION = 'radiation'
export const FORMALITY_PERMIT = 'permit'

// store-root
export const ROOT_SLICE = 'root_slice'

// store-boot
export const BOOT_SLICE = 'boot_slice'
export const ASYNC_GET_IDS_UNITS = 'asyncGetIdsUnits'

// store-map
export const MAP_SLICE = 'map_slice'
export const GET_MAP_ENTERPRISE = 'get_map_enterprise'
export const GET_MAP_WATER = 'get_map_water'
export const GET_MAP_POINTS = 'get_map_points'
export const GET_ENT_SUB_POINTS = 'get_ent_sub_points'
export const GET_MONITOR_LATEST = 'get_monitor_latest'
export const GET_MAP_STATE = 'get_map_state'

// store-synthesis
export const SYNTHESIS_SLICE = 'synthesis_slice'
export const GET_SYNTHESIS_ENTERPRISE = 'getSynthesisEnterprise'
export const GET_PMS_STATE = 'getPmsState'
export const GET_PMS_LIST = 'getPmsList'
export const GET_WASTE = 'getWaste'
export const GET_WMS = 'getWms'

// store-pollution
export const POLLUTION_SLICE = 'pollution_slice'
export const GET_ENTERPRISE = 'get_enterprise'
export const GET_MONITOR_ENTERPRISE = 'get_monitor_enterprise'
export const GET_ENTERPRISE_LIST = 'get_enterprise_list'
export const GET_ENTERPRISE_STAT = 'get_enterprise_stat'
export const GET_SUMMARY_RANK = 'get_summary_rank'
export const GET_SUMMARY_ALARMS = 'get_summary_alarms'
export const GET_ALARM_CURRENT = 'get_alarm_current'
export const POLLUTION_MAP_STATE = 'pollution_map_state'

// store-waste
export const WASTE_SLICE = 'waste_slice'
export const GET_WASTE_ENTERPRISE_STAT = 'get_waste_enterprise_stat'
export const GET_PRODUCE_STAT= 'get_produce_stat'
export const GET_STORE_HISTORY= 'get_store_history'
export const GET_TRANSFER_HISTORY= 'get_transfer_history'
export const GET_TRANSFER_TARGET= 'get_transfer_target'

// store-water
export const WATER_SLICE = 'water_slice'
export const GET_WQL_LATEST = 'get_wql_latest'
export const GET_META_LATEST = 'get_meta_latest'
export const GET_WQL_HISTORY = 'get_wql_history'
export const GET_WQL_RANK = 'get_wql_rank'

