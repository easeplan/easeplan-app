/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Divider,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import CustomButton from '../common/CustomButton';
import * as Yup from 'yup';
import axios from 'axios';
import Label from '../common/Label';
import PaymentModal from './PaymentModal';
import PaymentOtpModal from './PaymentOtpModal';
import SelectState from '../common/SelectState';
import AddCardIcon from '@mui/icons-material/AddCard';
import { formatCurrency } from '@/utils';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
// import { AvailableFundsProps } from '@/lib/types';
import { IoWallet } from 'react-icons/io5';
import TransactionTable from '../TransactionTable';

const PaymentSchema = Yup.object().shape({
  accountName: Yup.string().required(`Amount is required`),
  accountNumber: Yup.string().required(`Amount is required`),
  bank: Yup.string().required(`Amount is required`),
});

const banks = [
  {
    name: `9mobile 9Payment Service Bank`,
    slug: `9mobile-9payment-service-bank-ng`,
    code: `120001`,
    active: true,
  },
  {
    name: `Abbey Mortgage Bank`,
    slug: `abbey-mortgage-bank`,
    code: `801`,
    active: true,
  },
  {
    name: `Above Only MFB`,
    slug: `above-only-mfb`,
    code: `51204`,
    active: true,
  },
  {
    name: `Abulesoro MFB`,
    slug: `abulesoro-mfb-ng`,
    code: `51312`,
    active: true,
  },
  {
    name: `Access Bank`,
    slug: `access-bank`,
    code: `044`,
    active: true,
  },
  {
    name: `Accion Microfinance Bank`,
    slug: `accion-microfinance-bank-ng`,
    code: `602`,
    active: true,
  },
  {
    name: `Ahmadu Bello University Microfinance Bank`,
    slug: `ahmadu-bello-university-microfinance-bank-ng`,
    code: `50036`,
    active: true,
  },
  {
    name: `Airtel Smartcash PSB`,
    slug: `airtel-smartcash-psb-ng`,
    code: `120004`,
    active: true,
  },
  {
    name: `AKU Microfinance Bank`,
    slug: `aku-mfb`,
    code: `51336`,
    active: true,
  },
  {
    name: `ALAT by WEMA`,
    slug: `alat-by-wema`,
    code: `035A`,
    active: true,
  },
  {
    name: `Amegy Microfinance Bank`,
    slug: `amegy-microfinance-bank-ng`,
    code: `090629`,
    active: true,
  },
  {
    name: `Amju Unique MFB`,
    slug: `amju-unique-mfb`,
    code: `50926`,
    active: true,
  },
  {
    name: `AMPERSAND MICROFINANCE BANK`,
    slug: `ampersand-microfinance-bank-ng`,
    code: `51341`,
    active: true,
  },
  {
    name: `Aramoko MFB`,
    slug: `aramoko-mfb`,
    code: `50083`,
    active: true,
  },
  {
    name: `ASO Savings and Loans`,
    slug: `asosavings`,
    code: `401`,
    active: true,
  },
  {
    name: `Astrapolaris MFB LTD`,
    slug: `astrapolaris-mfb`,
    code: `MFB50094`,
    active: true,
  },
  {
    name: `Bainescredit MFB`,
    slug: `bainescredit-mfb`,
    code: `51229`,
    active: true,
  },
  {
    name: `Banc Corp Microfinance Bank`,
    slug: `banc-corp-microfinance-bank-ng`,
    code: `50117`,
    active: true,
  },
  {
    name: `Bowen Microfinance Bank`,
    slug: `bowen-microfinance-bank`,
    code: `50931`,
    active: true,
  },
  {
    name: `Branch International Financial Services Limited`,
    slug: `branch`,
    code: `FC40163`,
    active: true,
  },
  {
    name: `CASHCONNECT MFB`,
    slug: `cashconnect-mfb-ng`,
    code: `865`,
    active: true,
  },
  {
    name: `CEMCS Microfinance Bank`,
    slug: `cemcs-microfinance-bank`,
    code: `50823`,
    active: true,
  },
  {
    name: `Chanelle Microfinance Bank Limited`,
    slug: `chanelle-microfinance-bank-limited-ng`,
    code: `50171`,
    active: true,
  },
  {
    name: `Chikum Microfinance bank`,
    slug: `chikum-microfinance-bank-ng`,
    code: `312`,
    active: true,
  },
  {
    name: `Citibank Nigeria`,
    slug: `citibank-nigeria`,
    code: `023`,
    active: true,
  },
  {
    name: `Consumer Microfinance Bank`,
    slug: `consumer-microfinance-bank-ng`,
    code: `50910`,
    active: true,
  },
  {
    name: `Corestep MFB`,
    slug: `corestep-mfb`,
    code: `50204`,
    active: true,
  },
  {
    name: `Coronation Merchant Bank`,
    slug: `coronation-merchant-bank-ng`,
    code: `559`,
    active: true,
  },
  {
    name: `County Finance Limited`,
    slug: `county-finance-limited`,
    code: `FC40128`,
    active: true,
  },
  {
    name: `Crescent MFB`,
    slug: `crescent-mfb`,
    code: `51297`,
    active: true,
  },
  {
    name: `Dot Microfinance Bank`,
    slug: `dot-microfinance-bank-ng`,
    code: `50162`,
    active: true,
  },
  {
    name: `Ecobank Nigeria`,
    slug: `ecobank-nigeria`,
    code: `050`,
    active: true,
  },
  {
    name: `Ekimogun MFB`,
    slug: `ekimogun-mfb-ng`,
    code: `50263`,
    active: true,
  },
  {
    name: `Ekondo Microfinance Bank`,
    slug: `ekondo-microfinance-bank-ng`,
    code: `098`,
    active: true,
  },
  {
    name: `Fairmoney Microfinance Bank`,
    slug: `fairmoney-microfinance-bank-ng`,
    code: `51318`,
    active: true,
  },
  {
    name: `Fidelity Bank`,
    slug: `fidelity-bank`,
    code: `070`,
    active: true,
  },
  {
    name: `Firmus MFB`,
    slug: `firmus-mfb`,
    code: `51314`,
    active: true,
  },
  {
    name: `First City Monument Bank`,
    slug: `first-city-monument-bank`,
    code: `214`,
    active: true,
  },
  {
    name: `FirstTrust Mortgage Bank Nigeria`,
    slug: `firsttrust-mortgage-bank-nigeria-ng`,
    code: `413`,
    active: true,
  },
  {
    name: `FLOURISH MFB`,
    slug: `flourish-mfb-ng`,
    code: `50315`,
    active: true,
  },
  {
    name: `FSDH Merchant Bank Limited`,
    slug: `fsdh-merchant-bank-limited`,
    code: `501`,
    active: true,
  },
  {
    name: `Gateway Mortgage Bank LTD`,
    slug: `gateway-mortgage-bank`,
    code: `812`,
    active: true,
  },
  {
    name: `Globus Bank`,
    slug: `globus-bank`,
    code: `00103`,
    active: true,
  },
  {
    name: `GoMoney`,
    slug: `gomoney`,
    code: `100022`,
    active: true,
  },
  {
    name: `Goodnews Microfinance Bank`,
    slug: `goodnews-microfinance-bank-ng`,
    code: `50739`,
    active: true,
  },
  {
    name: `Greenwich Merchant Bank`,
    slug: `greenwich-merchant-bank-ng`,
    code: `562`,
    active: true,
  },
  {
    name: `Guaranty Trust Bank`,
    slug: `guaranty-trust-bank`,
    code: `058`,
    active: true,
  },
  {
    name: `Hackman Microfinance Bank`,
    slug: `hackman-microfinance-bank`,
    code: `51251`,
    active: true,
  },
  {
    name: `Hasal Microfinance Bank`,
    slug: `hasal-microfinance-bank`,
    code: `50383`,
    active: true,
  },
  {
    name: `Heritage Bank`,
    slug: `heritage-bank`,
    code: `030`,
    active: true,
  },
  {
    name: `HopePSB`,
    slug: `hopepsb-ng`,
    code: `120002`,
    active: true,
  },
  {
    name: `Ibile Microfinance Bank`,
    slug: `ibile-mfb`,
    code: `51244`,
    active: true,
  },
  {
    name: `Ikoyi Osun MFB`,
    slug: `ikoyi-osun-mfb`,
    code: `50439`,
    active: true,
  },
  {
    name: `Ilaro Poly Microfinance Bank`,
    slug: `ilaro-poly-microfinance-bank-ng`,
    code: `50442`,
    active: true,
  },
  {
    name: `Imowo MFB`,
    slug: `imowo-mfb-ng`,
    code: `50453`,
    active: true,
  },
  {
    name: `Infinity MFB`,
    slug: `infinity-mfb`,
    code: `50457`,
    active: true,
  },
  {
    name: `Jaiz Bank`,
    slug: `jaiz-bank`,
    code: `301`,
    active: true,
  },
  {
    name: `Kadpoly MFB`,
    slug: `kadpoly-mfb`,
    code: `50502`,
    active: true,
  },
  {
    name: `Keystone Bank`,
    slug: `keystone-bank`,
    code: `082`,
    active: true,
  },
  {
    name: `Kredi Money MFB LTD`,
    slug: `kredi-money-mfb`,
    code: `50200`,
    active: true,
  },
  {
    name: `Lagos Building Investment Company Plc.`,
    slug: `lbic-plc`,
    code: `90052`,
    active: true,
  },
  {
    name: `Links MFB`,
    slug: `links-mfb`,
    code: `50549`,
    active: true,
  },
  {
    name: `Living Trust Mortgage Bank`,
    slug: `living-trust-mortgage-bank`,
    code: `031`,
    active: true,
  },
  {
    name: `Lotus Bank`,
    slug: `lotus-bank`,
    code: `303`,
    active: true,
  },
  {
    name: `Mayfair MFB`,
    slug: `mayfair-mfb`,
    code: `50563`,
    active: true,
  },
  {
    name: `Mint MFB`,
    slug: `mint-mfb`,
    code: `50304`,
    active: true,
  },
  {
    name: `Moniepoint MFB`,
    slug: `moniepoint-mfb-ng`,
    code: `50515`,
    active: true,
  },
  {
    name: `MTN Momo PSB`,
    slug: `mtn-momo-psb-ng`,
    code: `120003`,
    active: true,
  },
  {
    name: `Optimus Bank Limited`,
    slug: `optimus-bank-ltd`,
    code: `107`,
    active: true,
  },
  {
    name: `Paga`,
    slug: `paga`,
    code: `100002`,
    active: true,
  },
  {
    name: `Parallex Bank`,
    slug: `parallex-bank`,
    code: `104`,
    active: true,
  },
  {
    name: `Parkway - ReadyCash`,
    slug: `parkway-ready-cash`,
    code: `311`,
    active: true,
  },
  {
    name: `Paycom`,
    slug: `paycom`,
    code: `999992`,
    active: true,
  },
  {
    name: `Peace Microfinance Bank`,
    slug: `peace-microfinance-bank-ng`,
    code: `50743`,
    active: true,
  },
  {
    name: `Personal Trust MFB`,
    slug: `personal-trust-mfb-ng`,
    code: `51146`,
    active: true,
  },
  {
    name: `Petra Mircofinance Bank Plc`,
    slug: `petra-microfinance-bank-plc`,
    code: `50746`,
    active: true,
  },
  {
    name: `Platinum Mortgage Bank`,
    slug: `platinum-mortgage-bank-ng`,
    code: `268`,
    active: true,
  },
  {
    name: `Polaris Bank`,
    slug: `polaris-bank`,
    code: `076`,
    active: true,
  },
  {
    name: `Polyunwana MFB`,
    slug: `polyunwana-mfb-ng`,
    code: `50864`,
    active: true,
  },
  {
    name: `PremiumTrust Bank`,
    slug: `premiumtrust-bank-ng`,
    code: `105`,
    active: true,
  },
  {
    name: `Providus Bank`,
    slug: `providus-bank`,
    code: `101`,
    active: true,
  },
  {
    name: `QuickFund MFB`,
    slug: `quickfund-mfb`,
    code: `51293`,
    active: true,
  },
  {
    name: `Rand Merchant Bank`,
    slug: `rand-merchant-bank`,
    code: `502`,
    active: true,
  },
  {
    name: `Refuge Mortgage Bank`,
    slug: `refuge-mortgage-bank`,
    code: `90067`,
    active: true,
  },
  {
    name: `Rigo Microfinance Bank Limited`,
    slug: `rigo-microfinance-bank-limited-ng`,
    code: `51286`,
    active: true,
  },
  {
    name: `ROCKSHIELD MICROFINANCE BANK`,
    slug: `rockshield-microfinance-bank-ng`,
    code: `50767`,
    active: true,
  },
  {
    name: `Rubies MFB`,
    slug: `rubies-mfb`,
    code: `125`,
    active: true,
  },
  {
    name: `Safe Haven MFB`,
    slug: `safe-haven-mfb-ng`,
    code: `51113`,
    active: true,
  },
  {
    name: `Safe Haven Microfinance Bank Limited`,
    slug: `safe-haven-microfinance-bank-limited-ng`,
    code: `951113`,
    active: true,
  },
  {
    name: `SAGE GREY FINANCE LIMITED`,
    slug: `sage-grey-finance-limited-ng`,
    code: `40165`,
    active: true,
  },
  {
    name: `Shield MFB`,
    slug: `shield-mfb-ng`,
    code: `50582`,
    active: true,
  },
  {
    name: `Solid Allianze MFB`,
    slug: `solid-allianze-mfb`,
    code: `51062`,
    active: true,
  },
  {
    name: `Solid Rock MFB`,
    slug: `solid-rock-mfb`,
    code: `50800`,
    active: true,
  },
  {
    name: `Sparkle Microfinance Bank`,
    slug: `sparkle-microfinance-bank`,
    code: `51310`,
    active: true,
  },
  {
    name: `Stanbic IBTC Bank`,
    slug: `stanbic-ibtc-bank`,
    code: `221`,
    active: true,
  },
  {
    name: `Standard Chartered Bank`,
    slug: `standard-chartered-bank`,
    code: `068`,
    active: true,
  },
  {
    name: `Stellas MFB`,
    slug: `stellas-mfb`,
    code: `51253`,
    active: true,
  },
  {
    name: `Sterling Bank`,
    slug: `sterling-bank`,
    code: `232`,
    active: true,
  },
  {
    name: `Suntrust Bank`,
    slug: `suntrust-bank`,
    code: `100`,
    active: true,
  },
  {
    name: `Supreme MFB`,
    slug: `supreme-mfb-ng`,
    code: `50968`,
    active: true,
  },
  {
    name: `TAJ Bank`,
    slug: `taj-bank`,
    code: `302`,
    active: true,
  },
  {
    name: `Tanadi Microfinance Bank`,
    slug: `tanadi-microfinance-bank-ng`,
    code: `090560`,
    active: true,
  },
  {
    name: `Tangerine Money`,
    slug: `tangerine-money`,
    code: `51269`,
    active: true,
  },
  {
    name: `TCF MFB`,
    slug: `tcf-mfb`,
    code: `51211`,
    active: true,
  },
  {
    name: `Titan Bank`,
    slug: `titan-bank`,
    code: `102`,
    active: true,
  },
  {
    name: `Titan Paystack`,
    slug: `titan-paystack`,
    code: `100039`,
    active: true,
  },
  {
    name: `U&C Microfinance Bank Ltd (U AND C MFB)`,
    slug: `uc-microfinance-bank-ltd-u-and-c-mfb-ng`,
    code: `50840`,
    active: true,
  },
  {
    name: `Uhuru MFB`,
    slug: `uhuru-mfb-ng`,
    code: `MFB51322`,
    active: true,
  },
  {
    name: `Unaab Microfinance Bank Limited`,
    slug: `unaab-microfinance-bank-limited-ng`,
    code: `50870`,
    active: true,
  },
  {
    name: `Unical MFB`,
    slug: `unical-mfb`,
    code: `50871`,
    active: true,
  },
  {
    name: `Unilag Microfinance Bank`,
    slug: `unilag-microfinance-bank-ng`,
    code: `51316`,
    active: true,
  },
  {
    name: `Union Bank of Nigeria`,
    slug: `union-bank-of-nigeria`,
    code: `032`,
    active: true,
  },
  {
    name: `United Bank For Africa`,
    slug: `united-bank-for-africa`,
    code: `033`,
    active: true,
  },
  {
    name: `Unity Bank`,
    slug: `unity-bank`,
    code: `215`,
    active: true,
  },
  {
    name: `VFD Microfinance Bank Limited`,
    slug: `vfd`,
    code: `566`,
    active: true,
  },
  {
    name: `Waya Microfinance Bank`,
    slug: `waya-microfinance-bank-ng`,
    code: `51355`,
    active: true,
  },
  {
    name: `Wema Bank`,
    slug: `wema-bank`,
    code: `035`,
    active: true,
  },
  {
    name: `Zenith Bank`,
    slug: `zenith-bank`,
    code: `057`,
    active: true,
  },
];

