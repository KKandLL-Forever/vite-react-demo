import { Button } from "antd";
import cs from "classnames";
import { useState } from "react";
import styles from "./Header.module.less";

function Header () {
  const [show, setShow] = useState(false)
  return (
    <div className={cs("w-[200px]", show ? styles.test : '')}>
      <Button
        type="primary"
        onClick={() => setShow(!show)}
      >
        header
      </Button>
    </div>
  );
};

export default Header;
