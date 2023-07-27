/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Box, Button, Typography, Divider, MenuItem } from '@mui/material';
import CustomButton from '../common/CustomButton';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../common/FormInput';
import axios from 'axios';
import Label from '../common/Label';
import PaymentModal from './PaymentModal';
import PaymentOtpModal from './PaymentOtpModal';
import SelectState from '../common/SelectState';
import AddCardIcon from '@mui/icons-material/AddCard';
import { formatCurrency } from '@/utils';

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
  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  const [isPaymentOtp, setIsPaymentOtp] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>(``);

  const submitCredentials = async (credentials: any) => {
    const newData = {
      name: credentials?.accountName,
      accountNumber: credentials?.accountNumber,
      bank: credentials?.bank,
      bankCode: selectedState?.code,
    };
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
      setIsLoading(false);
      setIsSuccess(true);
      setShowUpdate(!showUpdate);
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
    setShowUpdate(!showUpdate);
  };

  return (
    <Box>
      <PaymentModal
        token={token}
        isOpen={paymentModal}
        isClose={() => setPaymentModal(false)}
        setPaymentModal={setPaymentModal}
        setIsPaymentOtp={setIsPaymentOtp}
        setAmount={setAmount}
      />
      <PaymentOtpModal
        token={token}
        isOpen={isPaymentOtp}
        isClose={() => setIsPaymentOtp(false)}
        amount={amount}
      />
      <Box sx={{ border: `solid 1px #ccc`, p: 2 }}>
        <Typography my={2} fontWeight="bold" color="primary.main">
          Available Balance
        </Typography>
        {/* Balance card */}
        <Box sx={{ border: `solid 1px #ccc`, p: 4 }}>
          <Typography
            my={1}
            fontWeight="bold"
            color="primary.main"
            textAlign="center"
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
            {/* ₦ */}
            {queryData?.balance === 0
              ? `0.00`
              : formatCurrency(queryData?.balance && queryData?.balance)}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ textAlign: `center` }}>
            <Typography my={3}>Withdraw funds to bank or card added</Typography>
            <Button
              onClick={() => setPaymentModal(true)}
              variant="contained"
              sx={{ px: `3rem` }}
              endIcon={<AddCardIcon />}
            >
              Withdraw
            </Button>
          </Box>
        </Box>
        {showUpdate ? (
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
                <Formik
                  initialValues={{
                    accountName: ``,
                    bank: ``,
                    accountNumber: ``,
                  }}
                  onSubmit={(values) => submitCredentials(values)}
                  validationSchema={PaymentSchema}
                >
                  {({ setFieldValue }) => (
                    <Form>
                      <Box>
                        <Label text="Select Bank" />
                        <SelectState
                          selectPlaceholder="Select Bank"
                          name="bank"
                          onChange={(e: { target: { value: string } }) => {
                            const selectedState = banks?.find(
                              (bank) => bank.name === e.target.value,
                            );
                            setSelectedState(selectedState);
                            setFieldValue(`bank`, e.target.value);
                          }}
                        >
                          {banks?.map((bank: any) => {
                            return (
                              <MenuItem key={bank?.name} value={bank?.name}>
                                {bank?.name}
                              </MenuItem>
                            );
                          })}
                        </SelectState>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Label text="Account Number" />
                        <FormInput
                          ariaLabel="accountNumber"
                          name="accountNumber"
                          type="text"
                          placeholder="1748-9938-948"
                        />
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Label text="Account Holder Name" />
                        <FormInput
                          ariaLabel="accountName"
                          name="accountName"
                          type="text"
                          placeholder="Account Full Name"
                        />
                      </Box>
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
                    </Form>
                  )}
                </Formik>
              </Box>
            </Box>
          </>
        ) : (
          <>
            {bankDetails ? (
              <>
                <Typography
                  mb={2}
                  mt={4}
                  variant="h6"
                  fontWeight="bold"
                  color="primary.main"
                >
                  Bank Details
                </Typography>
                <Box
                  sx={{
                    backgroundColor: `primary.main`,
                    p: 3,
                    color: `#fff`,
                    mb: 2,
                  }}
                >
                  <Typography>{bankDetails.name}</Typography>
                  <Typography my={2}>
                    {truncateString(bankDetails?.accountNumber, 6)}
                  </Typography>
                  <Typography>{bankDetails.bank}</Typography>
                </Box>
                <Button onClick={toggleUpdateState} variant="outlined">
                  Update Bank Details
                </Button>
              </>
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
                    <Formik
                      initialValues={{
                        accountName: ``,
                        bank: ``,
                        accountNumber: ``,
                      }}
                      onSubmit={(values) => submitCredentials(values)}
                      validationSchema={PaymentSchema}
                    >
                      {({ setFieldValue }) => (
                        <Form>
                          <Box>
                            <Label text="Select Bank" />
                            <SelectState
                              selectPlaceholder="Select Bank"
                              name="bank"
                              onChange={(e: { target: { value: string } }) => {
                                const selectedState = banks?.find(
                                  (bank) => bank.name === e.target.value,
                                );
                                setSelectedState(selectedState);
                                setFieldValue(`bank`, e.target.value);
                              }}
                            >
                              {banks?.map((bank: any) => {
                                return (
                                  <MenuItem key={bank?.name} value={bank?.name}>
                                    {bank?.name}
                                  </MenuItem>
                                );
                              })}
                            </SelectState>
                          </Box>
                          <Box sx={{ mb: 2 }}>
                            <Label text="Account Number" />
                            <FormInput
                              ariaLabel="accountNumber"
                              name="accountNumber"
                              type="text"
                              placeholder="1748-9938-948"
                            />
                          </Box>
                          <Box sx={{ mb: 2 }}>
                            <Label text="Account Holder Name" />
                            <FormInput
                              ariaLabel="accountName"
                              name="accountName"
                              type="text"
                              placeholder="Account Full Name"
                            />
                          </Box>
                          <CustomButton
                            bgPrimary
                            loading={isLoading}
                            loadingText="Add..."
                            type="submit"
                          >
                            {isSuccess ? `Added` : `Add Bank`}
                          </CustomButton>
                        </Form>
                      )}
                    </Formik>
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

export default AvailableFunds;
