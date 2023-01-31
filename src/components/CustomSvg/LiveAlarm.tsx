import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export const Svg = () => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14.02 14.02' fill='#fff' width='1em' height='1em'>
    <g id='图层_2' data-name='图层 2'>
      <g id='图层_1-2' data-name='图层 1'>
        <path className='cls-1'
              d='M13.74,13.15a1.77,1.77,0,0,1-1.55.87H1.83a1.77,1.77,0,0,1-1.55-.87A1.8,1.8,0,0,1,.2,11.37L5.38,1A1.82,1.82,0,0,1,8.64,1l5.18,10.36a1.8,1.8,0,0,1-.08,1.78ZM7,11.52A.76.76,0,0,0,7,10a.76.76,0,0,0,0,1.51ZM8.14,5.13a1.13,1.13,0,0,0-2.26,0v.1l.75,4.06h0A.39.39,0,0,0,7,9.64a.37.37,0,0,0,.37-.35h0l.75-4.06Z'/>
      </g>
    </g>
  </svg>
);

const LiveAlarm = (props: Partial<CustomIconComponentProps>) => <Icon component={ Svg } { ...props } />;
export default LiveAlarm
