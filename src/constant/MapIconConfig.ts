const basicConfig = {
  // 是否是subPoints
  isSubPoints: false,
  // 是否需要气泡弹出
  needPopup: true,
  // 气泡内描述内容
  popUpDescription: '',
  // 是否点击mark后加载子mark
  needReloadMark: false,
  // 是否报警
  isAlarming: false,
  // 是否需要变大
  isBig: false,
  // mark图源地址，public文件夹内
  iconUrl: '/imc/map/enterprise.svg',
  // 坐标数组，数据内的lat，lng组成。[lat,lng]
  position: [],
}
export const Synthesis_Enterprise_Icon = {
  ...basicConfig,
  // mark类型
  isEnterprise: true,
  needReloadMark: true,
  iconUrl: '/imc/map/enterprise.svg',
}
export const Synthesis_Enterprise_Big_Icon = {
  ...basicConfig,
  // mark类型
  isEnterprise: true,
  needReloadMark: true,
  isBig: true,
  iconUrl: '/imc/map/enterprise.svg',
}
export const  Synthesis_waterStation_Icon = {
  ...basicConfig,
  // mark类型
  isWaterStation: true,
  iconUrl: '/imc/map/water.svg',
}
export const Pollution_Air_Icon = {
  ...basicConfig,
  // mark类型
  isPollutionAir: true,
  isSubPoints: true,
  iconUrl: '/imc/map/pollution-air.svg',
}
export const Pollution_Air_Alarm_Icon = {
  ...basicConfig,
  // mark类型
  isPollutionAir: true,
  iconUrl: '/imc/map/pollution-air-alarm.svg',
}
export const Pollution_Water_Icon = {
  ...basicConfig,
  // mark类型
  isPollutionWater: true,
  isSubPoints: true,
  iconUrl: '/imc/map/pollution-water.svg',
}
export const Pollution_Water_Alarm_Icon = {
  ...basicConfig,
  // mark类型
  isPollutionWater: true,
  iconUrl: '/imc/map/pollution-water-alarm.svg',
}
export const Pollution_Facility_Icon = {
  ...basicConfig,
  // mark类型
  isPollutionFacility: true,
  isSubPoints: true,
  iconUrl: '/imc/map/facility.svg',
}
