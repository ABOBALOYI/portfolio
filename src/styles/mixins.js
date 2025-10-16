import { css } from 'styled-components';

const button = css`
  color: var(--green);
  background-color: transparent;
  border: 1px solid var(--green);
  border-radius: var(--border-radius);
  font-size: var(--fz-xs);
  font-family: var(--font-mono);
  line-height: 1;
  text-decoration: none;
  padding: 1.25rem 1.75rem;
  transition: var(--transition);
  cursor: pointer;

  &:hover,
  &:focus-visible {
    outline: none;
    background-color: var(--green-tint);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:after {
    display: none !important;
  }
`;

const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  link: css`
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      color: var(--green);
      outline: 0;
    }
  `,

  inlineLink: css`
    display: inline-block;
    position: relative;
    color: var(--green);
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      color: var(--green);
      outline: 0;
      &:after {
        width: 100%;
      }
      & > * {
        color: var(--green) !important;
        transition: var(--transition);
      }
    }
    &:after {
      content: '';
      display: block;
      width: 0;
      height: 1px;
      position: relative;
      bottom: 0.37em;
      background-color: var(--green);
      opacity: 0.5;
      @media (prefers-reduced-motion: no-preference) {
        transition: var(--transition);
      }
    }
  `,

  button,

  smallButton: css`
    color: var(--green);
    background-color: transparent;
    border: 1px solid var(--green);
    border-radius: var(--border-radius);
    padding: 0.75rem 1rem;
    font-size: var(--fz-xs);
    font-family: var(--font-mono);
    line-height: 1;
    text-decoration: none;
    transition: var(--transition);
    cursor: pointer;

    &:hover,
    &:focus-visible {
      outline: none;
      background-color: var(--green-tint);
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }

    &:after {
      display: none !important;
    }
  `,

  bigButton: css`
    color: var(--green);
    background-color: transparent;
    border: 1px solid var(--green);
    border-radius: var(--border-radius);
    padding: 1.25rem 1.75rem;
    font-size: var(--fz-sm);
    font-family: var(--font-mono);
    line-height: 1;
    text-decoration: none;
    transition: var(--transition);
    cursor: pointer;

    &:hover,
    &:focus-visible {
      outline: none;
      background-color: var(--green-tint);
      transform: translateY(-3px);
      box-shadow: 0 10px 20px -10px var(--green-tint);
    }

    &:active {
      transform: translateY(-1px);
    }

    &:after {
      display: none !important;
    }
  `,

  boxShadow: css`
    box-shadow: 0 10px 30px -15px var(--navy-shadow);
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      box-shadow: 0 20px 30px -15px var(--navy-shadow);
    }
  `,

  fancyList: css`
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: var(--fz-lg);
    li {
      position: relative;
      padding-left: 30px;
      margin-bottom: 10px;
      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
      }
    }
  `,

  resetList: css`
    list-style: none;
    padding: 0;
    margin: 0;
  `,

  /* Cyberpunk Mixins */
  cyberPanel: css`
    background: linear-gradient(135deg, var(--dark-navy) 0%, var(--navy) 100%);
    border: 1px solid var(--matrix-green);
    border-radius: var(--border-radius);
    box-shadow: 0 0 20px var(--matrix-green-glow), inset 0 0 20px rgba(0, 0, 0, 0.5);
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--matrix-green), transparent);
      animation: scan-line 2s linear infinite;
    }
  `,

  terminalWindow: css`
    background: var(--dark-navy);
    border: 1px solid var(--matrix-green);
    border-radius: var(--border-radius);
    font-family: var(--font-terminal);
    box-shadow: 0 0 30px var(--matrix-green-glow);

    &::before {
      content: '● ● ●';
      display: block;
      padding: 8px 15px;
      background: linear-gradient(90deg, var(--light-navy), var(--navy));
      border-bottom: 1px solid var(--matrix-green);
      color: var(--matrix-green);
      font-size: 10px;
      letter-spacing: 5px;
    }
  `,

  glitchEffect: css`
    position: relative;

    &::before,
    &::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    &::before {
      animation: glitch 0.3s infinite;
      color: var(--neon-cyan);
      z-index: -1;
    }

    &::after {
      animation: glitch 0.3s infinite reverse;
      color: var(--neon-pink);
      z-index: -2;
    }
  `,

  neonGlow: css`
    color: var(--matrix-green);
    text-shadow: 0 0 5px var(--matrix-green), 0 0 10px var(--matrix-green),
      0 0 15px var(--matrix-green), 0 0 20px var(--matrix-green);

    &:hover {
      animation: neon-glow 1s ease-in-out infinite alternate;
    }
  `,

  scanLines: css`
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 255, 65, 0.03) 2px,
        rgba(0, 255, 65, 0.03) 4px
      );
      pointer-events: none;
    }
  `,
};

export default mixins;
