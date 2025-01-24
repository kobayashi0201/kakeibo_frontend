import React, { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

interface ToggleButtonProps {
  label: Array<string>;
  handleToggleChange: (newOption: string) => void;
}

const ToggleButtonComponent: React.FC<ToggleButtonProps> = ({
  label,
  handleToggleChange,
}) => {
  const [selected, setSelected] = useState(label[0]);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newOption: string | null,
  ) => {
    if (newOption !== null) {
      setSelected(newOption);
      handleToggleChange(newOption);
    }
  };

  return (
    <ToggleButtonGroup value={selected} exclusive onChange={handleChange}>
      <ToggleButton value={label[0]} aria-label={label[0]}>
        {label[0]}
      </ToggleButton>
      <ToggleButton value={label[1]} aria-label={label[1]}>
        {label[1]}
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ToggleButtonComponent;
