import { Box, Typography, Divider, Alert } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Container } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import PricingSection from '@/components/publicPageSections/PricingSection';
import PreviousEvent from '@/components/publicPageSections/PreviousEvent';
import ClientReviews from '@/components/publicPageSections/ClientReviews';
import Hero from '@/components/publicPageSections/Hero';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import Spinner from './common/Spinner';

const style = {
  position: `absolute` as const,
  top: `55%`,
  // bottom: `-40%`,
  left: `50%`,
  transform: `translate(-50%, -50%)`,
  width: {
    xs: `100%`,
    sm: `100%`,
    md: `95%`,
    lg: `95%`,
    xl: `95%`,
  },
  height: `100vh`,
  bgcolor: `#fff`,
  border: `none`,
  boxShadow: 24,
  borderTopRightRadius: `1rem`,
  borderTopLeftRadius: `1rem`,
};

const SearchResultModal = ({
  openResult,
  closeResult,
  queryData,
  token,
}: any) => {
  const { loadingResult, errorMsg } = useSelector(
    (state: RootState) => state.searchModal,
  );

  // console.log(queryData);

  return (
    <Container fixed>
      <Modal
        open={openResult}
        onClose={closeResult}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container maxWidth="sm">
          <Box sx={style}>
            <>
              <Box
                sx={{
                  py: 2,
                  px: 4,
                  backgroundColor: `primary.main`,
                  borderTopRightRadius: `1rem`,
                  borderTopLeftRadius: `1rem`,
                  display: `flex`,
                  alignItems: `center`,
                  justifyContent: `space-between`,
                }}
              >
                <Typography
                  color="secondary.main"
                  variant="h5"
                  fontWeight={600}
                >
                  Plan Your Event
                </Typography>
                <Typography
                  sx={{
                    cursor: `pointer`,
                    textAlign: `center`,
                    color: `secondary.light`,
                  }}
                >
                  <CloseIcon onClick={closeResult} />
                </Typography>
              </Box>
              {loadingResult ? (
                <Box
                  sx={{
                    display: `flex`,
                    alignItems: `center`,
                    justifyContent: `center`,
                    height: `100vh`,
                    backgroundColor: `primary.main`,
                    opacity: `0.6`,
                    position: `relative`,
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        textAlign: `center`,
                      }}
                    >
                      <Spinner />
                    </Box>
                    <Typography fontWeight={600} color="secondary.light">
                      Searching...
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <>
                  <Box
                    sx={{
                      overflowY: `auto`,
                      height: `100%`,
                      px: {
                        xs: 3,
                        lg: 10,
                      },
                      pb: 10,
                    }}
                  >
                    {queryData ? (
                      <Box>
                        <Hero queryData={queryData} />
                        <PricingSection token={token} queryData={queryData} />
                        <Divider />
                        <PreviousEvent token={token} queryData={queryData} />
                        <Divider />
                        <ClientReviews token={token} queryData={queryData} />
                      </Box>
                    ) : (
                      <>
                        {errorMsg?.matchedServiceProviders && (
                          <>
                            <Box
                              sx={{
                                display: `flex`,
                                alignItems: `center`,
                                justifyContent: `center`,
                                mt: 2,
                              }}
                            >
                              <Alert severity="error">
                                <Typography>{errorMsg?.msg}</Typography>
                              </Alert>
                            </Box>
                            <Box>
                              <Box>
                                <Hero
                                  queryData={
                                    errorMsg?.matchedServiceProviders[0]
                                  }
                                />
                                <PricingSection
                                  queryData={
                                    errorMsg?.matchedServiceProviders[0]
                                  }
                                />
                              </Box>
                            </Box>
                          </>
                        )}
                      </>
                    )}
                  </Box>
                </>
              )}
            </>
          </Box>
        </Container>
      </Modal>
    </Container>
  );
};

export default SearchResultModal;
