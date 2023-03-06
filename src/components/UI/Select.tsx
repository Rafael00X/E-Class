import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

type SelectMenuProps = {
  label: string;
  value: number | string;
  items: { name: string; value: number | string }[];
  callback: (newValue: number | string) => void;
};

export default function MySelect(props: SelectMenuProps) {
  const { label, value, items, callback } = props;
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={label}
        onChange={(e) => callback(e.target.value)}
      >
        {items.map(({ name, value }) => (
          <MenuItem value={value}>{name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
