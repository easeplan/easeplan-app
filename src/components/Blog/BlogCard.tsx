import React from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';
import blogImg from '@/public/blog/banner.jpg';
import { Typography } from '@mui/material';
import Link from 'next/link';

interface BlogTypes {
  slug: string;
  title: string;
  date: string;
  content: string;
}

interface FeaturedBlogTypes {
  post: {
    slug: string;
    title: string;
    datePublished: string;
    description: string;
    coverImage: {
      url: string;
    };
  };
}

const FeaturedBlogCard = ({ post }: FeaturedBlogTypes) => {
  return (
    <Link href={`/blog/${post?.slug}`}>
      <Box
        sx={{
          display: `grid`,
          gridTemplateColumns: {
            xs: `1fr`,
            sm: `1fr`,
            md: `1.5fr 1fr`,
            lg: `1.5fr 1fr`,
            xl: `1.5fr 1fr`,
          },

          margin: `3rem 0 4rem 0`,
        }}
      >
        <Box
          sx={{
            position: `relative`,
            height: {
              xs: `200px`,
              sm: `250px`,
              md: `300px`,
              lg: `350px`,
              xl: `350px`,
            },
            img: { borderRadius: `0.7rem` },
          }}
        >
          <Image src={post?.coverImage?.url} alt="blog-title" fill />
        </Box>
        <Box
          sx={{
            padding: {
              xs: `1rem 0rem`,
              sm: `1rem 0rem`,
              md: `1rem 2rem`,
              lg: `1rem 2rem`,
              xl: `1rem 2rem`,
            },
          }}
        >
          <Typography fontWeight={500} color="grey.500">
            {post?.datePublished}
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: `1rem`,
                sm: `1.2rem`,
                md: `1.6rem`,
                lg: `2rem`,
              },
              mt: {
                xs: `1rem`,
                sm: `1rem`,
                md: `2rem`,
                lg: `4rem`,
              },
            }}
            fontWeight={500}
          >
            {post?.title}
          </Typography>
          <Typography mt={2}>{post?.description}</Typography>
        </Box>
      </Box>
    </Link>
  );
};

const BlogCard = ({ slug, title, date, content }: BlogTypes) => {
  return (
    <Link href={slug}>
      <Box
        sx={{
          margin: `2rem 0`,
        }}
      >
        <Box
          sx={{
            position: `relative`,
            height: {
              xs: `200px`,
              sm: `250px`,
              md: `200px`,
              lg: `200px`,
              xl: `200px`,
            },
            img: { borderRadius: `0.7rem` },
          }}
        >
          <Image src={blogImg} alt="blog-title" fill />
        </Box>
        <Box sx={{ padding: `1rem` }}>
          <Typography fontSize="0.8rem" fontWeight={400}>
            {date}
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: `1rem`,
                sm: `1.2rem`,
                md: `1.5rem`,
                lg: `1.5rem`,
              },
            }}
            mt={1}
            fontWeight={500}
          >
            {title}
          </Typography>
          <Typography mt={1}>{content}</Typography>
        </Box>
      </Box>
    </Link>
  );
};

export { BlogCard, FeaturedBlogCard };
