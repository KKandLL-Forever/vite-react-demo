import React from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'antd'

import styles from '@/components/LeafletMap/LeafletMap.module.less'
import airSvg from '@/assets/svg/leafletMap/pollution-air.svg'
import airAlarmSvg from '@/assets/svg/leafletMap/pollution-air-alarm.svg';
import { ALARMING, NORMAL, PREALARMING, ROOT_SLICE } from '@/constant'
import { transferType } from '@/utils/structUtil'
import { setModule } from '@/store/slice/rootSlice';
import { setSingle, showEntModal, showWaterModal, showPollutionWaterModal, resetMapPoints,resetSubPoints} from '@/store/slice/mapSlice'

function TabChildren ({data,onTabFly}) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const root = useSelector(state => state[ROOT_SLICE])
  function goPollution (data) {
    navigate('/imc/pollution')
    dispatch(setModule('pollution'))
    dispatch(setSingle(false))
    dispatch(showEntModal(false))
    dispatch(showWaterModal(false))
    dispatch(showPollutionWaterModal(false))
    if('pollution' !== root.module){
      dispatch(resetMapPoints([]))
      dispatch(resetSubPoints([]))
    }
    // mapRef.current.flyTo([parseInt(data.lat) - 0.001, parseInt(data.lng) - 0.0005], 18, {duration: 0.15})
    // onTabFly()
  }
  return (
    <div className={ styles.tabContent }>
      <div className={ styles.info }>
        <div className={ styles.infoItem }>
          <span>监控点名称：</span>
          <span>{ data.name }</span>
        </div>
        <div className={ styles.infoItem }>
          <span>监控点编码：</span>
          <span>{ data.key }</span>
        </div>
        <div className={ styles.infoItem }>
          <span>监测类型：</span>
          <span>{ transferType(data.type) }</span>
        </div>
        <div className={ styles.infoItem }>
          <span>数采仪mn码：</span>
          <span>{ data.mn ?? '--' }</span>
        </div>
      </div>
      <div className={ styles.status }>
        <span>点位状态</span>
        <div className={ styles.statusIcon }>
          { data.alarm === NORMAL ?
            <>
              <img src={ airSvg } alt=''/>
              <span className={ styles.normalText }>正常</span>
            </> : data.alarm === ALARMING ?
              <>
                <img src={ airAlarmSvg } alt=''/>
                <span className={ styles.alarmText }>报警</span>
              </> : data.alarm === PREALARMING ?
                <>
                  <img src={ airAlarmSvg } alt=''/>
                  <span className={ styles.alarmText }>报警</span>
                </>
                : '未连接'
          }
          {/*<Button type='text' onClick={() => goPollution(data)}>查看</Button>*/}

        </div>
      </div>
    </div>
  );
};

export default TabChildren;
