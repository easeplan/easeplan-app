import React from 'react';
import Button from '@mui/material/Button';
import theme from '@/styles/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

// interface ButtonTypes {
//   children: React.ReactNode | React.ReactElement;
//   onClick?: (e: any) => void;
//   size?: string;
//   sx?: any;
//   loading?: boolean;
//   loadingText?: string;
//   type?: 'button' | 'submit' | 'reset';
//   width?: any;
//   smWidth?: any;
//   bgPrimary?: boolean;
//   bgSecondary?: boolean;
//   p?: string;
//   height?: string;
//   mb?: string;
//   mt?: string;
//   mr?: string;
//   ml?: string;
//   mdWidth?: string;
//   lgWidth?: string;
//   fontSize?: string;
// }

const CustomButton = ({
  smWidth,
  mdWidth,
  lgWidth,
  loading,
  loadingText,
  bgPrimary,
  bgSecondary,
  fontSize,
  disabled,
  p,
  mb,
  mt,
  mr,
  ml,
  height,
  ...props
}: any) => {
  return (
    <Button
      disabled={disabled}
      sx={{
        width: {
          xs: smWidth || `100%`,
          sm: smWidth || `100%`,
          md: mdWidth || `100%`,
          lg: lgWidth || `auto`,
          xl: lgWidth || `auto`,
        },
        px: 4,
        mb: mb,
        mt: mt,
        mr: mr,
        ml: ml,
        fontSize: fontSize || `0.9rem`,
      }}
      style={{
        height: height || `2.5rem`,
        backgroundColor: bgPrimary
          ? theme.palette.primary.main
          : bgSecondary
          ? theme.palette.secondary.main
          : `#fff`,
        color: bgPrimary
          ? theme.palette.secondary.main
          : bgSecondary
          ? theme.palette.primary.main
          : `#fff`,
        borderRadius: `30px`,
        padding: p,
        boxShadow: `0 3px 10px rgb(0 0 0 / 0.2)`,
        fontWeight: `600`,
      }}
      {...props}
    >
      {loading ? (
        <span className="flex items-center">
          <FontAwesomeIcon icon={faCircleNotch} spin />
          <span style={{ marginLeft: `0.5rem` }}>{loadingText}</span>
        </span>
      ) : (
        <>{props.children}</>
      )}
    </Button>
  );
};

export default CustomButton;
