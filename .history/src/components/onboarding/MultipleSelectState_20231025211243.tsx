import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Typography } from '@mui/material';
import { useField } from 'formik';

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

function getStyles(service: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(service) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightBold,
    color:
      personName.indexOf(service) === -1
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
  };
}

export default function MultipleSelectState({
  name,
  setServices,
  states,
}: any) {
  const [personName, setPersonName] = React.useState<string[]>([]);
  const theme = useTheme();
  const [field, meta, form] = useField(name);
  const { setValue } = form;

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setServices(value);
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === `string` ? value.split(`,`) : value,
    );
    setValue(value || []);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Select Operational States
        </InputLabel>
        {meta.touched && meta.error ? <div>{meta.error}</div> : null}
        <Select
          multiple
          {...field}
          label="Select services"
          value={personName}
          onChange={handleChange}
          sx={{
            borderRadius: `10px`,
            overflowX: `hidden`,
            width: {
              xs: `100%`,
              sm: `100%`,
              md: `100%`,
              lg: `100%`,
              xl: `100%`,
            },
          }}
          inputProps={{ 'aria-label': `Without label` }}
          MenuProps={MenuProps}
        >
          {states?.map((state: any) => (
            <MenuItem
              key={state.name}
              value={state.name}
              style={getStyles(state, personName, theme)}
              sx={{ borderBottom: `solid 1px #fff` }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: `primary.main`,
                  fontWeight: `500`,
                  textOverflow: `ellipsis`,
                  whiteSpace: `nowrap`,
                  overflow: `hidden`,
                }}
              >
                {state.name}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