const AvailableFunds = ({ token, bankDetails, queryData }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>();
  const [paymentModal, setPaymentModal] = useState<any>();
  const [bankInfo, setBankInfo] = useState<any>();
  const [selectedState, setSelectedState] = useState<any>();
  const [showUpdate, setShowUpdate] = useState<boolean>(true);
  const [isFetchBank, setIsFetchBank] = useState<boolean>(false);
  const [isPaymentOtp, setIsPaymentOtp] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>(``);
  const [accountName, setAccountName] = useState<string>(``);
  const [accountNumber, setAccountNumber] = useState<any>(``);
  const [success, setSuccess] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<any>(``);
  const [editBank, setEditBank] = useState<boolean>(false);

  const handleValidationAcc = async (e: any) => {
    const target = e.target as typeof e.target & {
      accountNumber: { value: string };
    };
    setAccountNumber(target?.value);
    if (e.target.value.length >= 10) {
      try {
        setIsFetchBank(true);
        setSuccess(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_DOJAH_URL}?bank_code=${selectedState?.code}&account_number=${target?.value}`,
          {
            headers: {
              Accept: `application/json`,
              Authorization: `${process.env.NEXT_PUBLIC_DOJAH_AUTH}`,
              AppId: `${process.env.NEXT_PUBLIC_APPID}`,
            },
          },
        );
        if (res.status === 200) {
          const data = await res.json();
          setAccountName(data.entity.account_name);
          setIsFetchBank(false);
          setSuccess(true);
          setErrMsg(``);
        } else {
          setErrMsg(`Incorrect Account Number`);
          setAccountName(``);
          setIsFetchBank(false);
          setSuccess(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const submitCredentials = async (e: any) => {
    e.preventDefault();
    const newData = {
      name: accountName,
      accountNumber: accountNumber,
      bank: selectedState?.name,
      bankCode: selectedState?.code,
    };
    if (typeof window !== `undefined`) {
      localStorage.setItem(`bankData`, JSON.stringify(newData));
    }
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/account-details`,
        newData,
        {
          headers: {
            'Content-Type': `application/json`,
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // console.log(data);
      setIsLoading(false);
      setIsSuccess(true);
      setShowUpdate(true);
      setBankInfo(data);
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
      setIsSuccess(false);
    }
  };

  function truncateString(str: string, num: any) {
    const newStr = str.toString();
    if (newStr.length > num) {
      return newStr.slice(0, num) + `****`;
    } else {
      return newStr;
    }
  }

  const toggleUpdateState = () => {
    // setShowUpdate(!showUpdate);
    setEditBank(!editBank);
    setBankInfo(null);
  };

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

  const handleSelect = (e: { target: { value: string } }) => {
    const selectedState = banks?.find((bank) => bank.name === e.target.value);
    setSelectedState(selectedState);
  };

  return (
    <Box
      sx={{
        width: {
          xs: `100%`,
          sm: `100%`,
          md: `100%`,
          lg: `100%`,
          xl: `100%`,
        },
        margin: `0rem auto`,
      }}
    >
      <PaymentModal
        token={token}
        isOpen={paymentModal}
        isClose={() => setPaymentModal(false)}
        setPaymentModal={setPaymentModal}
        setIsPaymentOtp={setIsPaymentOtp}
        setAmount={setAmount}
        accountName={accountName}
        bank={selectedState?.name}
        bankCode={selectedState?.code}
        accountNumber={accountNumber}
      />
      <PaymentOtpModal
        token={token}
        isOpen={isPaymentOtp}
        isClose={() => setIsPaymentOtp(false)}
        amount={amount}
      />
      <Box>
        {/* Balance card */}
        <Box sx={{}}>
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
              gap: {
                xs: `3rem`,
                sm: `3rem`,
                md: `3rem`,
                lg: `6rem`,
                xl: `6rem`,
              },
            }}
          >
            <Box
              className="linearGradient"
              sx={{
                boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
                px: 6,
                pb: 2,
                pt: 2,
                borderRadius: `2rem`,
                position: `relative`,
              }}
            >
              <Box
                sx={{
                  display: `flex`,
                  alignItems: `center`,
                  justifyContent: `space-between`,

                  '.walletIcon': {
                    fontSize: `2rem`,
                    color: `white`,
                  },
                }}
              >
                <Typography
                  mt={2}
                  fontSize="0.9rem"
                  fontWeight="bold"
                  color="white"
                  // sx={{ position: `absolute`, top: `0.5rem` }}
                >
                  Available Balance
                </Typography>
                <IoWallet className="walletIcon" />
              </Box>
              <Typography
                mt={4}
                fontWeight="bold"
                color="white"
                sx={{
                  fontSize: {
                    xs: `1.5rem`,
                    sm: `1.5rem`,
                    md: `1.5rem`,
                    lg: `2rem`,
                    xl: `2rem`,
                  },
                }}
              >
                <small>₦</small>
                {queryData?.balance === 0
                  ? `0.00`
                  : formatCurrency(queryData?.balance && queryData?.balance)}
              </Typography>
              <Box sx={{ textAlign: `right` }}>
                <Button
                  onClick={() => setPaymentModal(true)}
                  sx={{
                    color: `primary.main`,
                    textTransform: `capitalize`,
                    backgroundColor: `white`,
                    ':hover': {
                      backgroundColor: `#fafafa`,
                    },
                    borderRadius: `30px`,
                    px: 4,
                  }}
                  variant="contained"
                >
                  Withdraw
                </Button>
              </Box>
            </Box>
            <Box
              className="linearGradient"
              sx={{
                boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
                px: 6,
                pb: 2,
                pt: 2,
                borderRadius: `2rem`,
                position: `relative`,
              }}
            >
              <Box
                sx={{
                  display: `flex`,
                  alignItems: `center`,
                  justifyContent: `space-between`,

                  '.walletIcon': {
                    fontSize: `2rem`,
                    color: `white`,
                  },
                }}
              >
                <Typography
                  mt={2}
                  fontSize="0.9rem"
                  fontWeight="bold"
                  color="white"
                  // sx={{ position: `absolute`, top: `0.5rem` }}
                >
                  Total Balance
                </Typography>
                <IoWallet className="walletIcon" />
              </Box>
              <Typography
                mt={4}
                fontWeight="bold"
                color="white"
                sx={{
                  fontSize: {
                    xs: `1.5rem`,
                    sm: `1.5rem`,
                    md: `1.5rem`,
                    lg: `2rem`,
                    xl: `2rem`,
                  },
                }}
              >
                <small>₦</small>
                {queryData?.balance === 0
                  ? `0.00`
                  : formatCurrency(queryData?.balance && queryData?.balance)}
              </Typography>
              <Typography
                sx={{
                  md: 1,
                  color: `white`,
                  fontSize: {
                    xs: `0.5rem`,
                    sm: `0.5rem`,
                    md: `0.5rem`,
                    lg: `0.8rem`,
                    xl: `0.8rem`,
                  },
                }}
              >
                10% Charge will be deducted
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* This update bank details need more attention on the logic */}
        {/* ADD BANK SECTION*/}
        {!bankDetails && !bankInfo ? (
          <>
            <Typography
              mb={2}
              mt={4}
              variant="h6"
              fontWeight="bold"
              color="primary.main"
            >
              Add Bank Details
            </Typography>
            {/* ADD BANK FORM */}
            <Box sx={{ border: `solid 1px #ccc`, p: 4 }}>
              <Typography mb={3}>
                Add bank details to recieve payment
              </Typography>
              <Box>
                <form onSubmit={submitCredentials}>
                  <Box>
                    <Label text="Select Bank" />
                    <FormControl fullWidth size="small" sx={{ mb: `1rem` }}>
                      <InputLabel id="demo-simple-select-label">
                        Select Bank
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="bank"
                        onChange={handleSelect}
                        sx={{ py: `0.3rem`, borderRadius: `10px` }}
                        // displayEmpty
                        inputProps={{ 'aria-label': `Without label` }}
                        MenuProps={MenuProps}
                      >
                        {banks?.map((bank: any) => {
                          return (
                            <MenuItem key={bank?.name} value={bank?.name}>
                              {bank?.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Label text="Account Number" />
                    <Input
                      name="accountNumber"
                      maxLength={10}
                      required
                      value={accountNumber}
                      type="text"
                      onChange={handleValidationAcc}
                      placeholder="1748-9938-948"
                    />
                  </Box>
                  {success && (
                    <Box
                      sx={{
                        mb: 2,
                        backgroundColor: `secondary.light`,
                        p: 2,
                        borderRadius: `6px`,
                      }}
                    >
                      {isFetchBank ? (
                        <Box
                          sx={{
                            display: `flex`,
                            justifyContent: `center`,
                            alignItems: `center`,
                          }}
                        >
                          <CircularProgress
                            sx={{ color: `primary.main` }}
                            size="1rem"
                          />
                        </Box>
                      ) : (
                        <Typography color="primary.main" fontSize="0.9rem">
                          {accountName}
                        </Typography>
                      )}
                    </Box>
                  )}

                  {errMsg && (
                    <Box
                      sx={{
                        mb: 2,
                        border: `1px solid red`,
                        px: 2,
                        py: 1,
                        borderRadius: `6px`,
                      }}
                    >
                      <Typography color="error.main" fontSize="0.9rem">
                        {errMsg}
                      </Typography>
                    </Box>
                  )}
                  <Box
                    sx={{
                      display: `flex`,
                      justifyContent: `space-between`,
                      flexDirection: {
                        xs: `column`,
                        sm: `column`,
                        md: `column`,
                        lg: `row`,
                      },
                      gap: `1rem`,
                    }}
                  >
                    <CustomButton
                      bgPrimary
                      loading={isLoading}
                      loadingText="Add..."
                      type="submit"
                    >
                      {isSuccess ? `Added` : `Add Bank`}
                    </CustomButton>
                    <Button onClick={toggleUpdateState} variant="outlined">
                      Cancel
                    </Button>
                  </Box>
                </form>
              </Box>
            </Box>
          </>
        ) : (
          <>
            {!editBank ? (
              <Box mt={10}>
                <Box
                  sx={{
                    display: `grid`,
                    gridTemplateColumns: `2fr 1fr`,
                    gap: `6rem`,
                  }}
                >
                  <Box>
                    <Typography
                      mb={2}
                      mt={4}
                      variant="h6"
                      fontWeight="bold"
                      color="primary.main"
                    >
                      Recent Transactions
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Box>
                      <TransactionTable />
                    </Box>
                  </Box>
                  <Box>
                    <Typography
                      mb={2}
                      mt={4}
                      variant="h6"
                      fontWeight="bold"
                      color="primary.main"
                    >
                      Bank Details
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Box
                      className="linearGradient"
                      sx={{
                        p: 3,
                        color: `#fff`,
                        mb: 2,
                        borderRadius: `2rem`,
                      }}
                    >
                      <Typography>{bankDetails.name}</Typography>
                      <Typography my={2}>
                        {truncateString(bankDetails?.accountNumber, 6)}
                      </Typography>
                      <Typography>{bankDetails.bank}</Typography>
                    </Box>
                    <Button
                      onClick={toggleUpdateState}
                      variant="outlined"
                      sx={{ textTransform: `capitalize`, borderRadius: `30px` }}
                    >
                      Change
                    </Button>
                  </Box>
                </Box>
              </Box>
            ) : (
              <>
                <Typography
                  mb={2}
                  mt={4}
                  variant="h6"
                  fontWeight="bold"
                  color="primary.main"
                >
                  Add Bank Details
                </Typography>
                <Box sx={{ border: `solid 1px #ccc`, p: 4 }}>
                  <Typography mb={3}>
                    Add bank details to recieve payment
                  </Typography>
                  <Box>
                    <form onSubmit={submitCredentials}>
                      <Box>
                        <Label text="Select Bank" />
                        <FormControl fullWidth size="small" sx={{ mb: `1rem` }}>
                          <InputLabel id="demo-simple-select-label">
                            Select Bank
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="bank"
                            onChange={handleSelect}
                            sx={{ py: `0.3rem`, borderRadius: `10px` }}
                            // displayEmpty
                            inputProps={{ 'aria-label': `Without label` }}
                            MenuProps={MenuProps}
                          >
                            {banks?.map((bank: any) => {
                              return (
                                <MenuItem key={bank?.name} value={bank?.name}>
                                  {bank?.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Label text="Account Number" />
                        <Input
                          name="accountNumber"
                          maxLength={10}
                          required
                          value={accountNumber}
                          type="text"
                          onChange={handleValidationAcc}
                          placeholder="1748-9938-948"
                        />
                      </Box>
                      {success && (
                        <Box
                          sx={{
                            mb: 2,
                            backgroundColor: `secondary.light`,
                            p: 2,
                            borderRadius: `6px`,
                          }}
                        >
                          {isFetchBank ? (
                            <Box
                              sx={{
                                display: `flex`,
                                justifyContent: `center`,
                                alignItems: `center`,
                              }}
                            >
                              <CircularProgress
                                sx={{ color: `primary.main` }}
                                size="1rem"
                              />
                            </Box>
                          ) : (
                            <Typography color="primary.main" fontSize="0.9rem">
                              {accountName}
                            </Typography>
                          )}
                        </Box>
                      )}

                      {errMsg && (
                        <Box
                          sx={{
                            mb: 2,
                            border: `1px solid red`,
                            px: 2,
                            py: 1,
                            borderRadius: `6px`,
                          }}
                        >
                          <Typography color="error.main" fontSize="0.9rem">
                            {errMsg}
                          </Typography>
                        </Box>
                      )}
                      <Box
                        sx={{
                          display: `flex`,
                          justifyContent: `space-between`,
                          flexDirection: {
                            xs: `column`,
                            sm: `column`,
                            md: `column`,
                            lg: `row`,
                          },
                          gap: `1rem`,
                        }}
                      >
                        <CustomButton
                          bgPrimary
                          loading={isLoading}
                          loadingText="Add..."
                          type="submit"
                        >
                          {isSuccess ? `Added` : `Add Bank`}
                        </CustomButton>
                        <Button onClick={toggleUpdateState} variant="outlined">
                          Cancel
                        </Button>
                      </Box>
                    </form>
                  </Box>
                </Box>
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

const Input = styled(`input`)({
  padding: `1rem 1rem`,
  outline: `none`,
  width: `100%`,
  borderRadius: `10px`,
  fontSize: `1rem`,
  border: `solid 1px #ccc;`,
  marginTop: `0.5rem`,
  background: `transparent`,

  '@media (max-width: 1020px)': {
    fontSize: `1rem`,
    padding: `1rem 1rem`,
  },

  '&:-webkit-autofill': {
    BackgroundColor: `transparent`,
  },
});

export default AvailableFunds;
