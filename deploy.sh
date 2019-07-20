#!/bin/bash

# Fail out on first error
set -e

# Print commands as they run
set +v

# Get the latest master commit
COMMIT=$(git rev-parse --short HEAD)

# Update the remote URL with the access token needed to push
git remote set-url origin "https://freyamade:${GH_TOKEN}@github.com/freyamade/fresh.git"

# Fix git fetch
git config --replace-all remote.origin.fetch +refs/heads/*:refs/remotes/origin/*

# Checkout gh-pages and pull master into it
git fetch --all
git branch --all
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
git commit -m "Deploying version $COMMIT to gh-pages" || true
git push origin gh-pages

# Switch back to master branch
git checkout master
