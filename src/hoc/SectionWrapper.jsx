import { motion } from 'framer-motion';
import { staggerContainer } from '../utils/motion';
import { Box } from '@mui/material';

const StarWrapper = (Component, idName) =>
  function HOC() {
    return (
      <Box
        component={motion.section}
        variants={staggerContainer()}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.25 }}
        sx={{ padding: `${styles.padding}`, position: 'relative', zIndex: '0' }}
      >
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>

        <Component />
      </Box>
    );
  };

export default StarWrapper;
