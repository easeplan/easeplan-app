import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import AddPreviousEventModal from './AddPreviousEventModal';
import { setIntroThree, setIntroFour } from '@/features/onboardingSlice';
import { useDispatch } from 'react-redux';
import InstagramOnboarding from './PhotoCarousel';

async function fetchInstagramPhotos(access_token: string, user_id: string) {
  const response = await fetch(
    `/auth/instagram/fetch`,
  );
  const data = await response.json();
  return data.data;
}

const PreviousJobs = ({ queryData, token }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasConnectedInstagram = Boolean(queryData?.provider.igToken);
  const photoCount = queryData?.provider?.providerProfile?.samples?.length || 0;

  const dispatch = useDispatch();

  //   const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

  // Fetching Instagram photos after obtaining token and user ID. This is just a representation.
  const loadPhotos = async () => {
    const data = await fetchInstagramPhotos(
      `IGQWRNbVZAhVEZAMOGdMNkhLWFdtTzdTQWIzT3RvTmQ3NU80bl9JSU8zQVVaeDRWNkVFamdBSWpzdmJjNVdlOUs5UjVLaVljdWxreGl5aFYxQ01kc1ZAFMzRvYzBGV1Y5cEtaSllFUURFdk40ZAndFQU5reFBjbnVhSm13YUhZAMC1zbkgydwZDZD`,
      `23964241119890640`,
    );
    //setPhotos(data);
  };
  loadPhotos();
  const handlePhotoSelect = (id: string) => {
    if (selectedPhotos.includes(id)) {
      setSelectedPhotos((prev) => prev.filter((photoId) => photoId !== id));
    } else {
      setSelectedPhotos((prev) => [...prev, id]);
    }
  };

  const saveSelectedPhotos = () => {
    // Here you would send the selected photos to your server or handle as required
    console.log(`Selected Photos:`, selectedPhotos);
  };
  const photos = [
    {
      id: '17919917051715915',
      caption: 'Join us today\ud83d\udd25\ud83d\udd25',
      media_type: 'VIDEO',
      media_url:
        'https://scontent.cdninstagram.com/o1/v/t16/f1/m82/2F4993486985A59EF97100CAD8E24EB0_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=102&vs=1819547905168099_2478243682&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC8yRjQ5OTM0ODY5ODVBNTlFRjk3MTAwQ0FEOEUyNEVCMF92aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dBTkpNUmVmOXVLaXN6Y0JBQWdVMmJsWmxpUnNicV9FQUFBRhUCAsgBACgAGAAbAYgHdXNlX29pbAExFQAAJqTqz9G5i\u00252Bc\u00252FFQIoAkMzLBdAEAAAAAAAABgSZGFzaF9iYXNlbGluZV8xX3YxEQB1AAA\u00253D&ccb=9-4&oh=00_AfAlacuMiPkTom079vwMrh2O7qxgJSrsnie8q5SmaNSGXQ&oe=653C095F&_nc_sid=1d576d&_nc_rid=08da7c88cb',
      thumbnail_url:
        'https://scontent.cdninstagram.com/v/t51.36329-15/387762863_1373413843382952_5865045765250328412_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=LRyqsyw4Q1UAX_F13v5&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfBjDOovEtgUgVteE1moO-LMVsvm2eRXhsOmq_N3gziY6Q&oe=6540455F',
      timestamp: '2023-10-13T08:22:51+0000',
    },
    {
      id: '18023964214687192',
      caption: 'Energy\ud83d\udcaa',
      media_type: 'IMAGE',
      media_url:
        'https://scontent.cdninstagram.com/v/t51.29350-15/386845512_283885724488320_9187873914222891394_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=nhxHAJPbPYAAX_W996l&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfAJu53hfDUcBG8X_9PqdPJXKLK9p7cWoFf1KMjHY1xOhw&oe=653EDCEE',
      timestamp: '2023-10-08T18:24:53+0000',
    },
    {
      id: '18014189080894684',
      caption:
        '#StartupSouth8 day 2\u2026. Open to connecting with lots of great minds\u2026',
      media_type: 'CAROUSEL_ALBUM',
      media_url:
        'https://scontent.cdninstagram.com/v/t39.30808-6/386780754_3526232670998393_9050225572411081181_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=jxSm7RHIV5EAX_8Q1TR&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfCpTnmqkowSIEyZYlcZ82P_CfHZdNBKrSQPByfi0udz0w&oe=653F0A26',
      timestamp: '2023-10-06T11:56:17+0000',
    },
    {
      id: '17996004503332189',
      caption: 'Had a good time at #StartupSouth',
      media_type: 'CAROUSEL_ALBUM',
      media_url:
        'https://scontent.cdninstagram.com/v/t51.29350-15/386305552_231049159958781_3265583572881837373_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=DCZ6OBVnxLMAX9NlW-7&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfAkcq1PjSigtvkDSdPncylhuanpI2eJxsVtcsNWns8isw&oe=653EE815',
      timestamp: '2023-10-05T17:41:52+0000',
    },
    {
      id: '18005460907893538',
      caption:
        "\ud83d\ude80 Kicking off a month of coding tips, best practices, and job-seeking advice for all you aspiring developers out there! As a software engineer and startup founder, I'm excited to share my journey and insights with you. Stay tuned!  #CodingJourney #SoftwareEngineering",
      media_type: 'IMAGE',
      media_url:
        'https://scontent.cdninstagram.com/v/t51.29350-15/386109641_833257945005075_1157467473981678662_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=ZHPPb9fAdqEAX_05ekb&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfARb-YiPuWIw1BfFmXUde8JjwOSXjM4GWTE1LrEbCQOCQ&oe=653FA44D',
      timestamp: '2023-10-05T09:00:44+0000',
    },
    {
      id: '18015633826865860',
      caption: 'Smile \ud83d\ude0a',
      media_type: 'CAROUSEL_ALBUM',
      media_url:
        'https://scontent.cdninstagram.com/v/t51.29350-15/384398838_309461495046376_1400664821147623151_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=Ydm4T7uAMdoAX8RGVg-&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfD3PncMhpw5yDJM82OCCaX4JDJ-VVqBWNSIB3OAyZkIFA&oe=653FC85A',
      timestamp: '2023-09-29T17:48:16+0000',
    },
    {
      id: '18389878816004398',
      media_type: 'IMAGE',
      media_url:
        'https://scontent.cdninstagram.com/v/t51.29350-15/384761547_3302715686640551_7162903247215384149_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=rQ0rkAQ4I8YAX_Ia5cU&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfBuen1Iq-1n9We59ZknrXikAPJza8kxTJXUaia9cKmIeA&oe=653FFE25',
      timestamp: '2023-09-28T05:55:03+0000',
    },
    {
      id: '17978865677274213',
      caption:
        "We're thrilled to announce our feature on Techpoint Africa's blog! At easeplan.io, our mission remains steadfast: building a marketplace where every event seamlessly finds its ideal match. Thank you for being part of our journey. \n\nhttps://techpoint.africa/2023/08/15/lessons-on-building-an-mvp-at-pitch-friday/",
      media_type: 'CAROUSEL_ALBUM',
      media_url:
        'https://scontent.cdninstagram.com/v/t39.30808-6/372983503_3502251000063227_8133765146660866418_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=a2z_ADY8n3AAX8sLoBh&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfDk7BlmTIoYcdJw78UHX7AibCPQtBRdOdz7-zRZ7sDnfQ&oe=653F0B71',
      timestamp: '2023-08-30T16:03:38+0000',
    },
    {
      id: '17894916815856771',
      caption:
        "There are now over 1080 verified event services providers on easeplan.io waiting to give you a memorable events.\n\nAt easeplan.io, we are creating a marketplace that helps you find the right event service providers in your state and city that matches your budget.\n\nI'm super excited by the results our team are pulling.\n\nAll hands are on deck to see that the vision of Easeplan is achieved. Join us today at www.easeplan.io\n\nCan't wait for you all to use our product. Cheers!",
      media_type: 'CAROUSEL_ALBUM',
      media_url:
        'https://scontent.cdninstagram.com/v/t39.30808-6/369444460_3497427557212238_4613408549637725472_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=CtNTlvEaAXgAX9frHiV&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfB3FY7ftYbEPlbvkPok6xFoot8_ipSiyWOAcPz1kIVkJw&oe=653F433D',
      timestamp: '2023-08-23T07:04:20+0000',
    },
    {
      id: '17906087117750416',
      caption:
        "Experience the Easeplan wave! With over 30 dedicated service providers in every Nigerian state, our network is rapidly expanding. Don't miss out on a sea of potential clients. Join us now and unlock a realm of limitless bookings!",
      media_type: 'IMAGE',
      media_url:
        'https://scontent.cdninstagram.com/v/t39.30808-6/369700474_3496742633947397_6713500800202176117_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=ksMb9A4hWIcAX_uVKS0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfDqsUXRFlIV0RGYSsZoAOJq_rfcOJ2JGXDVFBhe5XKiYg&oe=653EEED7',
      timestamp: '2023-08-22T06:14:48+0000',
    },
    {
      id: '17991463628174717',
      caption:
        'You can start earning more money today as a caterer, baker, DJ, MC, photographer, videographer, etc. when you sign up on easeplan.io. Sign up now at www.easeplan.io',
      media_type: 'IMAGE',
      media_url:
        'https://scontent.cdninstagram.com/v/t39.30808-6/366721740_3488783231410004_6060831519157131575_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=A9dXUjXlFvMAX8TP7sK&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfCI9N81mIz-at2cC3m9qQdmmWb2EUJmHueHzQuxP4J0Gg&oe=653F1D41',
      timestamp: '2023-08-09T19:11:00+0000',
    },
    {
      id: '17967463535352649',
      caption:
        'Join our live session as we officially launch easeplan.io\ud83d\ude80\ud83d\ude80\ud83d\ude80',
      media_type: 'IMAGE',
      media_url:
        'https://scontent.cdninstagram.com/v/t39.30808-6/363826336_3480720675549593_7771380582591251229_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=EDbh3jv_NegAX8nyQat&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfBR1TeI1EFS-oRPKWoHrdIuSbHZQjJzKxFXAB_i48O19A&oe=653EE4FE',
      timestamp: '2023-07-28T10:18:47+0000',
    },
    {
      id: '18015010225654793',
      media_type: 'VIDEO',
      media_url:
        'https://scontent.cdninstagram.com/o1/v/t16/f1/m82/87479FC10A3F6F4D30E3750FBA074F8E_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=109&vs=2094412260896936_4180867288&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC84NzQ3OUZDMTBBM0Y2RjREMzBFMzc1MEZCQTA3NEY4RV92aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dCQlZXUld0WDZFUTJhRVlBR1VMdmV1SkxJVTdicV9FQUFBRhUCAsgBACgAGAAbAYgHdXNlX29pbAExFQAAJv78sJzEqoRAFQIoAkMzLBdAJBDlYEGJNxgSZGFzaF9iYXNlbGluZV8xX3YxEQB1AAA\u00253D&ccb=9-4&oh=00_AfCmAbap78Bj6MttrmVDO-VQndwTr2V2_4ZnLq-EGrmT5A&oe=653C1D8C&_nc_sid=1d576d&_nc_rid=768d1e934b',
      thumbnail_url:
        'https://scontent.cdninstagram.com/v/t51.36329-15/358800421_6464504636975785_7130049995186228903_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=fA3VzBY2yl8AX9TJ2hE&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfAZbPWOVuHfW4Jyhbgf3Ud-akxzVokAd97OokFDzbZGfw&oe=653E7D48',
      timestamp: '2023-07-08T21:26:18+0000',
    },
    {
      id: '17958227129618181',
      caption: 'Dev\u2764\ufe0f',
      media_type: 'IMAGE',
      media_url:
        'https://scontent.cdninstagram.com/v/t51.29350-15/358023597_1106391237415647_1289363769476071261_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=cGQioXcygi8AX-pmfj1&_nc_oc=AQla4fUPvQx2kFw1SfajTBLlsISRdhi4Dtx7GaARYa7PNZ-ja0WQu_bVqO1DEo5SmBQ&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfDxwyDfNCxsVkZUAo6FrybySRXD3iikuojQpoI8B4P1kw&oe=653F1E6A',
      timestamp: '2023-07-05T07:32:49+0000',
    },
    {
      id: '18226101319172065',
      caption: '\ud83d\udc4d',
      media_type: 'IMAGE',
      media_url:
        'https://scontent.cdninstagram.com/v/t51.29350-15/354776024_1995486290790678_1865186163884108874_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=Xcf1-GlcsHQAX-Hp06A&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfA63NzNhCACrs3ZaN3a9vAoWwC9rXnT4EmgKyoQlEP50Q&oe=653FF415',
      timestamp: '2023-06-20T06:56:44+0000',
    },
    {
      id: '17959432271359705',
      caption:
        'Wow this is exciting \ud83d\udd25\ud83d\udd25\ud83d\ude80\ud83d\ude80\nYou can now create a profile and share with your prospective clients on easeplan.io. This way, it\u2019s easier for them to know about your business and the credibility you have built in your area of expertise. Signup on Easeplan today! www.easeplan.io',
      media_type: 'IMAGE',
      media_url:
        'https://scontent.cdninstagram.com/v/t39.30808-6/349326914_1259956957965058_8339639411305509657_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=4inC4uhkIVoAX8U3QqK&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfAvVPLpsGsfPLi1wRlT-kLnI34hO5KCT8YsXzY0ft_qeg&oe=653F707C',
      timestamp: '2023-05-25T20:18:50+0000',
    },
    {
      id: '18007518277676641',
      caption:
        'Easeplan is the #1 event planning platform. Connect with the service providerd you need for your events today and get hired as service provider.',
      media_type: 'IMAGE',
      media_url:
        'https://scontent.cdninstagram.com/v/t39.30808-6/339126190_1014642046628125_6682660284354820263_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=-OI-7ueSp3oAX9VTcdT&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfBJiIxJjwTC1e4lgIhcjlcAPyRvB17VqoXtTXcx0BpyKA&oe=65402C69',
      timestamp: '2023-05-22T11:48:16+0000',
    },
    {
      id: '17985835628092827',
      caption:
        'Join Easeplan today and watch your business experience and exceptional growth. #eventplanner #events #dj #Catering #eventvendorsportharcourt',
      media_type: 'VIDEO',
      media_url:
        'https://video.cdninstagram.com/v/t42.1790-2/346515289_3441670166071785_1664085897281854423_n.mp4?_nc_cat=108&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=WuidxMovnDAAX_v-qit&_nc_ht=video.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfAh2dx9I0wz7Tl5UY1EWJ3QUqgZrK4_eEE_UxFCXq4M2w&oe=653FCCD5',
      thumbnail_url:
        'https://scontent.cdninstagram.com/v/t51.36329-15/346919426_758718129225822_3135697400970370558_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=E1w9hh7Zj5YAX-vDzVx&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfA1UyAl7Jgnn8DjjbQxyNEaVZISwQAcItqwkgCIBCImag&oe=653FABCF',
      timestamp: '2023-05-16T12:36:20+0000',
    },
    {
      id: '17984707093944295',
      media_type: 'IMAGE',
      media_url:
        'https://scontent.cdninstagram.com/v/t51.29350-15/347257987_256675680212915_1952342471010234102_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=WjuF3vtnFYcAX8M41WU&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfDqLuMvoYtIpuZcMS4pnzi0zh3ykdFO7RyQFVDAagKlWQ&oe=653F6605',
      timestamp: '2023-05-16T07:17:37+0000',
    },
    {
      id: '18227810917203422',
      caption: '\ud83e\udee1\ud83e\udee1',
      media_type: 'CAROUSEL_ALBUM',
      media_url:
        'https://scontent.cdninstagram.com/v/t51.29350-15/342380108_705201871291893_292399127611452120_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=mGI_yZJFBFMAX9SP6vm&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfAMspCIl3ntdWgit_foc2Z9jic06_RM7Fa-GNdmHYln7w&oe=65401582',
      timestamp: '2023-04-22T16:03:17+0000',
    },
    {
      id: '17988544966871457',
      media_type: 'IMAGE',
      media_url:
        'https://scontent.cdninstagram.com/v/t51.29350-15/333615376_1295574844723509_5106442158602422086_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=vOXaQ3AfMsAAX8qXaIu&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfAfvaAPZupol5VtFefA28V5zYBpi74xaK-JKAuHcRnQvA&oe=653F22D9',
      timestamp: '2023-03-08T20:12:23+0000',
    },
    {
      id: '17945095529405356',
      caption:
        'Looking for an easier way to plan your next event? Easeplan is the all-in-one platform that connects you with the best vendors, event planners, and tools to make your event unforgettable.\n\nLaunching soon!!!\ud83d\udd25',
      media_type: 'IMAGE',
      media_url:
        'https://scontent.cdninstagram.com/v/t51.29350-15/332347499_875773587043677_5227191876547394292_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=kJja6-YLGtcAX8SnfoV&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfDM1441Xyx7JRR7emxlEVlcx3NPgWIsiI2q2-II2O_GSg&oe=653EC58F',
      timestamp: '2023-02-22T17:36:45+0000',
    },
    {
      id: '18171849682301253',
      caption: 'Weekend',
      media_type: 'CAROUSEL_ALBUM',
      media_url:
        'https://scontent.cdninstagram.com/v/t51.29350-15/320168813_570977804855590_8977441780601002660_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=XOxz3muCjEsAX_o4xOv&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfA12MiA5wVqHVmZ6LFvHck485JPaWIescG9CiJh80A4MQ&oe=653E867D',
      timestamp: '2022-12-17T18:33:22+0000',
    },
    {
      id: '17874049673757472',
      media_type: 'CAROUSEL_ALBUM',
      media_url:
        'https://scontent.cdninstagram.com/v/t51.29350-15/306945944_1221539898701384_1713226251392209232_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=KUFCzLPEEkQAX97LdmA&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfAsJkCBoRo0owlzsYdONkXPa84S7GjjWrtXIyXBCzSNnQ&oe=653F2F55',
      timestamp: '2022-09-17T06:12:23+0000',
    },
    {
      id: '18107051917070812',
      media_type: 'IMAGE',
      media_url:
        'https://scontent.cdninstagram.com/v/t51.2885-15/73133838_266830304273207_1531895747242496531_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=SXiPHg6LUz8AX_dZ27j&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfDP-x7e-UhkyRqRY5C0eeKHKN2Vb823iPFKF_0KIHvP5g&oe=653EBDA5',
      timestamp: '2019-11-05T09:14:22+0000',
    },
  ];
  const handleNextSlide = () => {
    dispatch(setIntroThree(false));
    dispatch(setIntroFour(true));
  };

  return (
    <>
      <AddPreviousEventModal
        token={token}
        isOpen={isOpen}
        isClose={() => setIsOpen(false)}
      />
      <Box mt={5} mb={10}>
        <Box
          sx={{
            display: `flex`,
            justifyContent: `space-between`,
          }}
        >
          <div>
            <Typography
              fontWeight={800}
              sx={{
                fontSize: {
                  xs: `1.2rem`,
                  sm: `1.2rem`,
                  md: `1.5rem`,
                  lg: `1.5rem`,
                },
              }}
              color="primary.main"
            >
              Add Previous Jobs
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: `1rem`,
                  sm: `1rem`,
                  md: `1rem`,
                  lg: `1rem`,
                },
              }}
              color="primary.main"
            >
              Post at least 3 photos
            </Typography>
          </div>
          <div>
            {(hasConnectedInstagram || photoCount >= 3) && (
              <Button variant="contained" onClick={saveSelectedPhotos}>
                Proceed
              </Button>
            )}
          </div>
        </Box>

        {/* Only show Add Photo if the user hasn't connected to Instagram */}
        {!hasConnectedInstagram && (
          <Box
            sx={{
              display: `grid`,
              gridTemplateColumns: {
                xs: `1fr`,
                sm: `1fr`,
                md: `1fr 1fr 1fr`,
                lg: `1fr 1fr 1fr`,
              },
              gap: `1rem`,
              mt: `1rem`,
            }}
          >
            <Box
              sx={{
                borderRadius: `1px`,
                height: `${!photoCount ? `250px` : `100%`}`,
                width: `100%`,
                background: `#ccc`,
                display: `flex`,
                alignItems: `center`,
                justifyContent: `center`,
                mb: `1.5rem`,
              }}
            >
              <Button variant="outlined" onClick={() => setIsOpen(true)}>
                Add Photo
              </Button>
            </Box>
          </Box>
        )}

        {photoCount > 0 &&
          queryData.provider.providerProfile.samples.map((data: any) => (
            <Box
              key={data?._id}
              sx={{
                borderRadius: `1px`,
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
                    lg: `300px`,
                    xl: `300px`,
                  },
                  borderRadius: `10px`,
                  position: `relative`,
                  '.item2': {
                    gridArea: `item2`,
                  },
                }}
              >
                <Image
                  src={data?.sampleImage && data?.sampleImage}
                  alt="eventname"
                  fill
                  quality={100}
                  priority={true}
                  style={{
                    objectFit: `cover`,
                  }}
                />
              </Box>
            </Box>
          ))}

        <Box>
          {!hasConnectedInstagram && (
            <Typography
              sx={{
                fontSize: {
                  xs: `1rem`,
                  sm: `1rem`,
                  md: `1rem`,
                  lg: `1rem`,
                },
              }}
              color="primary.main"
            >
              or connect and display photos from your Instagram
            </Typography>
          )}

          {/* Only show the Connect Instagram button if not connected */}
          {!hasConnectedInstagram && (
            <Box sx={{ mt: `1rem` }}>
              <Button
                variant="contained"
                onClick={() =>
                  (window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/instagram?user=ert`)
                }
                sx={{
                  display: `flex`,
                  alignItems: `center`,
                  justifyContent: `center`,
                  width: {
                    xs: `100%`,
                    sm: `100%`,
                    md: `200px`,
                    lg: `250px`,
                    xl: `250px`,
                  },
                  backgroundImage: `linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D)`, // Instagram gradient colors
                  color: `white`, // set text color to white for better contrast
                }}
              >
                Connect Instagram
              </Button>
            </Box>
          )}

          {hasConnectedInstagram && (
            <Box sx={{ mt: `3rem` }}>
              <InstagramOnboarding
                queryData={queryData}
                photos={photos}
                selectedPhotos={selectedPhotos}
                onSelectPhoto={handlePhotoSelect}
              />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default PreviousJobs;
