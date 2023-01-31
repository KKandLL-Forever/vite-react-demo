import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export const Svg = () => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 15.03 10.88' fill='#fff' width='1em' height='1em'>
    <g id='图层_2' data-name='图层 2'>
      <g id='图层_1-2' data-name='图层 1'>
        <path className='cls-1'
              d='M12,2a2,2,0,0,0-2-2H2A2,2,0,0,0,0,2V8.85a2,2,0,0,0,2,2H9.91a2,2,0,0,0,2-2,.22.22,0,0,1,.1-.18.23.23,0,0,1,.2,0L14,9.15a.83.83,0,0,0,1-.56.85.85,0,0,0,0-.23V2.49a.82.82,0,0,0-.82-.82,1,1,0,0,0-.24,0l-1.76.52a.17.17,0,0,1-.17,0A.19.19,0,0,1,12,2ZM4.34,7.25V3.71a.83.83,0,0,1,.83-.83A.78.78,0,0,1,5.61,3L8.4,4.78a.83.83,0,0,1,.26,1.14.78.78,0,0,1-.26.25L5.61,7.94a.82.82,0,0,1-1.14-.25.78.78,0,0,1-.13-.44Z'/>
      </g>
    </g>
  </svg>
);

const VideoIcon = (props: Partial<CustomIconComponentProps>) => <Icon component={ Svg } { ...props } />;
export default VideoIcon
