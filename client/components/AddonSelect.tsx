import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Addon } from "../typings/types";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function AddonSelect({ onStateChange }: any) {
  const { addons } = useContext(AppContext);

  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    const selectedNames = event.target.value as string[];

    console.log(selectedNames);

    const selectedIds = addons
      .filter((addon) => {
        return selectedNames.includes(addon.addon_name);
      })
      .map((addon) => {
        return addon.id;
      });

    onStateChange(selectedIds);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Addons</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Addons" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {addons.map((addon: any) => (
            <MenuItem
              sx={{ display: "flex", justifyContent: "space-between" }}
              key={addon.id}
              value={addon.addon_name}
            >
              <span>{addon.addon_name}</span>
              <span>{"$" + addon.price}</span>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
