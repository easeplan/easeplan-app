/* eslint-disable @typescript-eslint/no-use-before-define */
import EventSection from '@/components/hompageSections/EventSection';
import AboutEventSection from '@/components/hompageSections/AboutEventSection';
import Layout from '@/components/Layout';
import ServiceSection from '@/components/hompageSections/ServiceSection';
import ProvideServiceSection from '@/components/hompageSections/ProvideServiceSection';
import styled from 'styled-components';
import TestimoniaSection from '@/components/hompageSections/TestimoniaSection';
import HeroSection from '@/components/HeroSection';
import HeroImg from '@/public/heroimg.png';

export default function Home() {
  return (
    <Layout
      description="Make event planning a breeze with Easeplan. Find the best service providers, connect with top event planners and vendors, and manage everything in one easy-to-use platform."
      title="EasePlan || Effortlessly Plan Your Events"
      keyword="DJ, Event Planner"
    >
      <MainWrapper>
        <HeroSection
          subtitle="Events at your Comfort"
          leftText="Effortlessly"
          centerText="Plan"
          rightText="your Events"
          description="Plan fantastic events with ease using Easeplan. Our platform helps you find the best service providers, event planners, and vendors, simplifying the event planning process in one easy-to-use platform."
          href="/"
          btnText="Join Waitlist"
          heroImg={HeroImg}
        />
        <EventSection />
        <ServiceSection />
        <AboutEventSection />
        <ProvideServiceSection />
        <TestimoniaSection />
      </MainWrapper>
    </Layout>
  );
}

const MainWrapper = styled.main``;
