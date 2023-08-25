import cs from "classnames";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import styles from "./Header.module.less";

function Header () {
  const [show, setShow] = useState(false)
  const {pathname} = useLocation()
  return (
    <div>
      <div className={cs(show ? styles.test : '')}>
        {/*<Link to="/imc" className="ml-2 mr-2">综合管理</Link>*/}
        {/*<Link to="/pollution" state={{some: '/imc'}} className="ml-2 mr-2">污染源</Link>*/}
        {/*<Link to="/water" className="ml-2 mr-2">水质</Link>*/}
        {/*<Link to="/solid" className="ml-2 mr-2">固废</Link>*/}
        {/*<Link to="/map" className="ml-2 mr-2">L7Map</Link>*/}
        <Link to="/charts" className="ml-2 mr-2">antd-charts</Link>
      </div>
      <div className='text-yellow w-full flex justify-center'>
        路由值： {pathname}
      </div>
    </div>
  );
};

export default Header;
