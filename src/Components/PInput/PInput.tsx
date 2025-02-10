import { TextField } from "@mui/material";

function PInput({testId, type, label}) {
    return (
        <TextField
            data-testid={testId}
            type={type}
            label={label}
          />
    )
}

export  {PInput};