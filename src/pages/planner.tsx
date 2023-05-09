import HeroSection from '@/components/HeroSection';
import Layout from '@/components/Layout';
import HeroImg from '@/public/heroplannerimg.png';
import BusinessPlanSection from '@/components/BusinessPlanSection';
import QuickGuideSection from '@/components/QuickGuideSection';

const PlannerPage = () => {
  return (
    <Layout
      description="The key is to provide services and build a brand for yourself through Easyplan. We gathered some tips and resources to help you become a leading service provider."
      title="EasePlan || Be The Dream Planner For Events"
      keyword=""
    >
      <HeroSection
        subtitle="Plan events"
        leftText="Be the"
        centerText="Dream Planner"
        rightText="for Events"
        description="Create a memorable event in no time with Easeplan. Let us help you plan your best events with ease."
        href="/signup"
        btnText="get started"
        heroImg={HeroImg}
      />

      <BusinessPlanSection />
      <QuickGuideSection />
    </Layout>
  );
};

export default PlannerPage;
