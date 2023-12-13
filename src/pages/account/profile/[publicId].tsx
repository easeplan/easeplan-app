import Hero from '@/components/UserProfile/Hero';
import DashboardLayout from '@/components/DashboardLayout';
import { Box, Divider } from '@mui/material';
import { parseCookies } from '@/lib/parseCookies';
import { useEffect } from 'react';
import PricingSection from '@/components/publicPageSections/PricingSection';
import PreviousEvent from '@/components/publicPageSections/PreviousEvent';
import ClientReviews from '@/components/publicPageSections/ClientReviews';
import Head from 'next/head';

const ViewProfilePage = ({ data, token }: any) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('lastVisitedURL');
    }
  }, []);

  return (
    <>
      <Head>
        <title>{data?.providerProfile?.company?.name} - Easeplan</title>
        <meta name="theme-color" content="#134153" />
        <meta itemProp="name" content={data?.providerProfile?.company?.name} />
        <meta
          itemProp="image"
          content={data?.providerProfile?.company?.image}
        />
        <meta
          name="description"
          content={data?.providerProfile?.company?.description}
        />

        {/*<!-- Facebook Meta Tags -->*/}
        <meta
          property="og:title"
          content={data?.providerProfile?.company?.name}
        />
        <meta
          property="og:image"
          content={data?.providerProfile?.company?.image}
        />
        <meta
          property="og:url"
          content={`https://app.easeplan.io/profile/${data?.providerProfile?.publicId}`}
        />
        <meta property="og:type" content="website" />

        {/*<!-- Twitter Meta Tags -->*/}
        <meta
          name="twitter:title"
          content={data?.providerProfile?.company?.name}
        />
        <meta
          name="twitter:image"
          content={data?.providerProfile?.company?.image}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="og:image"
          content={data?.providerProfile?.company?.image}
        ></meta>
      </Head>
      <DashboardLayout token={token}>
        <Box>
          <Hero queryData={data} token={token} />
          <PricingSection queryData={data} />
          <Divider />
          <PreviousEvent queryData={data} />
          <Divider />
          <ClientReviews queryData={data} />
        </Box>
      </DashboardLayout>
    </>
  );
};

export async function getServerSideProps(context: {
  req: any;
  query: { publicId: any };
}) {
  const {
    req,
    query: { publicId },
  } = context;

  const { token } = parseCookies(req);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/profiles/profile/${publicId}`,
  );

  const data = await res.json();

  return {
    props: {
      token: token || null,
      data: data?.data || null,
    },
  };
}

export default ViewProfilePage;
