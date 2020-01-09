import Typography from "typography"
import grandViewTheme from "typography-theme-grand-view"

//
// Wordpress2016.overrideThemeStyles = () => {
//   return {
//     "a.gatsby-resp-image-link": {
//       boxShadow: `none`,
//     },
//   }
// }
//
// delete Wordpress2016.googleFonts

const typography = new Typography(grandViewTheme)

grandViewTheme.overrideThemeStyles = () => {
  return {
    "p > img": {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
    }
  }
};

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale