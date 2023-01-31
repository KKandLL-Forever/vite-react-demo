import styles from './Pane.module.less';
import useSlot from '@/Hooks/useSlots'
import React from 'react'

function Pane ({children}) {
  const Slot = useSlot(children)
  return (
    <div className={ styles.pane }>
      <div className={ styles.paneTop }>
        <Slot name='header'/>
      </div>
      <div className={ styles['paneDefault'] }>
        <Slot></Slot>
      </div>
      <div className={ styles.paneBottom }>
        <Slot name='bottom'/>
      </div>
    </div>
  );
}

export default Pane;
