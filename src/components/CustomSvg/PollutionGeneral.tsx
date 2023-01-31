import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export const Svg = () => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 11.47 14.33' fill='#fff' width='1em' height='1em'>
    <g id='图层_2' data-name='图层 2'>
      <g id='图层_1-2' data-name='图层 1'>
        <path className='cls-1'
              d='M5.73,0V5.73h5.74v7.89a.71.71,0,0,1-.72.71H.72a.69.69,0,0,1-.51-.21.71.71,0,0,1-.21-.5V.72A.72.72,0,0,1,.72,0ZM1.43,2.15V3.58H4.3V2.15ZM1.43,5V6.45H4.3V5Zm0,2.86V9.32H10V7.88Zm0,2.87v1.43H10V10.75ZM7.16.37A.14.14,0,0,1,7.25.24a.15.15,0,0,1,.16,0l3.81,3.78a.16.16,0,0,1,0,.16.13.13,0,0,1-.13.09H7.31a.12.12,0,0,1-.1,0,.14.14,0,0,1,0-.1Z'/>
      </g>
    </g>
  </svg>
);

const PollutionGeneral = (props: Partial<CustomIconComponentProps>) => <Icon component={Svg} {...props} />;
export default PollutionGeneral
