import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

// @ts-ignore
export const Svg = () => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16.54 14.33' fill='#fff' width='1em' height='1em'>
    <g id='图层_2' data-name='图层 2'>
      <g id='图层_1-2' data-name='图层 1'>
        <path className='cls-1'
              d='M16,13.23h-.55V5.51a2.22,2.22,0,0,0-2.21-2.2H9.92v9.37a.55.55,0,1,1-1.1,0V2.21A2.21,2.21,0,0,0,6.62,0H3.31A2.21,2.21,0,0,0,1.1,2.21v11H.55a.55.55,0,0,0,0,1.1H16a.55.55,0,0,0,0-1.1ZM6.06,11H3.86a.56.56,0,0,1,0-1.11h2.2a.56.56,0,1,1,0,1.11Zm0-3.31H3.86a.55.55,0,0,1,0-1.1h2.2a.55.55,0,1,1,0,1.1Zm0-3.31H3.86a.55.55,0,0,1,0-1.1h2.2a.55.55,0,1,1,0,1.1ZM13.78,11h-2.2a.56.56,0,0,1,0-1.11h2.2a.56.56,0,0,1,0,1.11Zm0-3.31h-2.2a.55.55,0,0,1,0-1.1h2.2a.55.55,0,1,1,0,1.1Z'/>
      </g>
    </g>
  </svg>
);


const EnterpriseGeneral = (props: Partial<CustomIconComponentProps>) => <Icon component={Svg} {...props} />;
export default EnterpriseGeneral
