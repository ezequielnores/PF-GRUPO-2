import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const medicos = [
  {
    value: 'medico1',
    label: 'Javier Repeto',
  },
  {
    value: 'medico2',
    label: 'Analia Martinez',
  },
  {
    value: 'medico3',
    label: 'José Cobos',
  },
  {
    value: 'medico4',
    label: 'Augusto Benasco',
  },
];

const Especialidad = [
    {
      value: 'medico1',
      label: 'Otorronologia',
    },
    {
      value: 'medico2',
      label: 'Cardiología',
    },
    {
      value: 'medico3',
      label: 'Neumonologia',
    },
    {
      value: 'medico4',
      label: 'Reumatología',
    },
  ];

export default function MyShifts() {
    const [value, setValue] = React.useState(dayjs('2022-04-07'));
  return (
    <div>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          defaultValue="..."
          helperText="Please select the medic"
        >
          {medicos.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

      </div>

      <div>
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          defaultValue="..."
          helperText="Please select the speciality"
        >
          {Especialidad.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

      </div>
    </Box>

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="Select date and time"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
    </LocalizationProvider>
    
    </div>
  );
}
