import Typography from "typography"
import githubTheme from "typography-theme-github"

githubTheme.headerFontFamily = ["Montserrat", "sans-serif"]
githubTheme.bodyFontFamily = ["Montserrat", "sans-serif"]

const typography = new Typography(githubTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
