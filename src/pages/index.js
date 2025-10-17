import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Hero, About, Jobs, Featured, Projects, Contact, Head } from '@components';
import Certifications from '@components/sections/certifications';
import GitHubStats from '@components/github-stats';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <Head
      title="Cloud Engineer & DevOps Consultant"
      description="Abo Baloyi - Expert Cloud Engineer, DevOps Consultant, and Penetration Tester specializing in AWS, Kubernetes, and secure cloud infrastructure. View my portfolio of scalable solutions."
      keywords="Abo Baloyi, Cloud Engineer, DevOps Consultant, AWS Expert, Kubernetes, Penetration Testing, Cloud Security, Infrastructure as Code, Portfolio"
    />
    <StyledMainContainer className="fillHeight">
      <Hero />
      <About />
      <Jobs />
      <Featured />
      <Projects />
      <GitHubStats />
      <Certifications />
      <Contact />
    </StyledMainContainer>
  </Layout>
);

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;
