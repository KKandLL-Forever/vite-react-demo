import cs from "classnames";
import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Header.module.less";

function Header () {
  const [show, setShow] = useState(false)
  return (
    <div className={cs(show ? styles.test : '')}>
      <Link to="/imc" className="ml-2 mr-2">综合管理</Link>
      <Link to="/pollution" className="ml-2 mr-2">污染源</Link>
      <Link to="/water" className="ml-2 mr-2">水质</Link>
      <Link to="/solid" className="ml-2 mr-2">固废</Link>
    </div>
  );
};

export default Header;
