import {
  IPollutionAirIcon,
  IPollutionFacilityIcon,
  IPollutionWaterIcon,
  ISynthesisEnterpriseIcon,
  ISynthesisWaterStationIcon
} from "@/constant/MapIconConfig";
import { SelectProps } from "antd/es";

export type TEntItem = ISynthesisEnterpriseIcon & TMapPointsFetchItem

export type TWmsItem = ISynthesisWaterStationIcon & TMapPointsFetchItem


export type TMapPointsFetchItem = {
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

export interface IEntMapPointsFetchData {
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

export type TEntMapPointsData = Array<TEntItem | TWmsItem>

export type TPmsMapPointsItem = TMapPointsFetchItem & IPollutionAirIcon & IPollutionWaterIcon & IPollutionFacilityIcon

export interface IPmsMapPointsFetchData {
  point: {
    [key: string]: TPmsMapPointsItem
  }
}

export type TWaterMapPointsFetch = Array<TMapPointsFetchItem>

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

export type TCameraItem = {
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

export type TPoint = {
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

export interface IMapWaterFetch {
  latest: Array<ILatestItem> | [],
  point: TPoint & {
    metadata: {
      lal: [string, string],
      point_location: string,
      pollutants: Array<{ pollutant: number, pollutant_name: string }>,
      water_cate: number,
      water_functional_level: number
    },
    water_cate?: string
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

export type TAirItem = TMapPointsFetchItem & { mn: string, camera: Array<TCameraItem> }
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

export interface IMapEnterpriseFetch {
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

export type TOptionsItem = { value: string, label: string }

export interface IOptions {
  label: string
  value:string
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

export interface IMonitorLatest {
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

export interface InitialStateData {
  single: boolean,
  entShow: boolean,
  waterShow: boolean,
  pollutionWaterShow: boolean,
  tabActiveKey: string,
  entInfo: IMapEnterpriseFetch,
  waterInfo: IMapWaterFetch,
  mapPoints: TEntMapPointsData | Array<TPmsMapPointsItem> | Array<TWmsItem> | [],
  subPoints: Array<TPmsMapPointsItem> | [],
  statistics: IEntMapPointsFetchData['state'] | {},
  alarmIds: Map<string, string> | {},
  monitorLatest: IMonitorLatest | {},
  selectedEntId: number | null,
  cameraOptions: SelectProps<string, TOptionsItem> | [],
  waterStationCameraOptions: SelectProps<string, TOptionsItem> | [],
  pollutionCameras: Array<{ value: string, name: string, id: string }> | [],
}
