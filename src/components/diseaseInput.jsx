import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

export default function DiseaseInput({ acceptFunction, closeFunction }) {
  const [condition, setCondition] = useState("")

  return (
    <Card
      sx={{
        width: "15rem",
        padding: "3rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
        justifyContent: "center",
        margin: "30vh auto",
      }}
    >
      <TextField
        label="Enter Disease Condition"
        placeholder="Enter Disease"
        variant="standard"
        onKeyUp={(e) => { setCondition(e.target.value) }}
      />

      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={() => acceptFunction(condition)} disabled={condition ? false : true}>
          <DoneIcon />
        </Button>

        <Button variant="contained" onClick={closeFunction}>
          <CloseIcon />
        </Button>
      </Stack>
    </Card>
  );
}
