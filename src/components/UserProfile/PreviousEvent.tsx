import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import AddPreviousEventModal from './AddPreviousEventModal';
import EditPreviousEventModal from './EditPreviousEventModal';
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
  const [eventId, setEventId] = useState(``);
  const [eventData, setEventData] = useState(``);
  const queryClient = useQueryClient();

  const { mutate: handleDelete } = useMutation({
    mutationFn: () =>
      customFetch.put(
        `/${
          userInfo?.role === `provider`
            ? `provider-profiles/${userInfo?._id}/delete-sample/${eventId}`
            : userInfo?.role === `planner`
            ? `planner-profiles/${userInfo?._id}/delete-sample/${eventId}`
            : null
        }`,
        {
          headers: {
            'Content-Type': `multipart/form-data`,
            Authorization: `Bearer ${token}`,
          },
        },
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`userAuthData`] });
      toast.success(`Company Details Updated`);
      // isClose(false);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const handleEventDelete = async (eventId: any) => {
    setEventId(eventId);
    handleDelete();
  };

  const handleEdit = (data: any) => {
    setOpenEditEventModal(true);
    setEventId(data?._id);
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
      {/* <EditPreviousEventModal
        isOpen={openEditEventModal}
        isClose={() => setOpenEditEventModal(false)}
        token={token}
        eventId={eventId}
        queryData={eventData}
      /> */}
      <Box
        sx={{
          display: `flex`,
          alignItems: `center`,
          justifyContent: `space-between`,
        }}
      >
        <Typography
          fontWeight={600}
          sx={{
            fontSize: {
              xs: `1.2rem`,
              sm: `1.2rem`,
              md: `1.4rem`,
              lg: `1.5rem`,
            },
          }}
        >
          Activities
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
            borderRadius: `50%`,
            color: theme.palette.primary.main,
            height: `40px`,
            width: `40px`,
            transition: `all 0.3s ease`,

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
          <AddIcon className="icon" />
        </Box>
      </Box>
      {queryData.samples.map((data: any, i: any) => (
        <Box
          key={i}
          sx={{
            display: `grid`,
            gridTemplateColumns: {
              xs: `1fr`,
              sm: `1fr`,
              md: `1fr 1fr`,
              lg: `1fr 2fr`,
            },
            gridTemplateAreas: `item2 item1`,
            alignItem: `center`,
            gap: `1rem`,
            mt: `3rem`,
            boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
            borderRadius: `10px`,
            padding: `1rem`,
            borderLeft: `solid 1rem ${theme.palette.secondary.main}`,
          }}
        >
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

              '.item1': {
                gridArea: `item1`,
              },
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              {data?.title}
            </Typography>
            <Typography mt={2}>{data?.description}</Typography>
            <Box sx={{ display: `flex`, cursor: `pointer` }} mt={3}>
              <Typography
                textAlign="right"
                color="warning.main"
                mr={2}
                onClick={() => handleEdit(data)}
              >
                Edit
              </Typography>
              <Typography
                textAlign="right"
                color="error.main"
                onClick={() => handleEventDelete(data?._id)}
              >
                Delete
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: `100%`,
              height: {
                xs: `300px`,
                sm: `300px`,
                md: `100%`,
                lg: `100%`,
                xl: `100%`,
              },
              borderRadius: `10px`,
              position: `relative`,

              '.item2': {
                gridArea: `item2`,
              },
            }}
          >
            <Image
              src={queryData?.company?.image}
              alt="eventname"
              fill
              quality={100}
              style={{
                borderRadius: `10px`,
                boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
                objectFit: `cover`,
              }}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

const EditButton = styled(`button`)(({ theme }) => ({
  border: `none`,
  backgroundColor: `transparent`,
  zIndex: `1`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  cursor: `pointer`,
  textAlign: `center`,
  verticalAlign: `middle`,
  borderRadius: `50%`,
  color: theme.palette.primary.main,

  '&:hover': {
    color: theme.palette.secondary.main,
  },

  '.icon': {
    fontSize: `2rem`,
    marginLeft: `0.4rem`,
    marginBottom: `0.6rem`,
  },

  '@media (max-width: 900px)': {
    '.icon': {
      fontSize: `1.2rem`,
    },
  },
}));

export default PreviousEvent;
