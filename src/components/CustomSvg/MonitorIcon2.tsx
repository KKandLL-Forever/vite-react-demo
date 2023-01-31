import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export const Svg = () => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16.15 14.45' fill='#fff' width='1em' height='1em'>
    <g id='图层_2' data-name='图层 2'>
      <g id='图层_1-2' data-name='图层 1'>
        <path className='cls-1'
              d='M11.77,13.44h-1.5l-.18-.32h-4l-.18.32H4.38a.51.51,0,1,0,0,1h7.39a.51.51,0,1,0,0-1ZM14.8,0H1.35A1.22,1.22,0,0,0,0,1.33v9.79a1.22,1.22,0,0,0,1.35,1.33H14.8a1.22,1.22,0,0,0,1.35-1.33V1.33A1.22,1.22,0,0,0,14.8,0ZM12.28,5.38l0,0L9.42,8.57a.64.64,0,0,1-.88,0l-2-1.75L4.9,8.49a.69.69,0,0,1-.94,0H4a.6.6,0,0,1-.2-.42.62.62,0,0,1,.18-.43L6.08,5.52a.61.61,0,0,1,.83,0l2,1.83,2.33-2.61a.68.68,0,0,1,.91-.08.55.55,0,0,1,.2.35.51.51,0,0,1-.1.38Z'/>
      </g>
    </g>
  </svg>
);

const MonitorIcon2 = (props: Partial<CustomIconComponentProps>) => <Icon component={ Svg } { ...props } />;
export default MonitorIcon2
