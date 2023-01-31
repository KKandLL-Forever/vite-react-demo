import React, {useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactECharts from 'echarts-for-react';
import 'echarts-liquidfill'
// @ts-ignore
import ScrollBoard from '@jiaminghi/data-view-react/es/scrollBoard'
import classnames from 'classnames';
import { Progress, Divider } from 'antd';
import {EChartsInstance} from 'echarts-for-react'
import { HomeOutlined, } from '@ant-design/icons';
import {isNaN} from 'lodash'

import styles from './Synthesis.module.less';
import { Pane } from '@/components/Pane'
import { LeafletMap } from '@/components/LeafletMap'
// import { isNaN } from '@/utils/structUtil';
import {
  getPmsList,
  getPmsState,
  getSynthesisEnterprise,
  getWaste,
  getWms,
  InitialState
} from '@/store/slice/synthesisSlice'
import { setModule } from '@/store/slice/rootSlice';
// eslint-disable-next-line no-unused-vars
import { BOOT_SLICE, SYNTHESIS_SLICE } from '@/constant'
import { UpLeftOpts, UpRightOpts, BottomRightOpts, BottomRightOpts2 } from './echartsConfig';
import { getEntMapState } from '@/store/slice/synthesisSlice'
import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store";


function Synthesis () {
  const dispatch = useAppDispatch()
  const synthesis = useAppSelector((state:RootState) => state[SYNTHESIS_SLICE])
  const chartRef = useRef<EChartsInstance>(null)
  // const boot = useSelector(state => state[BOOT_SLICE])
  useEffect(() => {
    dispatch(setModule('synthesis'))
  }, [])
  useEffect(() => {
    dispatch(getSynthesisEnterprise('/imc/comprehensive/enterprise'))
  }, [])
  useEffect(() => {
    dispatch(getPmsState('/imc/comprehensive/pms/stat'))
  }, [])
  useEffect(() => {
    dispatch(getPmsList('/imc/comprehensive/pms/latest'))
    let intervalId = setInterval(() => {
      dispatch(getPmsList('/imc/comprehensive/pms/latest'))
    },30000)
    return  () => clearInterval(intervalId)
  }, [])
  useEffect(() => {
    dispatch(getWaste('/imc/comprehensive/waste'))
  }, [])
  useEffect(() => {
    dispatch(getWms('/imc/comprehensive/wms'))
  }, [])
  useEffect(() => {
    Object.assign(UpLeftOpts.series[0], {data: synthesis.enterprise.portrait})
    chartRef.current.dispose()
    chartRef.current.renderNewEcharts()
  }, [synthesis.enterprise])
  useEffect(() => {
    Object.assign(UpRightOpts.xAxis[0], {data: synthesis?.wms?.xData ?? []})
    Object.assign(UpRightOpts.series[0], {data: synthesis?.wms?.seriesData ?? []})
  }, [synthesis.wms])
  useEffect(() => {
    dispatch(getEntMapState())
    let intervalId = setInterval(() => {
      dispatch(getEntMapState())
    }, 30000)
    return () => clearInterval(intervalId)
  }, [])
  
  const onlineRatio = (synthesis.pmsState.online / synthesis.pmsState.total) * 100
  const config = {
    rowNum: 3,
    headerBGC: '#10223B',
    oddRowBGC: '#073447',
    evenRowBGC: '#10223B',
    columnWidth: [180],
    header: ['点位', '因子', '状态', '时间'],
    data: synthesis.pmsList
  }
  
  // function handleHover (e) {
  //   console.log(e)
  // }
  
  // console.log(synthesis, 'synthesis')
  // console.log(boot,'boot')
  
  return useMemo(() =>
      <>
        <div className={ styles.withAnimationLeftIn }>
          <Pane>
            {/*左上*/}
            <div slot='header' className={ classnames(styles.topContent, styles.synLeftTop) }>
              <div className={ styles['topContent-title'] }>
                <HomeOutlined/>
                <span>企业概况</span>
              </div>
              <div className={ styles['topContent-body'] }>
                <div className={ styles['synLeftTop-data'] }>
                  <div className={ styles['synLeftTop-data-item'] }>
                    <div className='flex justify-center'>
                      <span>收录企业</span>
                      <span>{ synthesis.enterprise.ent_total ?? 0 }</span>家
                    </div>
                  </div>
                  <div className={ styles['synLeftTop-data-item'] }>
                    <div className='flex justify-center'>
                      <span>废气监控</span>
                      <span>{ synthesis.enterprise.air_total ?? 0 }</span>个
                    </div>
                  </div>
                  <div className={ styles['synLeftTop-data-item'] }>
                    <div className='flex justify-center'>
                      <span>废水监控</span>
                      <span>{ synthesis.enterprise.water_total ?? 0 }</span>个
                    </div>
                  </div>
                  <div className={ styles['synLeftTop-data-item'] }>
                    <div className='flex justify-center'>
                      <span>治污监控</span>
                      <span>{ synthesis.enterprise.facility_total ?? 0 }</span>个
                    </div>
                  </div>
                </div>
                <ReactECharts
                  ref={ chartRef }
                  className={ styles.echarts }
                  option={ UpLeftOpts }
                  style={ {height: '100%'} }
                />
              </div>
            </div>
            {/*左下*/}
            <div slot='bottom' className={ classnames(styles.bottomContent, styles.synLeftBottom) }>
              <div className={ styles['bottomContent-title'] }>
                <HomeOutlined/>
                <span>监测情况</span>
              </div>
              <div className={ styles['bottomContent-body'] }>
                <div className={ styles['synLeftBottom-data'] }>
                  <div className={ styles['synLeftBottom-dataItem4'] }>
                    <div className='flex justify-center'>
                      <span>{ synthesis.pmsState.total ?? 0 }</span>
                      <span>台</span>
                    </div>
                    <div className='flex justify-center'>总台数</div>
                  </div>
                  <Divider type='vertical' style={ {borderColor: '#75FBFD', height: '1.5rem', margin: '0 25px'} }/>
                  <div className={ styles['synLeftBottom-dataItem2'] }>
                    <div className='flex justify-center'>
                      <span>{ synthesis.pmsState.online ?? 0 }</span>台
                    </div>
                    <div className='flex justify-center'>在线台数</div>
                  </div>
                  <Divider type='vertical' style={ {borderColor: '#75FBFD', height: '1.5rem', margin: '0 25px'} }/>
                  <div className={ styles['synLeftBottom-dataItem3'] }>
                    <div className='flex justify-center'>
                      <span>{ isNaN(onlineRatio) ? 0 : parseFloat(onlineRatio.toString()).toFixed() }</span>%
                    </div>
                    <div className='flex justify-center'>在线率</div>
                  </div>
                </div>
                <div className={ styles.list }>
                  {/*<ScrollBoard config={ config } style={ {height: '90%'} }/>*/}
                </div>
              </div>
            </div>
          </Pane>
        </div>
        {/*<LeafletMap/>*/}
        <div className={ styles.withAnimationRightIn }>
          <Pane>
            <div slot='header' className={ classnames(styles.topContent, styles.synRightTop) }>
              <div className={ styles['topContent-title'] }>
                <HomeOutlined/>
                <span>水环境站点概况</span>
              </div>
              <div className={ styles['topContent-body'] }>
                <ReactECharts
                  className={ styles.topChartsLeft }
                  option={ UpRightOpts }
                />
                <div className={ styles.progress }>
                  <div>站点达标率</div>
                  <Progress
                    strokeWidth={20}
                    strokeColor={ {
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    } }
                    trailColor='#10223B'
                    percent={ synthesis.wms.srr as number * 100 }
                    format={() => `${synthesis.wms.srr as number * 100}%`}
                  />
                </div>
              </div>
            </div>
            <div slot='bottom' className={ classnames(styles.bottomContent, styles.synRightBottom) }>
              <div className={ styles['bottomContent-title'] }>
                <HomeOutlined/>
                <span>固废概况</span>
              </div>
              <div className={ styles['bottomContent-body'] }>
                <ReactECharts
                  className={ styles.bottomChartsTop }
                  option={ BottomRightOpts }
                  style={ {height: '40%'} }
                />
                <ReactECharts
                  className={ styles.bottomChartsBottom }
                  option={ BottomRightOpts2 }
                  style={ {height: '50%'} }
                />
              </div>
            </div>
          </Pane>
        </div>
      </>
    , [synthesis])
}

export default Synthesis
