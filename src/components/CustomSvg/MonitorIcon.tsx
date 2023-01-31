import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export const Svg = () => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 17.01 14.27' fill='#fff' width='1em' height='1em'>
    <g id='图层_2' data-name='图层 2'>
      <g id='图层_1-2' data-name='图层 1'>
        <path className='cls-1'
              d='M2.81,14.27v-.93h9.07v.93Zm6.94-3.15a4.24,4.24,0,1,1,3,1.25,4.24,4.24,0,0,1-3-1.25Zm1.56-2.24H13v2l1.69-3.24h-2V5.41ZM9.13,11.59h-8A1.14,1.14,0,0,1,0,10.45V1.15A1.14,1.14,0,0,1,1.15,0h12A1.14,1.14,0,0,1,14.3,1.15V3.33a5,5,0,0,0-4.32.6L8.79,2.74,5.26,6.19l-1-1L2.06,7.5l.58.58L4.36,6.35l.41.41.49.66L8.79,3.89l.55.55a5,5,0,0,0-.21,7.15Z'/>
      </g>
    </g>
  </svg>
);

const MonitorIcon = (props: Partial<CustomIconComponentProps>) => <Icon component={ Svg } { ...props } />;
export default MonitorIcon
