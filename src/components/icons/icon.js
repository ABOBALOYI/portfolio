import React from 'react';
import PropTypes from 'prop-types';
import {
  IconApi,
  IconAppStore,
  IconBookmark,
  IconCloud,
  IconCodepen,
  IconDatabase,
  IconExternal,
  IconFolder,
  IconFork,
  IconGitHub,
  IconInstagram,
  IconLinkedin,
  IconLoader,
  IconLogo,
  IconMobile,
  IconNodejs,
  IconPlayStore,
  IconReact,
  IconSecurity,
  IconStackOverflow,
  IconStar,
  IconTool,
  IconTwitter,
} from '@components/icons';

const Icon = ({ name }) => {
  switch (name) {
    case 'Api':
      return <IconApi />;
    case 'AppStore':
      return <IconAppStore />;
    case 'Bookmark':
      return <IconBookmark />;
    case 'Cloud':
      return <IconCloud />;
    case 'Codepen':
      return <IconCodepen />;
    case 'Database':
      return <IconDatabase />;
    case 'External':
      return <IconExternal />;
    case 'Folder':
      return <IconFolder />;
    case 'Fork':
      return <IconFork />;
    case 'GitHub':
      return <IconGitHub />;
    case 'Instagram':
      return <IconInstagram />;
    case 'Linkedin':
      return <IconLinkedin />;
    case 'Loader':
      return <IconLoader />;
    case 'Logo':
      return <IconLogo />;
    case 'Mobile':
      return <IconMobile />;
    case 'Nodejs':
      return <IconNodejs />;
    case 'PlayStore':
      return <IconPlayStore />;
    case 'React':
      return <IconReact />;
    case 'Security':
      return <IconSecurity />;
    case 'StackOverflow':
      return <IconStackOverflow />;
    case 'Star':
      return <IconStar />;
    case 'Tool':
      return <IconTool />;
    case 'Twitter':
      return <IconTwitter />;
    default:
      return <IconExternal />;
  }
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
