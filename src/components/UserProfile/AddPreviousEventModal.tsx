import { Box, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from 'react-query';
import customFetch from '@/utils/customFetch';
import { toast } from 'react-toastify';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Container } from '@mui/system';
import FormInput from '../common/FormInput';
import Label from '../common/Label';
import CustomButton from '../common/CustomButton';
import TextArea from '../common/TextArea';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import DragAndDropInput from '../common/DragAndDropInput';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import Input from '../common/Input';
import Image from 'next/image';
import { styled } from '@mui/material/styles';

const style = {
  position: `absolute` as const,
  top: `50%`,
  left: `50%`,
  transform: `translate(-50%, -50%)`,
  width: {
    xs: `85%`,
    sm: `45%`,
    md: `40%`,
    lg: `30%`,
    xl: `30%`,
  },
  height: `auto`,
  bgcolor: `#fff`,
  border: `none`,
  boxShadow: 24,
  borderRadius: `8px`,
};

const CompanyProfileSchema = Yup.object().shape({
  title: Yup.string().required(`Name is missing`),
  description: Yup.string().required(`Description is missing`),
  preEventImage: Yup.string().required(`Image is missing`),
});

interface updateTypes {
  title: string;
  description?: string;
  image: File;
}

const AddPreviousEventModal = ({ isOpen, isClose, token, queryData }: any) => {
  const [previewImg, setPreviewImg] = useState<any>(null);
  const [fileName, setFileName] = useState<any>(null);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const queryClient = useQueryClient();

  const { mutate: handleUpdate, isLoading } = useMutation({
    mutationFn: (credentials: any) =>
      customFetch.put(
        `/${
          userInfo?.role === `provider`
            ? `provider-profiles/${userInfo?._id}/add-sample`
            : userInfo?.role === `planner`
            ? `planner-profiles/${userInfo?._id}/add-sample`
            : null
        }`,
        credentials,
        {
          headers: {
            'Content-Type': `multipart/form-data`,
            Authorization: `Bearer ${token}`,
          },
        },
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`userAuthData`] });
      toast.success(`Event Datails Added`);
      isClose(false);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const handleEventSubmit = async (credentials: any) => {
    const formData = new FormData();
    formData.append(`sampleImage`, credentials.preEventImage);
    const data = {
      title: credentials.title,
      sampleImage: credentials.preEventImage,
      description: credentials.description,
    };
    handleUpdate(data);
  };

  return (
    <Container fixed>
      <Modal
        open={isOpen}
        onClose={isClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container maxWidth="sm">
          <Box sx={style}>
            <Box
              sx={{
                py: {
                  xs: 3,
                  lg: 4,
                },
                px: {
                  xs: 3,
                  lg: 4,
                },
              }}
            >
              <Typography mb={4} fontWeight={600} color="primary.main">
                Add Previous Event
              </Typography>
              <Box>
                <Formik
                  initialValues={{
                    title: ``,
                    description: ``,
                    preEventImage: ``,
                  }}
                  onSubmit={(values) => handleEventSubmit(values)}
                  validationSchema={CompanyProfileSchema}
                >
                  {({}) => (
                    <Form>
                      <Box>
                        <Box>
                          <div>
                            <Label text="Enter Name of company" />
                          </div>
                          <FormInput
                            ariaLabel="title"
                            name="title"
                            type="text"
                            placeholder="e.g Jammers Planning"
                          />
                        </Box>
                        <Box>
                          <div>
                            <Label text="Short Description" />
                          </div>
                          <TextArea
                            rows={4}
                            name="description"
                            placeholder="Write...."
                          />
                        </Box>
                        <Box mt={2}>
                          <Label text="Event Cover Image" />
                          <DragAndDropInput type="file" name="preEventImage" />
                        </Box>
                        {/* <Box mb={3}>
                          <Box
                            sx={{
                              display: `flex`,
                              alignItems: `center`,
                              justifyContent: `space-between`,
                            }}
                          >
                            <AddButton htmlFor="preEventImage">
                              <ImageOutlinedIcon className="icon" /> ADD PHOTO
                              <Input
                                type="file"
                                setPreviewImg={setPreviewImg}
                                setFileName={setFileName}
                                name="preEventImage"
                                accept="image/*"
                              />
                            </AddButton>
                            {previewImg === null ? (
                              <Box
                                sx={{
                                  width: `50px`,
                                  height: `50px`,
                                  border: `solid 1px #ccc`,
                                  borderRadius: `50%`,
                                  display: `flex`,
                                  alignItems: `center`,
                                  justifyContent: `center`,
                                }}
                              >
                                <ImageOutlinedIcon />
                              </Box>
                            ) : (
                              <Box>
                                <Image
                                  src={previewImg}
                                  alt="profileImg"
                                  height={50}
                                  width={80}
                                  style={{ borderRadius: `10px` }}
                                />
                              </Box>
                            )}
                          </Box>
                          <small>{`{ jpg, png, jpeg } | The file should be less than 1mb`}</small>
                        </Box> */}
                        <Box
                          mt={2}
                          sx={{
                            display: `flex`,
                            alignItems: `center`,
                            justifyContent: `space-between`,
                          }}
                        >
                          <CustomButton
                            bgPrimary
                            smWidth="auto"
                            mdWidth="auto"
                            type="submit"
                            className="changeBtn"
                          >
                            {isLoading ? (
                              <FontAwesomeIcon icon={faCircleNotch} spin />
                            ) : (
                              `Save`
                            )}
                          </CustomButton>
                          <Typography
                            sx={{
                              cursor: `pointer`,
                              textAlign: `center`,
                            }}
                            onClick={isClose}
                          >
                            Cancel
                          </Typography>
                        </Box>
                      </Box>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Box>
          </Box>
        </Container>
      </Modal>
    </Container>
  );
};

const AddButton = styled(`label`)(({}) => ({
  padding: `0.8rem 2rem`,
  cursor: `pointer`,
  fontSize: `14px`,
  textAlign: `center`,
  verticalAlign: `middle`,
  color: `#333`,
  border: `solid 1px #ccc`,
  width: `50%`,
  borderRadius: `10px`,

  '.icon': {
    fontSize: `1rem`,
    marginRight: `1rem`,
  },

  'input[type="file"]': {
    display: `none`,
  },

  '@media (max-width: 900px)': {
    padding: `0.5rem 1rem`,
    width: `60%`,
  },
}));

export default AddPreviousEventModal;
