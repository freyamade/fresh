#!/bin/bash

# Fail out on first error
set -e

# Set the NODE_ENV value for this script
NODE_ENV=production

# Checkout gh-pages and pull master into it
git checkout gh-pages
git fetch origin
git rebase master

# Before running the build, take the latest commit and insert it into the code
COMMIT=$(git rev-parse --short HEAD)
sed -i "s/{VERSION}/$COMMIT/" src/fresh.ts

# Build the static files on this branch first
npm run build

# Add the necessary files for the gh-pages branch and commit them
git add static/ CNAME index.html favicon.png
git commit -m "Deploying version $COMMIT to gh-pages"
git push origin gh-pages

# Switch back to master branch
git checkout master
