import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import { socialMedia } from '@config';

const StyledFooter = styled.footer`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  height: auto;
  min-height: 70px;
  padding: 15px;
  text-align: center;
`;

const StyledSocialLinks = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    max-width: 270px;
    margin: 0 auto 10px;
    color: var(--light-slate);
  }

  ul {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    a {
      padding: 10px;
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const StyledCredit = styled.div`
  color: var(--light-slate);
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  line-height: 1.6;

  a {
    padding: 10px;
    transition: var(--transition);

    &:hover {
      color: var(--green);
    }
  }

  .footer-text {
    margin-bottom: 8px;

    .year {
      color: var(--green);
      font-weight: 600;
    }

    .separator {
      margin: 0 8px;
      color: var(--slate);
    }

    .name {
      color: var(--lightest-slate);
      font-weight: 500;
    }
  }

  .tagline {
    color: var(--slate);
    font-size: var(--fz-xxs);
    margin-top: 5px;
    font-style: italic;
  }

  .github-stats {
    margin-top: 15px;

    & > span {
      display: inline-flex;
      align-items: center;
      margin: 0 7px;
      transition: var(--transition);

      &:hover {
        color: var(--green);
      }
    }
    svg {
      display: inline-block;
      margin-right: 5px;
      width: 14px;
      height: 14px;
    }
  }
`;

const Footer = () => {
  const [githubInfo, setGitHubInfo] = useState({
    stars: null,
    forks: null,
  });

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    fetch('https://api.github.com/repos/ABOBALOYI/v4')
      .then(response => response.json())
      .then(json => {
        const { stargazers_count, forks_count } = json;
        setGitHubInfo({
          stars: stargazers_count,
          forks: forks_count,
        });
      })
      .catch(e => console.error(e));
  }, []);

  return (
    <StyledFooter>
      <StyledSocialLinks>
        <ul>
          {socialMedia &&
            socialMedia.map(({ name, url }, i) => (
              <li key={i}>
                <a href={url} aria-label={name}>
                  <Icon name={name} />
                </a>
              </li>
            ))}
        </ul>
      </StyledSocialLinks>

      <StyledCredit tabIndex="-1">
        <div className="footer-text">
          <span className="year">&copy; {new Date().getFullYear()}</span>
          <span className="separator">•</span>
          <span>Designed & Built by</span>
          <span className="separator">•</span>
          <a href="https://github.com/ABOBALOYI" target="_blank" rel="noopener noreferrer">
            <span className="name">Abo Baloyi</span>
          </a>
        </div>
        <div className="tagline">Securing the digital world, one line of code at a time</div>

        {githubInfo.stars && githubInfo.forks && (
          <a href="https://github.com/ABOBALOYI/v4" target="_blank" rel="noopener noreferrer">
            <div className="github-stats">
              <span>
                <Icon name="Star" />
                <span>{githubInfo.stars.toLocaleString()}</span>
              </span>
              <span>
                <Icon name="Fork" />
                <span>{githubInfo.forks.toLocaleString()}</span>
              </span>
            </div>
          </a>
        )}
      </StyledCredit>
    </StyledFooter>
  );
};

Footer.propTypes = {
  githubInfo: PropTypes.object,
};

export default Footer;
