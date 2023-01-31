import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export const Svg = () => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14.63 14.63' fill='#fff' width='1em' height='1em'>
  
    <g id='图层_2' data-name='图层 2'>
      <g id='图层_1-2' data-name='图层 1'>
        <path className='cls-1'
              d='M13.89,5.75H12.61a12.86,12.86,0,0,0-.52-1.2L13,3.67a.71.71,0,0,0,0-1l-1-1a.73.73,0,0,0-1,0l-.86.91c-.39-.22-.93-.39-1.19-.51V.73A.83.83,0,0,0,8.05,0H6.58a.83.83,0,0,0-.83.73V2a12.48,12.48,0,0,0-1.2.51l-.88-.91a.72.72,0,0,0-1,0l-1,1a.73.73,0,0,0,0,1l.91.85A12.48,12.48,0,0,0,2,5.75H.73A.83.83,0,0,0,0,6.58V8.05a.83.83,0,0,0,.73.83H2c.12.26.29.8.51,1.19L1.62,11a.74.74,0,0,0,0,1l1,1a.74.74,0,0,0,1,0l.85-.9c.39.21.93.39,1.2.51v1.28a.83.83,0,0,0,.83.74H8.05a.83.83,0,0,0,.83-.74V12.61c.26-.12.8-.3,1.19-.52L11,13a.72.72,0,0,0,1,0l1-1a.74.74,0,0,0,0-1l-.9-.86c.21-.39.39-.93.51-1.19h1.28a.83.83,0,0,0,.74-.83V6.58a.83.83,0,0,0-.74-.83ZM7.31,10.61a3.3,3.3,0,1,1,3.3-3.3,3.3,3.3,0,0,1-3.3,3.3Z'/>
      </g>
    </g>
  </svg>
);

const EnterpriseGeneral2 = (props: Partial<CustomIconComponentProps>) => <Icon component={Svg} {...props} />;
export default EnterpriseGeneral2
