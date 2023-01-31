import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export const Svg = () => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 23.47 23.64' fill='#f67e3a' width='1em' height='1em'>
    <g id='图层_2' data-name='图层 2'>
      <g id='图层_1-2' data-name='图层 1'>
        <path className='cls-1'
              d='M11.85,23.64A11.88,11.88,0,0,1,7.22.83a11.88,11.88,0,0,1,9.25,21.88,11.63,11.63,0,0,1-4.62.93Zm0-21.9a10,10,0,1,0,10,10,10,10,0,0,0-10-10Z'/>
        <path className='cls-1'
              d='M13.17,11.78,16.94,8a.94.94,0,0,0-1.33-1.33l-3.76,3.77L8.08,6.67a.94.94,0,0,0-1.33,0A1,1,0,0,0,6.75,8l3.78,3.77L6.75,15.55a.94.94,0,0,0-.19,1,.92.92,0,0,0,.85.57.91.91,0,0,0,.67-.28l3.77-3.76,3.76,3.76a.9.9,0,0,0,.65.28.92.92,0,0,0,.85-.57.94.94,0,0,0-.19-1Z'/>
      </g>
    </g>
  </svg>
);

const PollutionCross = (props: Partial<CustomIconComponentProps>) => <Icon component={ Svg } { ...props } />;
export default PollutionCross
