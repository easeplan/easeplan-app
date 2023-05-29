import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Typography } from '@mui/material';

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

const services = [
  `Catering`,
  `DJ`,
  `Entertainer`,
  `Event Decorator`,
  `MC`,
  `MakeUp Artist`,
  `Photographer`,
  `Print Vendor`,
  `Security Personnel`,
  `Transportation Coordinator`,
  `Userhing`,
  `Venue Manager`,
  `Videographer`,
];

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

export default function MultipleSelect({ setServices }: any) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setServices(value);
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === `string` ? value.split(`,`) : value,
    );
  };

  return (
    <div>
      <FormControl fullWidth size="small" sx={{ my: 1 }}>
        <Select
          multiple
          displayEmpty
          value={personName}
          onChange={handleChange}
          sx={{ py: `0.4rem`, borderRadius: `10px` }}
          inputProps={{ 'aria-label': `Without label` }}
          MenuProps={MenuProps}
        >
          {services.map((service) => (
            <MenuItem
              key={service}
              value={service}
              style={getStyles(service, personName, theme)}
              sx={{ borderBottom: `solid 1px #fff` }}
            >
              <Typography
                variant="caption"
                sx={{
                  backgroundColor: `primary.main`,
                  color: `secondary.main`,
                  borderRadius: `8px`,
                  p: 1,
                }}
              >
                {service}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
