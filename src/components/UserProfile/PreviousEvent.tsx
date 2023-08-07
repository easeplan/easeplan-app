import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import AddPreviousEventModal from './AddPreviousEventModal';
import EditPreviousEventModal from './EditPreviousEventModal';
import DeleteIcon from '@mui/icons-material/Delete';
import theme from '@/styles/theme';
import { useMutation, useQueryClient } from 'react-query';
import customFetch from '@/utils/customFetch';
import { toast } from 'react-toastify';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

const PreviousEvent = ({ queryData, token }: any) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [openModal, setOpenModal] = useState(false);
  const [openEditEventModal, setOpenEditEventModal] = useState(false);
  const [sampleId, setSampleId] = useState(``);
  const [eventData, setEventData] = useState(``);
  const queryClient = useQueryClient();

  const { mutate: handleDelete } = useMutation({
    mutationFn: (sampleId: string) =>
      customFetch.put(
        `/${
          userInfo?.role === `provider`
            ? `provider-profiles/${userInfo?._id}/delete-sample/${sampleId}`
            : userInfo?.role === `planner`
            ? `planner-profiles/${userInfo?._id}/delete-sample/${sampleId}`
            : null
        }`,
        {
          headers: {
            // Authorization: `Bearer ${token}`,
          },
        },
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`userAuthData`] });
      toast.success(`Deleted`);
      // isClose(false);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const handleEventDelete = async (id: any) => {
    setSampleId(id);
    handleDelete(id);
  };

  const handleEdit = (data: any) => {
    setOpenEditEventModal(true);
    setSampleId(data?._id);
    setEventData(data);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <Box mt={15}>
      <AddPreviousEventModal
        isOpen={openModal}
        isClose={() => setOpenModal(false)}
        token={token}
        queryData={queryData}
      />
      <EditPreviousEventModal
        isOpen={openEditEventModal}
        isClose={() => setOpenEditEventModal(false)}
        token={token}
        eventId={sampleId}
        queryData={eventData}
      />
      <Box
        sx={{
          display: `flex`,
          alignItems: `center`,
          justifyContent: `space-between`,
        }}
      >
        <Typography
          fontWeight={800}
          sx={{
            fontSize: {
              xs: `1.2rem`,
              sm: `1.2rem`,
              md: `1.4rem`,
              lg: `1.5rem`,
            },
            color: `primary.main`,
          }}
        >
          Previous Jobs
        </Typography>
        <Box
          sx={{
            border: `none`,
            backgroundColor: theme.palette.secondary.main,
            boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
            zIndex: `1`,
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
            cursor: `pointer`,
            verticalAlign: `middle`,
            borderRadius: `30px`,
            color: theme.palette.primary.main,
            height: `40px`,
            width: `auto`,
            transition: `all 0.3s ease`,
            px: 5,
            fontWeight: `800`,

            '&:hover': {
              transform: `scale(1.1)`,
              transition: `all 0.3s ease`,
            },

            '.icon': {
              fontSize: `2rem`,
            },
          }}
          onClick={handleOpenModal}
        >
          Add Photos <AddIcon className="icon" sx={{ ml: 2 }} />
        </Box>
      </Box>
      <Box
        sx={{
          display: `grid`,
          gridTemplateColumns: {
            xs: `1fr`,
            sm: `1fr`,
            md: `1fr 1fr 1fr`,
            lg: `1fr 1fr 1fr`,
          },
          gridTemplateAreas: `item2 item1`,
          alignItem: `center`,
          gap: `1rem`,
          mt: `3rem`,
        }}
      >
        {queryData.samples.map((data: any, i: any) => (
          <Box
            key={i}
            sx={{
              borderRadius: `10px`,
              height: `100%`,
              position: `relative`,
            }}
          >
            <Box
              sx={{
                width: `100%`,
                height: {
                  xs: `300px`,
                  sm: `300px`,
                  md: `300px`,
                  lg: `400px`,
                  xl: `400px`,
                },
                boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
                borderRadius: `10px`,
                position: `relative`,

                '.item2': {
                  gridArea: `item2`,
                },
              }}
            >
              <Image
                src={data?.sampleImage}
                alt="eventname"
                fill
                quality={100}
                style={{
                  borderRadius: `10px`,
                  objectFit: `cover`,
                }}
              />
            </Box>
            <Box
              sx={{
                width: `100%`,
                p: {
                  xs: `1rem`,
                  sm: `1rem`,
                  md: `2rem`,
                  lg: `2rem`,
                  xl: `2rem`,
                },
                position: `absolute`,
                bottom: `0`,
                zIndez: `1`,
                background: `rgba(0,0,0,0.5)`,
                color: `#fff`,
                borderRadius: `10px`,
              }}
            >
              <Typography fontWeight="bold">{data?.title}</Typography>
              {/* <Typography mt={2}>{data?.description}</Typography> */}
              <Box
                sx={{ display: `flex`, gap: `1rem`, cursor: `pointer` }}
                mt={2}
              >
                <Button
                  onClick={() => handleEdit(data)}
                  variant="contained"
                  color="secondary"
                  startIcon={<CreateOutlinedIcon />}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleEventDelete(data?._id)}
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PreviousEvent;
