/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import FormInput from './common/FormInput';
import Label from './common/Label';
import Divider from './common/Divider';
import DragAndDropInput from './common/DragAndDropInput';
import Box from '@mui/material/Box';
import axios from 'axios';
import Link from 'next/link';
import { useAuthUser } from '@/context/contextStore';
import TextArea from './common/TextArea';
import CustomButton from './common/CustomButton';
import theme from '@/styles/theme';
import ErrorModal from './common/ErrorModal';
import MenuItem from '@mui/material/MenuItem';
import SuccessModal from './common/SuccessModal';
import services from '@/lib/services.json';

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required('Name is missing'),
  serviceType: Yup.string().required('Service Type is missing'),
  image: Yup.string(),
  description: Yup.string().required('Description is missing'),
});

const OverviewForm = ({ token }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState<any>();
  const [isError, setIsError] = useState<boolean>(false);
  const [isErrorMessage, setIsErrorMessage] = useState<any>();
  const { queryData } = useAuthUser();

  const submitCredentials = async (credentials: any) => {
    try {
      const formData = new FormData();
      formData.append('image', credentials.image);
      setIsLoading(true);
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/providers/verification/company`,
        {
          name: credentials.name,
          serviceType: credentials.serviceType,
          image: credentials.image,
          description: credentials.description,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setIsSuccessMessage(data.status);
      if (data.status === 'success') {
        setIsLoading(false);
        setIsSuccess(true);
      }
    } catch (error: any) {
      setIsLoading(false);
      const { data } = error.response;
      setIsErrorMessage(data.message);
      setIsSuccessMessage(null);
    }
  };

  return (
    <Section>
      <SuccessModal
        isOpen={isSuccess}
        isClose={() => setIsSuccess(false)}
        title="Saved Successfully"
        // message="Proceed to create a pricing for your service"
      />
      <ErrorModal
        isOpen={isError}
        isClose={() => setIsError(false)}
        // title="Ooops!"
        message="Something went wrong"
      >
        <CustomButton
          bgPrimary
          smWidth="auto"
          size="small"
          onClick={() => setIsError(false)}
        >
          Try Again
        </CustomButton>
      </ErrorModal>
      <h4 className="title">About Company</h4>
      <Formik
        initialValues={{
          name: queryData?.company?.name ? queryData?.company?.name : '',
          serviceType: queryData?.company?.serviceType
            ? queryData?.company?.serviceType
            : '',
          image: '',
          description: queryData?.company?.description
            ? queryData?.company?.description
            : '',
        }}
        onSubmit={(values) => submitCredentials(values)}
        validationSchema={ProfileSchema}
      >
        {() => (
          <Form>
            <Flex>
              <Description>
                <h4 className="subTitle">Name of the Company</h4>
                <p>
                  Provide name of company and if registered add your RC number.
                </p>
              </Description>
              <InputController>
                <div>
                  <div>
                    <Label text="Enter Name of company" />
                  </div>
                  <FormInput
                    ariaLabel="name"
                    name="name"
                    type="text"
                    placeholder="e.g Jammers Planning"
                  />
                </div>
                <div>
                  <div>
                    <Label text="Enter Service Type" />
                  </div>
                  <FormInput
                    isSelect
                    selectPlaceholder="Select Service Type"
                    ariaLabel="serviceType"
                    name="serviceType"
                  >
                    {services?.services.map((service) => (
                      <MenuItem key={service} value={service}>
                        {service}
                      </MenuItem>
                    ))}
                  </FormInput>
                </div>
              </InputController>
            </Flex>
            <Divider />
            <Flex>
              <Description>
                <h4 className="subTitle">Image of Company/Planner</h4>
                <p>
                  Provide your Brand logo, office image or your personal image,
                  this will be displayed boldly on your gig and will be seen by
                  your potential customers.
                </p>
              </Description>
              <InputController>
                <div>
                  <div>
                    <Label text="Upload Image" />
                  </div>
                  <DragAndDropInput type="file" name="image" />
                </div>
              </InputController>
            </Flex>
            <Divider />
            <Flex>
              <Description>
                <h4 className="subTitle">About your company</h4>
                <p>
                  Provide a brief about your company, tell your potential
                  customers why you are the best person for the just, do not
                  forget to list your company achievements.
                </p>
              </Description>
              <InputController>
                <div>
                  <div>
                    <Label text="Lets know more about company" />
                  </div>
                  <TextArea
                    name="description"
                    placeholder="Enter description"
                  />
                </div>
              </InputController>
            </Flex>
            <Divider />
            <Box
              mt={3}
              textAlign="right"
              sx={{
                display: ' flex',
                justifyContent: {
                  xs: 'space-between',
                  sm: 'space-between',
                  lg: 'end',
                },
              }}
            >
              <Link href="/account/profile">
                <CustomButton
                  style={{
                    background: '#fff',
                    border: `solid 1px ${theme.palette.primary.main}`,
                    borderRadius: '0',
                    marginRight: '2rem',
                    height: '2.8rem',
                    padding: '1rem 5rem',
                  }}
                  bgPrimary
                >
                  Back
                </CustomButton>
              </Link>
              <CustomButton
                type="submit"
                lgWidth="20%"
                smWidth="50%"
                bgPrimary
                loading={isLoading}
                loadingText="Saving..."
              >
                {isSuccess ? 'SAVED ✔' : 'SAVE'}
              </CustomButton>
            </Box>
          </Form>
        )}
      </Formik>
    </Section>
  );
};

const Section = styled('div')(({ theme }) => ({
  marginTop: '4rem',
  color: theme.palette.primary.main,

  '.title': {
    marginTop: '0.6rem',
    borderBottom: 'solid 0.5px #ccc',
    paddingBottom: '0.5rem',
    marginBottom: '0.5rem',
  },

  '@media (max-width: 900px)': {
    marginTop: '2rem',
  },
}));

const Flex = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: '6rem',
  marginBottom: '2rem',

  '@media (max-width: 900px)': {
    flexDirection: 'column',
    gap: '2rem',
  },
});

const Description = styled('div')({
  marginTop: '2rem',
  width: '70%',

  '.subTitle': {
    marginBottom: '1rem',
  },

  '@media (max-width: 900px)': {
    marginTop: '1rem',
    width: '100%',
  },
});

const InputController = styled('div')(({ theme }) => ({
  width: '100%',
  marginTop: '2rem',

  '.changeBtn': {
    padding: '1rem',
    background: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
  },

  '.flex': {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    marginBottom: '2rem',

    '.previewAvatar': {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      background: theme.palette.primary.main,
    },
    '.uploadBtn': {
      padding: '1rem 2rem',
      background: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
      marginTop: '0.5rem',
      whiteSpace: 'noWrap',
    },

    '@media (max-width: 900px)': {
      flexDirection: 'column',
      gridTemplateColumns: '1fr',
      gap: '0rem',
      marginBottom: '1rem',

      '.previewAvatar': {
        width: '80px',
        height: '80px',
        marginTop: '1rem',
      },

      '.uploadBtn': {
        padding: '0.8rem 2rem',
        fontSize: '0.8rem',
      },
    },
  },

  '@media (max-width: 900px)': {
    marginTop: '1rem',
    '.changeBtn': {
      padding: '0.7rem 1.5rem',
      border: 'none',
    },
  },
}));

const PasswordControl = styled('div')(({ theme }) => ({
  position: 'relative',
  '.password': {
    position: 'absolute',
    top: '1.2rem',
    right: '1rem',
    fontSize: '1.3rem',
    color: theme.palette.grey[500],
  },
  '@media (max-width: 1020px)': {
    '.password': {
      position: 'absolute',
      top: '1.3rem',
      right: '1rem',
      fontSize: '1rem',
    },
  },
}));

const FormFooter = styled('div')(({ theme }) => ({
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'right',
  gap: '6rem',
  marginBottom: '2rem',

  '.flex': {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    marginTop: '1rem',
    width: '35%',
  },

  '@media (max-width: 900px)': {
    flexDirection: 'column',
    '.flex': {
      width: '100%',
    },
  },
}));

export default OverviewForm;
