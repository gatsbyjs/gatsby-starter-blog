<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby starter blog
</h1>

Start the blog you've always wanted. This starter ships with the boilerplate that allows you to make new blog posts with ease.

Check out an example of the starter blog [here](https://gatsby-starter-blog-demo.netlify.com/).

_Have another more specific idea? You may want to check out our vibrant collection of [official and community-created starters](https://www.gatsbyjs.org/docs/gatsby-starters/)._

## 🚀 Quick start

1.  **Install the Gatsby CLI.**

    The Gatsby CLI helps you create new sites using Gatsby starters (like this one!)

    ```sh
    # install the Gatsby CLI globally
    npm install -g gatsby-cli
    ```

2.  **Create a Gatsby site.**

    Use the Gatsby CLI to create a new site with the default starter blog.

    ```sh
    # create a new Gatsby blog
    gatsby new my-gatsby-blog https://github.com/gatsbyjs/gatsby-starter-blog
    ```

3.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```sh
    cd my-gatsby-blog/
    gatsby develop
    ```

4.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!
    
    *Note: You'll also see a second link: `http://localhost:8000/___graphql`. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql).*

## How do I add a new blog post?
1. Navigate to `src/pages` and add a new folder with the "kebab-case" name of the post's title.
    
    * For example, if you wanted to make a new post named "Hello World", call your folder `hello-world`.

2. Navigate inside the folder and add a new file called `index.md`.
    
    * This will be the Markdown file where you will write your new blog post.

3. At the beginning of your new blog post, enter the title and the date as:

```
---
title: Hello World
date: "2015-05-01T22:12:03.284Z"
---
```

This will tell the site (more specifically, the Remark plugin) what the post's title is and when it was written.

4. Type up your new blog post in Markdown and save it.

5. Your new post should be live at `localhost:8000/{slug}`, where 'slug' is the name of the folder you created in step 1.

## 🧐 What's inside?

A quick look at the files and directories provided with the starter blog.

    .
    ├── node_modules
    ├── src
    |   ├── assets
    |   └── components
    |   └── pages
    |   └── templates
    |   └── utils
    ├── static
    ├── .eslintrc.js
    ├── .gitignore
    ├── .prettierrc
    ├── .travis.yml
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md
  
**Core Files**

  1.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser), like your site header, or a page template. “Src” is a convention for “source code”.
    
        * **`src/assets`**: This directory is used to hold assets used throughout the site, like images.
        
        * **`src/components`**: This directory contains all React components which are used throughout the blog, including a biography of the author and a generic layout of the blog itself.

        * **`src/pages`**: This directory contains all blog posts on the site, where each directory is contains a post and its corresponding assets.

        * **`src/templates`**: This directory contains the template for each blog post.

        * **`src/utils`**: This directory contains utilities, such as Typography.js, which handles the blog's style.

  2.  **`/static`**: This directory contains all static assets, i.e. assets that can be sent without needing to be generated or modified.
  
  3.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).
  
  4.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

**Other Files**
  1.  **`/node_modules`**: The directory where all of the modules of code that your project depends on (npm packages) are automatically installed.  

  2.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.
  
  3.  **`.prettierrc`**: This is a configuration file for a tool called [Prettier](https://prettier.io/), which is a tool to help keep the formatting of your code consistent.

  4.  **`LICENSE`**: Gatsby is licensed under the MIT license.
  
  5.  **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. (You won’t change this file directly).
  
  6.  **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

  7.  **`README.md`**: A text file containing useful reference information about your project.

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.org/). Here are some places to start:

-   **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.org/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

-   **To dive straight into code samples head [to our documentation](https://www.gatsbyjs.org/docs/).** In particular, check out the “Guides”, API reference, and “Advanced Tutorials” sections in the sidebar.
