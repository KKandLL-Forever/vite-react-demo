import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export const Svg = () => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14.75 14.33' fill='#fff' width='1em' height='1em'>
    <g id='图层_2' data-name='图层 2'>
      <g id='图层_1-2' data-name='图层 1'>
        <path className='cls-1'
              d='M2.51,13.05V8.49a5,5,0,0,1,9.9,0v4.56h1.7a.65.65,0,0,1,.64.64.66.66,0,0,1-.64.64H.64A.66.66,0,0,1,0,13.69a.65.65,0,0,1,.64-.64ZM7.83,5.54l-2.44,4h2l-.5,3,2.44-4H7.34Zm3.72-4.41a.51.51,0,0,1,.17.67l-.89,1.52L10,2.86l.88-1.53a.5.5,0,0,1,.67-.2ZM7.46,0A.5.5,0,0,1,8,.49V2.22h-1V.49A.5.5,0,0,1,7.46,0ZM3.37,1.13A.48.48,0,0,1,4,1.3L4.9,2.83l-.84.47L3.18,1.77a.47.47,0,0,1,.19-.64Zm-3,3A.46.46,0,0,1,1,4l1.53.89-.47.84L.54,4.8a.5.5,0,0,1-.17-.66Zm14.18,0a.51.51,0,0,1-.17.66l-1.53.89-.47-.84L13.91,4a.47.47,0,0,1,.64.18Z'/>
      </g>
    </g>
  </svg>
);

const PollutionAlarm = (props: Partial<CustomIconComponentProps>) => <Icon component={Svg} {...props} />;
export default PollutionAlarm
