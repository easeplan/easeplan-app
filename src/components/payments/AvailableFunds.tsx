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
  { name: `Access Bank Plc`, code: `044` },
  { name: `Fidelity Bank Plc`, code: `070` },
  { name: `First City Monument Bank Limited`, code: `214` },
  { name: `First Bank of Nigeria Limited`, code: `011` },
  { name: `Guaranty Trust Bank Plc`, code: `058` },
  { name: `Union Bank of Nigeria Plc`, code: `032` },
  { name: `United Bank for Africa Plc`, code: `033` },
  { name: `Zenith Bank Plc`, code: `057` },
  { name: `Ecobank Nigeria Limited`, code: `050` },
  { name: `Heritage Banking Company Limited`, code: `030` },
  { name: `Keystone Bank Limited`, code: `082` },
  { name: `Polaris Bank Limited`, code: `076` },
  { name: `Stanbic IBTC Bank Plc`, code: `221` },
  { name: `Sterling Bank Plc`, code: `232` },
  { name: `Wema Bank Plc`, code: `035` },
  { name: `Unity Bank Plc`, code: `215` },
  { name: `Jaiz Bank Plc`, code: `301` },
  { name: `SunTrust Bank Nigeria Limited`, code: `100` },
  { name: `Providus Bank Limited`, code: `101` },
  { name: `Titan Trust Bank Limited`, code: `102` },
  { name: `Globus Bank Limited`, code: `103` },
];

const AvailableFunds = ({ token, bankDetails, queryData }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>();
  const [paymentModal, setPaymentModal] = useState<any>();
  const [bankInfo, setBankInfo] = useState<any>();
  const [selectedState, setSelectedState] = useState<any>();
  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  const [isPaymentOtp, setIsPaymentOtp] = useState<boolean>(false);

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
      />
      <PaymentOtpModal
        token={token}
        isOpen={isPaymentOtp}
        isClose={() => setIsPaymentOtp(false)}
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
                      <Box sx={{ mb: 2 }}>
                        <Label text="Account Holder Name" />
                        <FormInput
                          ariaLabel="accountName"
                          name="accountName"
                          type="text"
                          placeholder="Account Full Name"
                        />
                      </Box>
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
                          <Box sx={{ mb: 2 }}>
                            <Label text="Account Holder Name" />
                            <FormInput
                              ariaLabel="accountName"
                              name="accountName"
                              type="text"
                              placeholder="Account Full Name"
                            />
                          </Box>
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
