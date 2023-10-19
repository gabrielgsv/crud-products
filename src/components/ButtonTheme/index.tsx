import { Button, useColorMode } from "@chakra-ui/react";
import style from "./style.module.css";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ButtonTheme() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div className={style.container}>
      <Button onClick={toggleColorMode}>
        {colorMode === "light" ? <FiSun /> : <FiMoon />}
      </Button>
    </div>
  );
}
