import React, { useRef, useEffect } from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Layout } from '@components';
import { usePrefersReducedMotion } from '@hooks';

const StyledInsightsContainer = styled.main`
  max-width: 1000px;
  margin: 0 auto;

  header {
    margin-bottom: 100px;

    @media (max-width: 768px) {
      margin-bottom: 50px;
    }

    h1 {
      margin: 0 0 10px 0;
      font-size: clamp(40px, 8vw, 60px);
    }

    p {
      color: var(--slate);
      font-size: var(--fz-lg);
      max-width: 600px;
    }
  }
`;

const StyledPostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 30px;
  margin-top: 50px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StyledPost = styled(Link)`
  display: flex;
  flex-direction: column;
  padding: 30px;
  background-color: var(--light-navy);
  border-radius: var(--border-radius);
  border: 1px solid var(--lightest-navy);
  transition: var(--transition);
  text-decoration: none;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px -15px var(--navy-shadow);
    border-color: var(--green);

    .post-title {
      color: var(--green);
    }
  }

  .post-overline {
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
    margin-bottom: 10px;
  }

  .post-title {
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: 15px;
    transition: var(--transition);
  }

  .post-description {
    color: var(--slate);
    font-size: var(--fz-md);
    line-height: 1.5;
    margin-bottom: 20px;
  }

  .post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: auto;

    span {
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      color: var(--green);
      background-color: var(--green-tint);
      padding: 5px 10px;
      border-radius: var(--border-radius);
    }
  }

  .post-date {
    color: var(--slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    margin-top: 15px;
  }
`;

const InsightsPage = ({ location, data }) => {
  const posts = data.allMarkdownRemark.edges;
  const revealTitle = useRef(null);
  const revealPosts = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealPosts.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <Layout location={location}>
      <Helmet title="Security Insights & Tutorials" titleTemplate="%s | Abo Baloyi">
        <meta
          name="description"
          content="Security insights, penetration testing tutorials, and cybersecurity guides for South African businesses. Learn about POPIA compliance, ethical hacking, and web security."
        />
        <meta
          name="keywords"
          content="Security Blog, Penetration Testing Tutorials, Ethical Hacking South Africa, POPIA Compliance, Cybersecurity Insights, Web Security, IT Security SA"
        />
      </Helmet>

      <StyledInsightsContainer>
        <header ref={revealTitle}>
          <h1 className="big-heading">Security Insights</h1>
          <p>
            Thoughts on penetration testing, cybersecurity, and building secure applications.
            Practical guides for South African businesses navigating the digital security landscape.
          </p>
        </header>

        <StyledPostsGrid>
          {posts.length > 0 &&
            posts.map(({ node }, i) => {
              const { frontmatter, fields } = node;
              const { title, description, date, tags } = frontmatter;
              const { slug } = fields;

              return (
                <StyledPost key={i} to={slug} ref={el => (revealPosts.current[i] = el)}>
                  <div className="post-overline">
                    {new Date(date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  <h3 className="post-title">{title}</h3>
                  <p className="post-description">{description}</p>
                  {tags && tags.length > 0 && (
                    <div className="post-tags">
                      {tags.map((tag, i) => (
                        <span key={i}>{tag}</span>
                      ))}
                    </div>
                  )}
                </StyledPost>
              );
            })}
        </StyledPostsGrid>
      </StyledInsightsContainer>
    </Layout>
  );
};

InsightsPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default InsightsPage;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/posts/" } }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            date
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
