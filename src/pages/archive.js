import React, { useRef, useEffect } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Layout } from '@components';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledTableContainer = styled.div`
  margin: 100px -20px;

  @media (max-width: 768px) {
    margin: 50px -10px;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    .hide-on-mobile {
      @media (max-width: 768px) {
        display: none;
      }
    }

    tbody tr {
      &:hover,
      &:focus {
        background-color: var(--light-navy);
      }
    }

    th,
    td {
      padding: 10px;
      text-align: left;

      &:first-child {
        padding-left: 20px;

        @media (max-width: 768px) {
          padding-left: 10px;
        }
      }
      &:last-child {
        padding-right: 20px;

        @media (max-width: 768px) {
          padding-right: 10px;
        }
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }

    tr {
      cursor: default;

      td:first-child {
        border-top-left-radius: var(--border-radius);
        border-bottom-left-radius: var(--border-radius);
      }
      td:last-child {
        border-top-right-radius: var(--border-radius);
        border-bottom-right-radius: var(--border-radius);
      }
    }

    td {
      &.year {
        padding-right: 20px;

        @media (max-width: 768px) {
          padding-right: 10px;
          font-size: var(--fz-sm);
        }
      }

      &.title {
        padding-top: 15px;
        padding-right: 20px;
        color: var(--lightest-slate);
        font-size: var(--fz-xl);
        font-weight: 600;
        line-height: 1.25;
      }

      &.company {
        font-size: var(--fz-lg);
        white-space: nowrap;
      }

      &.tech {
        font-size: var(--fz-xxs);
        font-family: var(--font-mono);
        line-height: 1.5;
        .separator {
          margin: 0 5px;
        }
        span {
          display: inline-block;
        }
      }

      &.links {
        min-width: 120px;

        div {
          display: flex;
          align-items: center;
          gap: 10px;

          .project-type-icon {
            ${({ theme }) => theme.mixins.flexCenter};
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: var(--light-navy);
            border: 1px solid var(--lightest-navy);
            color: var(--green);
            flex-shrink: 0;
            transition: var(--transition);

            &:hover {
              background: var(--green);
              color: var(--navy);
              transform: scale(1.1);
            }

            svg {
              width: 16px;
              height: 16px;
            }
          }

          a {
            ${({ theme }) => theme.mixins.flexCenter};
            flex-shrink: 0;
            transition: var(--transition);

            &:hover {
              color: var(--green);
              transform: translateY(-2px);
            }
          }
        }
      }
    }
  }
`;

const ArchivePage = ({ location, data }) => {
  const projects = data.allMarkdownRemark.edges;
  const revealTitle = useRef(null);
  const revealTable = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Function to determine icon based on tech stack
  const getProjectIcon = (tech, title) => {
    if (!tech) {return 'External';}

    const techString = tech.join(' ').toLowerCase();
    const titleString = title.toLowerCase();

    if (techString.includes('react') || techString.includes('gatsby')) {return 'React';}
    if (techString.includes('node') || techString.includes('express')) {return 'Nodejs';}
    if (
      techString.includes('mobile') ||
      techString.includes('ios') ||
      techString.includes('android')
    ) {return 'Mobile';}
    if (techString.includes('aws') || techString.includes('cloud') || techString.includes('docker')) {return 'Cloud';}
    if (
      techString.includes('database') ||
      techString.includes('mongodb') ||
      techString.includes('sql')
    ) {return 'Database';}
    if (
      titleString.includes('security') ||
      titleString.includes('penetration') ||
      titleString.includes('audit')
    ) {return 'Security';}
    if (titleString.includes('api') || techString.includes('api') || techString.includes('rest')) {return 'Api';}
    if (
      titleString.includes('tool') ||
      titleString.includes('automation') ||
      titleString.includes('script')
    ) {return 'Tool';}

    return 'External';
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealTable.current, srConfig(200, 0));
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 10)));
  }, []);

  return (
    <Layout location={location}>
      <Helmet title="Project Archive - Complete Portfolio" titleTemplate="%s | Abo Baloyi">
        <meta
          name="description"
          content="Complete archive of Abo Baloyi's cloud engineering projects, DevOps implementations, and security solutions. Browse through years of innovative work."
        />
        <meta
          name="keywords"
          content="Project Archive, Cloud Projects, DevOps Portfolio, AWS Solutions, Kubernetes Deployments, Security Implementations"
        />
      </Helmet>

      <main>
        <header ref={revealTitle}>
          <h1 className="big-heading">Project Portfolio</h1>
          <p className="subtitle">
            A collection of web applications, e-commerce sites, and secure solutions I've built
          </p>
        </header>

        <StyledTableContainer ref={revealTable}>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Title</th>
                <th className="hide-on-mobile">Made at</th>
                <th className="hide-on-mobile">Built with</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {projects.length > 0 &&
                projects.map(({ node }, i) => {
                  const { date, github, external, ios, android, title, tech, company } =
                    node.frontmatter;
                  return (
                    <tr key={i} ref={el => (revealProjects.current[i] = el)}>
                      <td className="overline year">{`${new Date(date).getFullYear()}`}</td>

                      <td className="title">{title}</td>

                      <td className="company hide-on-mobile">
                        {company ? <span>{company}</span> : <span>—</span>}
                      </td>

                      <td className="tech hide-on-mobile">
                        {tech?.length > 0 &&
                          tech.map((item, i) => (
                            <span key={i}>
                              {item}
                              {''}
                              {i !== tech.length - 1 && <span className="separator">&middot;</span>}
                            </span>
                          ))}
                      </td>

                      <td className="links">
                        <div>
                          <div className="project-type-icon">
                            <Icon name={getProjectIcon(tech, title)} />
                          </div>
                          {external && (
                            <a href={external} aria-label="External Link">
                              <Icon name="External" />
                            </a>
                          )}
                          {github && (
                            <a href={github} aria-label="GitHub Link">
                              <Icon name="GitHub" />
                            </a>
                          )}
                          {ios && (
                            <a href={ios} aria-label="Apple App Store Link">
                              <Icon name="AppStore" />
                            </a>
                          )}
                          {android && (
                            <a href={android} aria-label="Google Play Store Link">
                              <Icon name="PlayStore" />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </StyledTableContainer>
      </main>
    </Layout>
  );
};
ArchivePage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default ArchivePage;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/projects/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            date
            title
            tech
            github
            external
          }
          html
        }
      }
    }
  }
`;
