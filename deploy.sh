#!/bin/bash

# Fail out on first error
set -e

# Set the NODE_ENV value for this script
NODE_ENV=production

# Before running the build, take the latest commit and insert it into the code
COMMIT=$(git rev-parse --short HEAD)
sed -i "s/{VERSION}/$COMMIT/" src/fresh.ts

# Build the static files on this branch first
npm run build

# Before checking out the gh-pages branch, hard reset the fresh.ts file
git checkout -- src/fresh.ts

# Checkout the gh-pages branch
git checkout gh-pages

# Add the necessary files for the gh-pages branch and commit them
git add static/ CNAME index.html favicon.png
git commit -m "Deploying fresh v$COMMIT"
git push origin gh-pages

# Switch back to master branch
git checkout master
