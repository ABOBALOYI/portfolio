import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;
  position: relative;
  background: transparent;

  /* Optional hero image background */
  &.with-hero-image {
    background-image: url('/hero-terminal.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    /* Dark overlay for better text readability */
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(10, 25, 47, 0.85);
      z-index: -1;
    }
  }

  /* Subtle ambient glow effect */
  &::before {
    content: '';
    position: absolute;
    top: 20%;
    left: 10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(100, 255, 218, 0.08) 0%, transparent 70%);
    border-radius: 50%;
    z-index: -1;
    animation: float 20s ease-in-out infinite;
  }

  /* Secondary glow */
  &::after {
    content: '';
    position: absolute;
    bottom: 20%;
    right: 10%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(92, 207, 230, 0.06) 0%, transparent 70%);
    border-radius: 50%;
    z-index: -1;
    animation: float 25s ease-in-out infinite reverse;
  }

  @keyframes float {
    0%,
    100% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(30px, -30px);
    }
  }

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--matrix-green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;
    text-shadow: 0 0 10px var(--matrix-green-glow);
    position: relative;

    &::after {
      content: '_';
      animation: terminal-cursor 1s infinite;
      color: var(--matrix-green);
    }

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h2 {
    color: var(--lightest-slate);
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);

    &.big-heading {
      background: linear-gradient(45deg, var(--matrix-green), var(--neon-cyan));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      filter: drop-shadow(0 0 10px var(--matrix-green-glow));
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--light-slate);
    line-height: 1.1;
    font-size: clamp(var(--fz-lg), 4vw, var(--fz-heading));

    &.big-heading {
      background: linear-gradient(45deg, var(--neon-pink), var(--neon-purple));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      filter: drop-shadow(0 0 10px var(--neon-pink));
    }

    @media (max-width: 480px) {
      font-size: clamp(var(--fz-md), 5vw, var(--fz-xl));
      margin-top: 10px;
    }
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
    color: var(--slate);
    font-family: var(--font-mono);
    line-height: 1.6;
    text-shadow: 0 0 5px rgba(176, 176, 176, 0.3);

    /* Terminal-style text effect */
    border-left: 2px solid var(--matrix-green);
    padding-left: 20px;
    background: linear-gradient(90deg, var(--matrix-green-tint), transparent);
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 600;

    &:hover {
      transform: translate(-5px, -5px) scale(1.05);
    }
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>$ whoami</h1>;
  const two = <h2 className="big-heading">ABO_Baloyi.exe</h2>;
  const three = <h3 className="big-heading">Security • Cloud • Code</h3>;
  const four = (
    <>
      <p>
        <span style={{ color: 'var(--matrix-green)' }}>{'[SECURITY]'}</span> Penetration tester &
        ethical hacker
        <br />
        <span style={{ color: 'var(--neon-cyan)' }}>{'[CLOUD]'}</span> AWS infrastructure & DevOps
        automation
        <br />
        <span style={{ color: 'var(--neon-pink)' }}>{'[CODE]'}</span> Full-stack developer & system
        architect
        <br />
        <span style={{ color: 'var(--matrix-green)' }}>{'>'}</span> Building secure, scalable
        digital solutions
      </p>
    </>
  );
  const five = (
    <a className="email-link" href="/Insights/" target="_blank" rel="noreferrer">
      ./explore_insights.sh
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
