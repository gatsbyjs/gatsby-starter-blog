module.exports = {
  siteMetadata: {
    title: 'overcurried',
    author: 'Jaewon Seo',
    description: 'Personal Blog of Jaewon Seo, who loves computer programming.',
    siteUrl: 'https://overcurried.netlify.com',
    social: {
      github: 'https://github.com/ENvironmentSet',
      twitter: 'https://twitter.com/NvironmentE',
      facebook: 'https://www.facebook.com/ENvironmentSet',
    }
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/blog`,
        name: 'blog',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/assets`,
        name: 'assets',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-131792068-2',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'overcurried',
        short_name: 'overcurried',
        description: 'Personal Blog of ENvironmentSet',
        start_url: '/',
        background_color: '#212121',
        theme_color: '#FF9800',
        display: 'minimal-ui',
        icon: 'content/assets/overcurried.png'
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
  ],
};
