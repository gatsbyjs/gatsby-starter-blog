# example-circleci-static

This example shows how to integrate a static directory into the CircleCI build system. 

The static files aren't checked into the repo -- there's a build step that happens first (`yarn build`).

It produces a directory called `public` that gets uploaded to Circle's artifacts. 

