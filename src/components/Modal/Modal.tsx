import React from 'react';
import { useSelector } from 'react-redux'
import classnames from 'classnames'

import styles from './Modal.module.less';
import useSlot from '@/Hooks/useSlots'
import cancelBtn from '@/assets/img/Modal/Modal-cancel-btn.png';
import { ROOT_SLICE } from '@/constant'

function Modal ({children, show, onCancel}) {
  const root = useSelector(state => state[ROOT_SLICE])
  const Slot = useSlot(children)
  return (
    <div className={ styles.Modal } style={ show ? {display: 'flex'} : {display: 'none'} }>
      <img src={ cancelBtn } alt='x' className={ styles.myBtn } onClick={ onCancel }/>
      <div className={ styles.modalLeft }>
        <div className={ styles.title }>
          <Slot name='title'/>
        </div>
        <div className={classnames(styles.default, styles.scrollStyle) }>
          <Slot name='default'></Slot>
        </div>
      </div>
      <div className={ styles.modalRight } style={ root.module === 'pollution' ? {display: 'none'} : {display: 'flex'} }>
        <Slot name='video'/>
      </div>
    </div>
  );
};

export default Modal;
