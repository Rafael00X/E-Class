import styles from "./InputField.module.css";

type InputFieldProps = {
  label: string;
  name: string;
  type: string;
  value: string;
  error: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField = (props: InputFieldProps) => {
  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <br />
      <input
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
      <p className={styles.error}>{props.error}</p>
    </div>
  );
};

export default InputField;
