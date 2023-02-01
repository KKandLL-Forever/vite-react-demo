export interface IBasicConfigData {
  isSubPoints?: boolean,
  needPopup?: boolean,
  popUpDescription?: string,
  needReloadMark?: boolean,
  isAlarming?: boolean,
  isBig?: boolean,
  iconUrl?: string,
  position?: [number, number] | [],
  renderId?: string
}

export interface ISynthesisEnterpriseIcon extends IBasicConfigData{
  isEnterprise?: boolean,
}

export interface ISynthesisEnterpriseBigIcon extends IBasicConfigData {
  isEnterprise?: boolean,
}
export interface ISynthesisWaterStationIcon extends IBasicConfigData {
  isWaterStation?: boolean,
}
export interface IPollutionAirIcon extends IBasicConfigData {
  isPollutionAir?: boolean,
}
export interface IPollutionAirAlarmIcon extends IBasicConfigData {
  isPollutionAir?: boolean,
}
export interface IPollutionWaterIcon extends IBasicConfigData {
  isPollutionWater?: boolean,
}
export interface IPollutionWaterAlarmIcon extends IBasicConfigData{
  isPollutionWater?: boolean,
}
export interface IPollutionFacilityIcon extends IBasicConfigData{
  isPollutionFacility?: boolean
}
const basicConfig:IBasicConfigData = {
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

export const Synthesis_Enterprise_Icon:ISynthesisEnterpriseIcon = {
  ...basicConfig,
  // mark类型
  isEnterprise: true,
  needReloadMark: true,
  iconUrl: '/imc/map/enterprise.svg',
}

export const Synthesis_Enterprise_Big_Icon:ISynthesisEnterpriseBigIcon = {
  ...basicConfig,
  // mark类型
  isEnterprise: true,
  needReloadMark: true,
  isBig: true,
  iconUrl: '/imc/map/enterprise.svg',
}

export const  Synthesis_waterStation_Icon:ISynthesisWaterStationIcon = {
  ...basicConfig,
  // mark类型
  isWaterStation: true,
  iconUrl: '/imc/map/water.svg',
}

export const Pollution_Air_Icon:IPollutionAirIcon = {
  ...basicConfig,
  // mark类型
  isPollutionAir: true,
  isSubPoints: true,
  iconUrl: '/imc/map/pollution-air.svg',
}

export const Pollution_Air_Alarm_Icon:IPollutionAirAlarmIcon = {
  ...basicConfig,
  // mark类型
  isPollutionAir: true,
  iconUrl: '/imc/map/pollution-air-alarm.svg',
}

export const Pollution_Water_Icon:IPollutionWaterIcon = {
  ...basicConfig,
  // mark类型
  isPollutionWater: true,
  isSubPoints: true,
  iconUrl: '/imc/map/pollution-water.svg',
}

export const Pollution_Water_Alarm_Icon:IPollutionWaterAlarmIcon = {
  ...basicConfig,
  // mark类型
  isPollutionWater: true,
  iconUrl: '/imc/map/pollution-water-alarm.svg',
}

export const Pollution_Facility_Icon:IPollutionFacilityIcon = {
  ...basicConfig,
  // mark类型
  isPollutionFacility: true,
  isSubPoints: true,
  iconUrl: '/imc/map/facility.svg',
}
