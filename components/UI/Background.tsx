import { ThemeContext } from "@/contexts/Theme";
import { useContext } from "react";
import styles from "./Background.module.css";

const Background = () => {
  const context = useContext(ThemeContext);
  return (
    <div className={`${styles.background} ${context?.theme.background}`}></div>
  );
};

export default Background;
