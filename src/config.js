module.exports = {
  email: 'abo@baloyiabo.co.za',

  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/ABOBALOYI',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/ABOBALOYI',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/abobaloyi',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/abo-baloyi-54b353122/',
    },
    {
      name: 'StackOverflow',
      url: 'https://stackoverflow.com/users/8611704/abo-baloyi',
    },
  ],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Experience',
      url: '/#jobs',
    },
    {
      name: 'Work',
      url: '/#projects',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
    {
      name: 'Insights',
      url: '/Insights/',
    },
  ],

  colors: {
    orange: '#ff4000',
    navy: '#0f0f0f',
    darkNavy: '#0a0a0a',
    matrixGreen: '#00ff41',
    neonCyan: '#00ffff',
    neonPink: '#ff0080',
  },

  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
