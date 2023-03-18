import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@mui/material";

type SelectMenuProps = {
  label: string;
  value: number | string;
  items: { name: string; value: number | string }[];
  callback: (newValue: number | string) => void;
};

export default function Select(props: SelectMenuProps) {
  const { label, value, items, callback } = props;
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <MuiSelect
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={label}
        onChange={(e) => callback(e.target.value)}
      >
        {items.map(({ name, value }, index) => (
          <MenuItem key={index} value={value}>
            {name}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}
