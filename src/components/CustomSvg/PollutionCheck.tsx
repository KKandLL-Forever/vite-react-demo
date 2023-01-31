import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export const Svg = () => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 23.47 23.64' fill='#32FDFE' width='1em' height='1em'>
    <g id='图层_2' data-name='图层 2'>
      <g id='图层_1-2' data-name='图层 1'>
        <path className='cls-1'
              d='M16.6,7.92a1,1,0,0,0-.69.29l-5.16,5.16-3.19-3.2a1,1,0,0,0-.69-.29,1,1,0,0,0-1,1,1,1,0,0,0,.28.69l3.88,3.9a1,1,0,0,0,.69.28,1,1,0,0,0,.69-.28h0l5.85-5.86a1,1,0,0,0-.69-1.66Z'/>
        <path className='cls-1'
              d='M11.85,23.64A11.88,11.88,0,0,1,7.22.83a11.88,11.88,0,0,1,9.25,21.88,11.63,11.63,0,0,1-4.62.93Zm0-21.9a10,10,0,1,0,10,10,10,10,0,0,0-10-10Z'/>
      </g>
    </g>
  </svg>
);

const PollutionCheck = (props: Partial<CustomIconComponentProps>) => <Icon component={ Svg } { ...props } />;
export default PollutionCheck
