import Typography from "typography"
import deYoungTheme from 'typography-theme-de-young'

deYoungTheme.baseFontSize = '16px'
deYoungTheme.headerFontFamily = ['IBM Plex Serif', 'serif']
deYoungTheme.bodyFontFamily = ['IBM Plex Sans', 'sans-serif']
deYoungTheme.googleFonts = [
  {
    name: 'IBM Plex Mono',
    styles: [
      '300',
      '400',
      '500',
      '600',
      '700'
    ],
  },
  {
    name: 'IBM Plex Sans',
    styles: [
      '300',
      '400',
      '500',
      '600',
      '700'
    ]
  },
  {
    name: 'IBM Plex Serif',
    styles: [
      '300',
      '400',
      '500',
      '600',
      '700'
    ]
  }
]

const typography = new Typography(deYoungTheme)

if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
