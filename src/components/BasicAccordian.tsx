import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Box, Typography, createSvgIcon } from '@mui/material';

const Caretdown = createSvgIcon(
  <svg
    width="16"
    height="11"
    viewBox="0 0 16 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.88 0.453369L8 6.56004L14.12 0.453369L16 2.33337L8 10.3334L0 2.33337L1.88 0.453369Z"
      fill="#73877B"
    />
  </svg>,
  `Caretdown`,
);

type BAccordProps = {
  header: string;
  content: string[];
};

export default function BasicAccordion({ header, content }: BAccordProps) {
  return (
    <div>
      <Accordion style={{ boxShadow: `none` }}>
        <AccordionSummary
          expandIcon={<Caretdown />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box
            sx={{
              display: `flex`,
            }}
          >
            <Box sx={{ display: `flex`, alignItems: `center` }}>
              <Box
                sx={{
                  background: `#0F3443`,
                  width: 20,
                  height: 20,
                  marginRight: 1,
                }}
              >
                &nbsp;
              </Box>
            </Box>
            <Typography sx={{ fontWeight: `bold` }}>{header}</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            {content.map((data, idx) => (
              <Typography sx={{ mb: 2 }} key={idx}>
                {data}
              </Typography>
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
