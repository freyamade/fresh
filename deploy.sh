#!/bin/bash

# Fail out on first error
set -e

# Print commands as they run
set +v

# Get the latest master commit
VERSION=$(date +'%Y.%m.%d')

# Fix git fetch
git config --replace-all remote.origin.fetch +refs/heads/*:refs/remotes/origin/*

# Checkout proper master
git fetch origin
git checkout master

# Update the remote URL with the access token needed to push
git remote set-url origin "https://freyamade:${GH_TOKEN}@github.com/freyamade/freyamade.github.io.git"

# Builds will now be done from master in fresh to master in the pages repo

# Before running the build, take the latest commit and insert it into the code
sed -i "s/{VERSION}/$VERSION/" src/index.ts

# Build the static files on this branch first
NODE_ENV=production npm run build

# Remove the change to index.ts
git checkout -- src/index.ts

# Add the necessary files for the gh-pages branch and commit them
git add --all
git add -f static
git commit -m "Deploying version '$VERSION'" || true
git push origin master
