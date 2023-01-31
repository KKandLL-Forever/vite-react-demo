import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export const Svg = () => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14.73 14.73' fill='#fff' width='1em' height='1em'>
    <g id='图层_2' data-name='图层 2'>
      <g id='图层_1-2' data-name='图层 1'>
        <path className='cls-1'
              d='M.92,5.52H2.76a.92.92,0,0,1,.92.92v3.69a.92.92,0,0,1-.92.92H.92A.92.92,0,0,1,0,10.13V6.44a.92.92,0,0,1,.92-.92ZM6.44,1.84H8.29a.92.92,0,0,1,.92.92v7.37a.93.93,0,0,1-.92.92H6.44a.93.93,0,0,1-.92-.92V2.76a.92.92,0,0,1,.92-.92ZM12,0h1.84a.86.86,0,0,1,.92.79v9.47a.87.87,0,0,1-.92.79H12a.87.87,0,0,1-.92-.79V.79A.86.86,0,0,1,12,0ZM.92,12H13.81a.92.92,0,0,1,.92.92v.92a.92.92,0,0,1-.92.92H.92A.92.92,0,0,1,0,13.81v-.92A.92.92,0,0,1,.92,12Z'/>
      </g>
    </g>
  </svg>
);

const PollutionEvent = (props: Partial<CustomIconComponentProps>) => <Icon component={Svg} {...props} />;
export default PollutionEvent
