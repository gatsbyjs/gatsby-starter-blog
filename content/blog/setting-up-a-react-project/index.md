---
title: 'Setting Up Your React Project'
description: 'Things to make sure before you start a react project'
date: '2020-01-16T22:40:32.169Z'
---

In the section, we are going to see the necessary things to make sure before you start a react project. We are not going to do any changes in react, instead, we will focus on stuff that needs to be done before that.

You can consider this section as a to-do list for setting up a react project.

> We are going to use [VS Code](https://code.visualstudio.com/) in our case

## What is React?

[React](https://reactjs.org/) is an open-source JavaScript library for building user interfaces which were created by Jordan Walk and maintained by Facebook and a community of individual developers and companies.

## Why Create React App?

[Create React App](https://create-react-app.dev/) (CRA) is an officially and easiest way to get started building React applications.

### Quick Start

```sh
npx create-react-app demo
code demo
```

### ESLint

[ESLint](https://eslint.org/) is a static code analysis tool for identifying problematic patterns found in JavaScript code.

Install [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) in your code editor.

Create a `.eslintrc` file in the root directory of the project.

```json
{
  "extends": ["react-app", "plugin:jsx-a11y/strict"]
}
```

### EditorConfig

#### Why EditorConfig?

[EditorConfig](https://editorconfig.org/) helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.

Install [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) in your code editor.

Create a `.editorconfig` file in the root directory of the project.

```javascript
# http://editorconfig.org
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
max_line_length = 80
trim_trailing_whitespace = true

[*.md]
max_line_length = 0
trim_trailing_whitespace = false

[COMMIT_EDITMSG]
max_line_length = 0
```

### Prettier

[Prettier](https://prettier.io/) is a code formatter.

Add [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) to your editor.

Create a `.prettierrc` file in the root directory of the project.

```json
{
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "jsxSingleQuote": true
}
```

> Add or remove rules according to your convenience

Go to [VS Code Setting](https://code.visualstudio.com/docs/getstarted/settings)

Search for `"Editor: Formate On Save"` and make sure you check the box to formate the code when you save the file.

If you are in the middle of the project and the codes are not formatted well you can do then as well.

```sh
npx prettier --write "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}"
```

### Checklist

1. ESLint
2. EditorConfig
3. Prettier

<!-- Something else needs to be added, we can discuss that in [Twitter](/) -->

### Resources

1. [web.dev](https://web.dev/accessibility-auditing-react/#use-eslint-plugin-jsx-a11y)
2. [create-react-app.dev](https://create-react-app.dev/docs/setting-up-your-editor/)
3. [react github repo](https://github.com/facebook/react/blob/master/.editorconfig)

Thanks for reading!
