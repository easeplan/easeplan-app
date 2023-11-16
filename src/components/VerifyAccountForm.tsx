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
import { MenuItem } from '@mui/material';
import { Box } from '@mui/material';
import { useAuthUser } from '@/context/contextStore';
import CustomButton from './common/CustomButton';
import { useMutation, useQueryClient } from 'react-query';
import SuccessModal from './common/SuccessModal';
import ErrorModal from './common/ErrorModal';
import { toast } from 'react-toastify';
import customFetch from '@/utils/customFetch';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

const ProfileSchema = Yup.object().shape({
  homeAddress: Yup.string().required('Missing field'),
  officeAddress: Yup.string().required('Missing field'),
  phoneNumber: Yup.string().required('Missing field'),
  idType: Yup.string(),
  idDocument: Yup.string(),
  introVideo: Yup.string(),
});

const idTypeData = ['International Passport', 'NIN', 'Drivers License'];

const VerifyAccountForm = ({ token }: any) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { queryData, setQueryData } = useAuthUser();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isErrorMessage, setIsErrorMessage] = useState<any>();
  const [isError, setIsError] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { mutate: updateProfile, isLoading } = useMutation({
    mutationFn: (credentials) =>
      customFetch.put(
        `/${
          userInfo === 'provider'
            ? `provider-profiles/${userInfo}`
            : userInfo === 'planner'
            ? `planner-profiles/${userInfo}`
            : `user-profiles/${userInfo}`
        }/`,
        credentials,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userAuthData'] });
      toast.success('Profile updated');
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const submitCredentials = async (credentials: any) => {
    const formData = new FormData();
    formData.append('idDocument', credentials.idDocument);
    formData.append('introVideo', credentials.introVideo);
    updateProfile(credentials);
  };

  return (
    <Section>
      <SuccessModal
        isOpen={isSuccess}
        isClose={() => setIsSuccess(false)}
        title="Sent Successfully"
        message="Check back later your Information's are under review"
      />
      <ErrorModal
        isOpen={isError}
        isClose={() => setIsError(false)}
        // title="Ooops!"
        message={isErrorMessage}
      >
        <CustomButton
          bgPrimary
          smWidth="auto"
          size="small"
          type="submit"
          onClick={() => setIsError(false)}
        >
          Try Again
        </CustomButton>
      </ErrorModal>
      <h3 className="title">Verification</h3>
      <Formik
        initialValues={{
          homeAddress: queryData?.business?.homeAddress
            ? queryData?.business?.homeAddress
            : '',
          officeAddress: queryData?.business?.officeAddress
            ? queryData?.business?.officeAddress
            : '',
          phoneNumber: queryData?.phoneNumber ? queryData?.phoneNumber : '',
          idType: queryData?.identityVerify?.idType
            ? queryData?.identityVerify?.idType
            : '',
          idDocument: '',
        }}
        onSubmit={(values) => submitCredentials(values)}
        validationSchema={ProfileSchema}
      >
        {() => (
          <Form>
            <Flex>
              <Description>
                <h4 className="subTitle">Address verification</h4>
                <p>
                  We require address verified as part of our fraud prevention
                  measures, this ensure that we are dealing with non fraudulent
                  persons.
                </p>
              </Description>
              <InputController>
                <div>
                  <div>
                    <Label text="Enter Home Address" />
                  </div>
                  <FormInput
                    ariaLabel="homeAddress"
                    name="homeAddress"
                    type="text"
                    placeholder="e.g no 9 okemu street dline port harcourt"
                  />
                </div>
                <div>
                  <div>
                    <Label text="Enter Office Address" />
                  </div>
                  <FormInput
                    ariaLabel="officeAddress"
                    name="officeAddress"
                    type="text"
                    placeholder="e.g no 9 okemu street dline port harcourt"
                  />
                </div>
                <div>
                  <div>
                    <Label text="Enter Phone Number" />
                  </div>
                  <FormInput
                    ariaLabel="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    placeholder="e.g +234"
                  />
                </div>
              </InputController>
            </Flex>
            <Divider />
            <Flex>
              <Description>
                <h4 className="subTitle">Identity Verification</h4>
                <p>
                  This is an important measure to prevent identity theft, fraud,
                  and other types of criminal activity, identity verification
                  can also help to establish trust and build confidence between
                  users and your company.
                </p>
              </Description>
              <InputController>
                <div>
                  <div>
                    <Label text="Select ID Type" />
                  </div>
                  <FormInput
                    isSelect
                    ariaLabel="idType"
                    name="idType"
                    selectPlaceholder="Select ID Type"
                  >
                    {idTypeData?.map((idType) => (
                      <MenuItem key={idType} value={idType}>
                        {idType}
                      </MenuItem>
                    ))}
                  </FormInput>
                </div>
                <div>
                  <div>
                    <Label text="Upload Passport" />
                  </div>
                  <DragAndDropInput type="file" name="idDocument" />
                </div>
              </InputController>
            </Flex>
            <Divider />
            <Flex>
              <Description>
                <h4 className="subTitle">Short Intro Video</h4>
                <p>
                  BVN verification is necessary to ensure the security of
                  banking transactions and to prevent financial fraud and
                  identity theft.
                </p>
              </Description>
              <InputController>
                <div>
                  <div>
                    <Label text="Upload Intro Video" />
                  </div>
                  <DragAndDropInput isVideo type="file" name="introVideo" />
                </div>
              </InputController>
            </Flex>
            <Divider />
            <Box sx={{ textAlign: 'right', marginTop: '1rem' }}>
              <CustomButton
                bgPrimary
                lgWidth="20%"
                loading={isLoading}
                loadingText="Saving..."
                type="submit"
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

export default VerifyAccountForm;
