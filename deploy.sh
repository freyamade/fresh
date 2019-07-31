#!/bin/bash

# Fail out on first error
set -e

# Print commands as they run
set +v

# Get the latest master commit
VERSION=$(date +'%Y.%m.%d')

# Builds will now be done from master in fresh to master in the pages repo

# Before running the build, take the latest commit and insert it into the code
sed -i "s/{VERSION}/$VERSION/" src/index.ts

# Build the static files on this branch first
NODE_ENV=production npm run build

# -------------------------------------------------------------------------------
# Deployment steps

# Clone the private repo next to this one
git clone "https://freyamade:${GH_TOKEN}@github.com/freyamade/freyamade.github.io.git" ../public

# Copy the necessary files into the public directory
cp -r static ../public
cp *.html ../public

# Commit the changes in the public repo and push it
cd ../public
git add --all
git commit -m "Deploying $VERSION"
git push origin master
