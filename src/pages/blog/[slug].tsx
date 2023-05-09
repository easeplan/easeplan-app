import React from 'react';
import Layout from '@/components/Layout';
import { GraphQLClient, gql } from 'graphql-request';
import Section from '@/components/Section';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { string } from 'yup';

const graphcms = new GraphQLClient(`${process.env.NEXT_PUBLIC_BLOG_API}`);

const QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      datePublished
      description
      slug
      keywords
      seoDescription
      featured
      note {
        html
      }
      author {
        name
        avatar {
          url
        }
      }
      coverImage {
        url
      }
    }
  }
`;

const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;

const ReadBlogPage = ({ post }: any) => {
  return (
    <Layout
      description={post?.seoDescription}
      title={post?.title}
      keyword={post.keywords}
    >
      <Box sx={{ position: `relative` }}>
        <Box
          sx={{
            height: `25vh`,
            width: `100%`,
            // backgroundColor: `secondary.main`,
            // boxShadow: `0 3px 10px rgb(0 0 0 / 0.2)`,
          }}
        ></Box>
        <Box
          sx={{
            position: `relative`,
            height: {
              xs: `200px`,
              sm: `200px`,
              md: `350px`,
              lg: `450px`,
              xl: `450px`,
            },
            width: `70%`,
            margin: `-4rem auto 0 auto`,
            img: { borderRadius: `0.7rem` },
            borderRadius: `0.7rem`,
            boxShadow: `0 3px 10px rgb(0 0 0 / 0.2)`,
          }}
        >
          <Image src={post?.coverImage?.url} alt={post?.title} fill />
        </Box>
      </Box>
      <Section>
        <Box sx={{ width: `80%`, margin: `0 auto`, textAlign: `left` }}>
          {/* <Box sx={{width: `60%`, margin: `0 auto` }}>
            <Typography mb={1}>{post.datePublished}</Typography>
          </Box> */}
          <Typography
            fontWeight={400}
            sx={{
              fontSize: {
                xs: `1.2rem`,
                sm: `1.5rem`,
                md: `2.5rem`,
                lg: `2.5rem`,
              },
            }}
          >
            {post.title}
          </Typography>
          <Typography
            mt={2}
            sx={{
              fontSize: {
                xs: `1rem`,
                sm: `1rem`,
                md: `1.5rem`,
                lg: `1.5rem`,
              },
            }}
            color="grey.700"
          >
            {post.description}
          </Typography>
          <Typography sx={{ textAlign: `right`, color: `grey.500` }} mt={2}>
            {post.datePublished}
          </Typography>
        </Box>
        <Box
          sx={{ mt: `4rem`, width: `80%`, margin: `3rem auto` }}
          dangerouslySetInnerHTML={{ __html: post.note.html }}
        ></Box>
      </Section>
    </Layout>
  );
};

interface GraphCMSResponse {
  posts: Array<{
    slug: string;
    // add more properties here as needed
  }>;
}

export async function getStaticPaths() {
  // const { posts } = await graphcms.request(SLUGLIST);
  const { posts }: GraphCMSResponse = await graphcms.request(SLUGLIST);

  return {
    paths: posts.map((post: any) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

interface Post {
  post: {
    id: string;
    title: string;
    datePublished: string;
    description: string;
    slug: string;
    keywords: string;
    seoDescription: string;
    featured: boolean;
    note: {
      html: any;
    };
    author: {
      name: string;
      avatar: {
        url: string;
      };
    };
    coverImage: {
      url: string;
    };
  };
}

export async function getStaticProps({ params }: any) {
  const slug = params.slug;
  const { post }: Post = await graphcms.request(QUERY, { slug });
  return {
    props: {
      post,
    },
    revalidate: 10,
  };
}

export default ReadBlogPage;
