import Banner from '@/components/Blog/Banner';
import { BlogCard, FeaturedBlogCard } from '@/components/Blog/BlogCard';
import Layout from '@/components/Layout';
import Section from '@/components/Section';
import { Box } from '@mui/material';
import { GraphQLClient, gql } from 'graphql-request';

const graphcms = new GraphQLClient(`${process.env.NEXT_PUBLIC_BLOG_API}`);

const QUERY = gql`
  {
    posts {
      id
      title
      datePublished
      description
      slug
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

export async function getStaticProps() {
  const { posts }: any = await graphcms.request(QUERY);
  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}

const AllBlogPage = ({ posts }: any) => {
  return (
    <Layout
      description="The key is to provide services and build a brand for yourself through Easyplan. We gathered some tips and resources to help you become a leading service provider."
      title="EasePlan || Be The Dream Planner For Events"
      keyword=""
    >
      <Banner />
      <Section>
        <Box>
          {posts.map(
            (post: any) =>
              post.featured === true && (
                <FeaturedBlogCard key={post.slug} post={post} />
              ),
          )}

          <Box
            sx={{
              display: `grid`,
              gridTemplateColumns: {
                xs: `1fr`,
                sm: `1fr`,
                md: `repeat(2, 1fr)`,
                lg: `repeat(3, 1fr)`,
                xl: `repeat(3, 1fr)`,
              },
              gap: `2rem`,
            }}
          >
            {posts.map(
              (post: any) =>
                !post.featured === true && (
                  <BlogCard
                    key={post.id}
                    title={post.title}
                    content={post.description}
                    date={post.datePublished}
                    slug={`/blog/${post?.slug}`}
                  />
                ),
            )}
          </Box>
        </Box>
      </Section>
    </Layout>
  );
};

export default AllBlogPage;
