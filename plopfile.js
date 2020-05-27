module.exports = function(plop) {
  plop.setGenerator('blog', {
    description: 'Write a new blog entry.',
    prompts: [
      {
        type: 'input',
        name: 'blogTitle',
        message: 'Blog title:',
      },
      {
        type: 'input',
        name: 'blogDescription',
        message: 'Blog description:',
      },
      {
        type: 'editor',
        name: 'blogContent',
        message: 'Blog content:',
      }
    ],
    actions: function(data) {
      const date = new Date(Date.now()).toISOString();
      data.date = date;
      return [
        {
          type: 'add',
          path: 'content/blog/{{ dashCase blogTitle }}/index.md',
          template: `---
title: {{ blogTitle }}
date: {{ date }}
description: {{ blogDescription }}
---
{{ blogContent }}
`,
        },
      ];
    },
  });
}
