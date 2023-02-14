import Button from "@/components/UI/Button";
import Card from "@/components/UI/Card";
import { ThemeContext } from "@/contexts/Theme";
import { useContext } from "react";

export default function Home() {
  const context = useContext(ThemeContext);
  const handleClick = () => context?.swapTheme();
  return (
    <div>
      <Card>
        <h1>Hello World!</h1>
      </Card>
      <Button onClick={handleClick}>Click Me</Button>
      <Button onClick={handleClick} type="hlt">
        Click Me
      </Button>
    </div>
  );
}
