import styles from "./Card.module.css";
import { ThemeContext } from "@/contexts/Theme";
import { useContext } from "react";

type CardProps = {
  children: React.ReactNode;
  style?: {};
};

const Card = (props: CardProps) => {
  const { children, style } = props;
  const context = useContext(ThemeContext);
  return (
    <div className={`${styles.card} ${context?.theme.card}`} style={style}>
      {children}
    </div>
  );
};

export default Card;
