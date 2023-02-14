import { ThemeContext } from "@/contexts/Theme";
import { useContext } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  style?: {};
  type?: string;
  onClick: () => void;
};

const Button = (props: ButtonProps) => {
  const { onClick, children, style, type } = props;
  const context = useContext(ThemeContext);
  const buttonStyle =
    type === "hlt" ? "button-highlight" : context?.theme.button;
  return (
    <button
      className={`${styles.btn} ${buttonStyle}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
