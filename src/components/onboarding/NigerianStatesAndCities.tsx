import React, { useState, useEffect } from 'react';
import {
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Box,
  Typography,
} from '@mui/material';
import { useFormikContext } from 'formik';
import styled from 'styled-components';

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
function NigeriaStatesAndCities() {
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const { setFieldValue } = useFormikContext();

  const statesAndCities: any = {
    Lagos: [`Ikeja`, `Lekki`, `Victoria Island`],
    Oyo: [`Ibadan`, `Ogbomosho`, `Oyo`],
    Abia: [`Aba`, `Umuahia`, `Ohafia`],
    Adamawa: [`Yola`, `Mubi`, `Jimeta`],
    'Akwa Ibom': [`Uyo`, `Ikot Ekpene`, `Eket`],
    Anambra: [`Awka`, `Onitsha`, `Nnewi`],
    Bauchi: [`Bauchi`, `Katagum`, `Jamaare`],
    Bayelsa: [`Yenagoa`, `Brass`, `Sagbama`],
    Benue: [`Makurdi`, `Otukpo`, `Gboko`],
    Borno: [`Maiduguri`, `Biu`, `Bama`],
    'Cross River': [`Calabar`, `Ogoja`, `Obudu`],
    Delta: [`Asaba`, `Warri`, `Sapele`],
    Ebonyi: [`Abakaliki`, `Afikpo`, `Ishielu`],
    Edo: [`Benin City`, `Auchi`, `Uromi`],
    Ekiti: [`Ado-Ekiti`, `Ikere`, `Ilawe`],
    Enugu: [`Enugu`, `Nsukka`, `Oji-River`],
    FCT: [`Abuja`, `Gwagwalada`, `Kuje`],
    Gombe: [`Gombe`, `Dukku`, `Bajoga`],
    Imo: [`Owerri`, `Okigwe`, `Orlu`],
    Jigawa: [`Dutse`, `Hadejia`, `Gumel`],
    Kaduna: [`Kaduna`, `Zaria`, `Kafanchan`],
    Kano: [`Kano`, `Fagge`, `Dala`],
    Katsina: [`Katsina`, `Funtua`, `Daura`],
    Kebbi: [`Birnin Kebbi`, `Argungu`, `Yauri`],
    Kogi: [`Lokoja`, `Okene`, `Idah`],
    Kwara: [`Ilorin`, `Offa`, `Omu-Aran`],
    Nasarawa: [`Lafia`, `Keffi`, `Akwanga`],
    Niger: [`Minna`, `Bida`, `Suleja`],
    Ogun: [`Abeokuta`, `Ijebu-Ode`, `Sagamu`],
    Osun: [`Osogbo`, `Ile-Ife`, `Ilesa`],
    Plateau: [`Jos`, `Pankshin`, `Riyom`],
    Rivers: [`Port Harcourt`, `Okrika`, `Omoku`],
    Sokoto: [`Sokoto`, `Gwadabawa`, `Tambuwal`],
    Taraba: [`Jalingo`, `Wukari`, `Bali`],
    Yobe: [`Damaturu`, `Potiskum`, `Gujba`],
    Zamfara: [`Gusau`, `Anka`, `Maru`],
  };

  useEffect(() => {
    const cities: any = [];
    selectedStates.forEach((state) => {
      if (statesAndCities[state]) {
        cities.push(...statesAndCities[state]);
      }
    });
    setAvailableCities(Array.from(new Set<string>(cities)));
  }, [selectedStates, statesAndCities]);

  const handleStateChange = (event: any) => {
    setSelectedStates(event.target.value);
    setSelectedCities([]); // Reset cities when states change
    setFieldValue(`operationStates`, event.target.value);
  };

  const handleCityChange = (event: any) => {
    setSelectedCities(event.target.value);
    setFieldValue(`operationCities`, event.target.value);
  };

  return (
    <Box
      sx={{
        display: `grid`,
        gridTemplateColumns: {
          xs: `1fr`,
          sm: `1fr`,
          md: `1fr 1fr`,
          lg: `1fr 1fr`,
          xl: `1fr 1fr`,
        },
        gap: `1rem`,
        mb: 2,
      }}
    >
      <FormControl variant="outlined" fullWidth>
        <InputLabel>Select Operational States</InputLabel>
        <Select
          sx={{
            borderRadius: `10px`,
            width: {
              xs: `100%`,
              sm: `100%`,
              md: `100%`,
              lg: `100%`,
              xl: `100%`,
            },
          }}
          name="operationStates"
          multiple
          value={selectedStates}
          onChange={handleStateChange}
          label="Select Operational States"
          MenuProps={MenuProps}
        >
          {Object.keys(statesAndCities).map((state) => (
            <MenuItem
              key={state}
              value={state}
              sx={{
                borderRadius: `10px`,
                width: `100%`,
                '& .MuiMenu-paper': {
                  // Targeting the dropdown paper
                  maxHeight: `300px`,
                  overflowY: `auto`,
                },
                overflowX: `hidden`,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  textOverflow: `ellipsis`,
                  whiteSpace: `nowrap`,
                  overflow: `hidden`,
                }}
                style={{
                  fontSize: `14px`,
                }}
              >
                {state}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" fullWidth>
        <InputLabel>Select Cities Operational</InputLabel>
        <Select
          sx={{
            borderRadius: `10px`,
            width: `100%`,
            '& .MuiMenu-paper': {
              // Targeting the dropdown paper
              maxHeight: `300px`,
              overflowY: `auto`,
            },
            overflowX: `hidden`,
          }}
          name="operationCities"
          multiple
          value={selectedCities}
          onChange={handleCityChange}
          label="Select Cities"
          disabled={!selectedStates.length}
          MenuProps={MenuProps}
        >
          {availableCities.map((city) => (
            <MenuItem key={city} value={city}>
              <Typography
                variant="caption"
                sx={{
                  textOverflow: `ellipsis`,
                  whiteSpace: `nowrap`,
                  overflow: `hidden`,
                }}
                style={{
                  fontSize: `14px`,
                }}
              >
                {city}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default NigeriaStatesAndCities;
