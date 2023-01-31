import styles from './FullScreen.module.less';
import useSlot from '@/Hooks/useSlots';

function FullScreen( {children} ) {
  const Slot = useSlot(children)
  return (
    <div className={styles.bigScreen}>
      <Slot name='fullScreen-top'/>
      <div className={styles.bottom}>
        <Slot name='fullScreen-bottom'/>
      </div>
    </div>
  );
}

export default FullScreen;
