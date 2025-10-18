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
  width: 100%;
  overflow-x: hidden;

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
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  width: 100%;
  margin-bottom: 50px;

  @media (${theme.bp.tabletL}) {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  @media (max-width: 320px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const StatCard = styled.div`
  background: var(--light-navy);
  border-radius: var(--border-radius);
  padding: 20px;
  border: 1px solid var(--lightest-navy);
  transition: var(--transition);
  width: 100%;
  min-width: 0;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 30px -15px var(--navy-shadow);
  }

  img {
    width: 100%;
    height: auto;
    border-radius: var(--border-radius);
    max-width: 100%;
    display: block;
  }

  @media (max-width: 480px) {
    padding: 15px;
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
            onError={e => {
              e.target.style.display = 'none';
              e.target.parentNode.innerHTML =
                '<p style="color: var(--slate); text-align: center; padding: 20px;">GitHub stats temporarily unavailable</p>';
            }}
          />
        </StatCard>

        <StatCard>
          <img
            src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=tokyonight&hide_border=true&bg_color=0D1117&title_color=64FFDA&text_color=CDD6F4`}
            alt="Top Languages"
            loading="lazy"
            onError={e => {
              e.target.style.display = 'none';
              e.target.parentNode.innerHTML =
                '<p style="color: var(--slate); text-align: center; padding: 20px;">Language stats temporarily unavailable</p>';
            }}
          />
        </StatCard>
      </StatsGrid>

      <StatCard style={{ width: '100%' }}>
        <img
          src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=tokyonight&hide_border=true&background=0D1117&stroke=64FFDA&ring=64FFDA&fire=64FFDA&currStreakLabel=64FFDA`}
          alt="GitHub Streak"
          loading="lazy"
          onError={e => {
            e.target.style.display = 'none';
            e.target.parentNode.innerHTML =
              '<p style="color: var(--slate); text-align: center; padding: 20px;">Streak stats temporarily unavailable</p>';
          }}
        />
      </StatCard>
    </StyledGitHubStats>
  );
};

export default GitHubStats;
