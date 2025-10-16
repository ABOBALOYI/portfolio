import { css } from 'styled-components';

const variables = css`
  :root {
    /* Professional Dark Theme - Cloud Engineer Aesthetic */
    --dark-navy: #0a192f;
    --navy: #112240;
    --light-navy: #1d2d50;
    --lightest-navy: #233554;
    --navy-shadow: rgba(2, 12, 27, 0.7);

    /* Cloud Blue Accents */
    --cloud-blue: #64ffda;
    --cloud-blue-dim: #4db8a8;
    --cloud-blue-glow: rgba(100, 255, 218, 0.2);
    --cloud-blue-tint: rgba(100, 255, 218, 0.1);

    /* Professional Tech Colors */
    --tech-cyan: #5ccfe6;
    --tech-purple: #a78bfa;
    --tech-orange: #ffa657;
    --tech-blue: #4d9fff;

    /* Status Colors */
    --success-green: #64ffda;
    --warning-amber: #ffa657;
    --error-red: #ff6b6b;

    /* Grays and Whites */
    --dark-slate: #495670;
    --slate: #8892b0;
    --light-slate: #a8b2d1;
    --lightest-slate: #ccd6f6;
    --white: #e6f1ff;

    /* Legacy mappings for compatibility */
    --green: var(--cloud-blue);
    --green-tint: var(--cloud-blue-tint);
    --pink: var(--tech-purple);
    --blue: var(--tech-blue);

    /* Matrix Green for subtle hacker touch */
    --matrix-green: var(--cloud-blue);
    --matrix-green-dim: var(--cloud-blue-dim);
    --matrix-green-glow: var(--cloud-blue-glow);
    --matrix-green-tint: var(--cloud-blue-tint);

    /* Neon colors mapped to professional palette */
    --neon-cyan: var(--tech-cyan);
    --neon-pink: var(--tech-purple);
    --neon-purple: var(--tech-purple);
    --neon-orange: var(--tech-orange);
    --electric-blue: var(--tech-blue);

    /* Professional Fonts */
    --font-sans: 'Calibre', 'Inter', 'San Francisco', 'SF Pro Text', -apple-system, system-ui,
      sans-serif;
    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    /* Typography Scale (1.25 ratio - Major Third) */
    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 24px;
    --fz-heading: 32px;

    /* Line Heights */
    --lh-tight: 1.1;
    --lh-normal: 1.5;
    --lh-relaxed: 1.7;

    /* Professional Styling */
    --border-radius: 4px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;

    --tab-height: 42px;
    --tab-width: 120px;

    /* Spacing Scale (8px grid system) */
    --spacing-xs: 8px;
    --spacing-sm: 16px;
    --spacing-md: 24px;
    --spacing-lg: 32px;
    --spacing-xl: 48px;
    --spacing-xxl: 64px;
    --spacing-xxxl: 96px;

    /* Section Spacing */
    --section-padding: 100px;
    --section-padding-tablet: 80px;
    --section-padding-mobile: 60px;

    /* Smooth Animations */
    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    --glow-transition: box-shadow 0.25s ease;

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out,
      transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }
`;

export default variables;
