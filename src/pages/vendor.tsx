import React from 'react';
import HeroSection from '@/components/HeroSection';
import Layout from '@/components/Layout';
import HeroImg from '@/public/provideheroimg.png';
import QuickGuideSection from '@/components/QuickGuideSection';

const VendorPage = () => {
  return (
    <Layout
      description="The key is to provide services and build a brand for yourself through Easyplan. We gathered some tips and resources to help you become a leading service provider."
      title="EasePlan || Provide Perfect service for Events"
      keyword=""
    >
      <HeroSection
        subtitle="Provide services"
        leftText="Provide"
        centerText="Perfect
        service"
        rightText="for Events"
        description="The key is to provide services and build a brand for yourself through Easyplan. We gathered some tips and resources to help you become a leading service provider."
        href="/signup"
        btnText="get started"
        heroImg={HeroImg}
      />
      <QuickGuideSection />
    </Layout>
  );
};

export default VendorPage;
