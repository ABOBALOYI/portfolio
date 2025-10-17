import React from 'react';
import styled from 'styled-components';
import { theme, mixins } from '@styles';

const StyledGitHubStats = styled.section`
  ${mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  margin: 0 auto;
  padding: 100px 0;
  max-width: 1000px;

  @media (${theme.bp.tabletL}) {
    padding: 80px 0;
  }

  @media (${theme.bp.mobileL}) {
    padding: 60px 0;
  }

  h2 {
    margin: 0 0 50px;
    font-size: clamp(24px, 5vw, 32px);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
  margin-bottom: 50px;

  @media (${theme.bp.tabletL}) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const StatCard = styled.div`
  background: var(--light-navy);
  border-radius: var(--border-radius);
  padding: 20px;
  border: 1px solid var(--lightest-navy);
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 30px -15px var(--navy-shadow);
  }

  img {
    width: 100%;
    height: auto;
    border-radius: var(--border-radius);
  }
`;

const GitHubStats = () => {
  const username = 'ABOBALOYI'; // Your GitHub username

  return (
    <StyledGitHubStats id="github-stats">
      <h2>GitHub Statistics</h2>

      <StatsGrid>
        <StatCard>
          <img
            src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0D1117&title_color=64FFDA&text_color=CDD6F4&icon_color=64FFDA`}
            alt="GitHub Stats"
            loading="lazy"
          />
        </StatCard>

        <StatCard>
          <img
            src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=tokyonight&hide_border=true&bg_color=0D1117&title_color=64FFDA&text_color=CDD6F4`}
            alt="Top Languages"
            loading="lazy"
          />
        </StatCard>
      </StatsGrid>

      <StatCard style={{ width: '100%' }}>
        <img
          src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=tokyonight&hide_border=true&background=0D1117&stroke=64FFDA&ring=64FFDA&fire=64FFDA&currStreakLabel=64FFDA`}
          alt="GitHub Streak"
          loading="lazy"
        />
      </StatCard>
    </StyledGitHubStats>
  );
};

export default GitHubStats;
