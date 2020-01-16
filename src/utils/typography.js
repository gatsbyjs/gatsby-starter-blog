import Typography from 'typography';
import fairyGatesTheme from 'typography-theme-fairy-gates';

fairyGatesTheme.overrideThemeStyles = () => {
  return {
    'a.gatsby-resp-image-link': {
      boxShadow: `none`
    },
    '.gatsby-highlight': {
      overflowX: 'auto'
    },
    '*': {
      backgroundColor: '#2d2e2e',
      color: '#979899'
    },
    'h1, h2, h3, h4, h5, h6': {
      color: '#ddd'
    },
    a: {
      color: '#e0a80d',
      textShadow: 'none',
      backgroundImage: 'none'
    },
    blockquote: {
      fontSize: 'unset',
      borderLeft: '0.27187rem solid #e0a80d !important'
    }
  };
};

// fairyGatesTheme.overrideStyles = () => ({});

// delete fairyGatesTheme.googleFonts;

const typography = new Typography(fairyGatesTheme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
