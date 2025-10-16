import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import anime from 'animejs';
import styled from 'styled-components';
import { IconLoader } from '@components/icons';

const StyledLoader = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--dark-navy) 0%, var(--navy) 50%, var(--dark-navy) 100%);
  z-index: 99;
  overflow: hidden;

  /* Matrix rain background */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(
        circle at 25% 25%,
        var(--matrix-green-tint) 0%,
        transparent 50%
      ),
      radial-gradient(circle at 75% 75%, var(--neon-cyan) 0%, transparent 50%);
    opacity: 0.2;
    animation: matrix-rain 20s linear infinite;
  }

  /* Scan lines */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--matrix-green), transparent);
    animation: scan-line 2s linear infinite;
    opacity: 0.7;
  }

  .logo-wrapper {
    width: max-content;
    max-width: 120px;
    transition: var(--glow-transition);
    opacity: ${props => (props.isMounted ? 1 : 0)};
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: -20px;
      left: -20px;
      right: -20px;
      bottom: -20px;
      border: 1px solid var(--matrix-green);
      border-radius: 50%;
      opacity: 0.3;
      animation: neon-glow 2s ease-in-out infinite;
    }

    svg {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      fill: none;
      user-select: none;
      filter: drop-shadow(0 0 20px var(--matrix-green-glow));

      #A {
        opacity: 0;
      }

      path {
        stroke: var(--matrix-green);
        stroke-width: 2;
        fill: var(--matrix-green);
      }
    }
  }

  /* Terminal text effect */
  .loading-text {
    position: absolute;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    color: var(--matrix-green);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    text-align: center;

    &::after {
      content: '_';
      animation: terminal-cursor 1s infinite;
    }
  }
`;

const Loader = ({ finishLoading }) => {
  const [isMounted, setIsMounted] = useState(false);

  const animate = () => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    });

    loader
      .add({
        targets: '#logo path',
        delay: 300,
        duration: 1500,
        easing: 'easeInOutQuart',
        strokeDashoffset: [anime.setDashoffset, 0],
      })
      .add({
        targets: '#logo #A',
        duration: 700,
        easing: 'easeInOutQuart',
        opacity: 1,
      })
      .add({
        targets: '#logo',
        delay: 500,
        duration: 300,
        easing: 'easeInOutQuart',
        opacity: 0,
        scale: 0.1,
      })
      .add({
        targets: '.loader',
        duration: 200,
        easing: 'easeInOutQuart',
        opacity: 0,
        zIndex: -1,
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10);
    animate();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <StyledLoader className="loader" isMounted={isMounted}>
      <Helmet bodyAttributes={{ class: `hidden` }} />

      <div className="logo-wrapper">
        <IconLoader />
      </div>

      <div className="loading-text">Initializing secure connection...</div>
    </StyledLoader>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
