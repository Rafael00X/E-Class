type ContainerProps = {
  children?: React.ReactNode;
};
const Container = (props: ContainerProps) => {
  return (
    <div
      style={{
        maxWidth: 1400,
        margin: "auto",
        padding: 25,
      }}
    >
      {props.children}
    </div>
  );
};

export default Container;
