export interface EnterpriseData {
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
export interface PmsStateData {
  total: number,
  online: number,
  alarm?: number
}
export type PmsListData = Array<string>
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
export type PmsLatestData = Array<{
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
export interface MapStateData {
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
