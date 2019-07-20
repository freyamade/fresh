#!/bin/bash

# Fail out on first error
set -e

# Get the latest master commit
COMMIT=$(git rev-parse --short HEAD)

# Checkout gh-pages and pull master into it
git remote set-url origin "https://freyamade:${GH_TOKEN}@github.com/freyamade/fresh.git"
git fetch origin
git checkout --track origin/gh-pages
git pull origin master

# Before running the build, take the latest commit and insert it into the code
sed -i "s/{VERSION}/$COMMIT/" src/index.ts

# Build the static files on this branch first
NODE_ENV=production npm run build

# Remove the change to index.ts
git checkout -- src/index.ts

# Add the necessary files for the gh-pages branch and commit them
git add --all
git commit -m "Deploying version $COMMIT to gh-pages"
git push origin gh-pages

# Switch back to master branch
git checkout master
