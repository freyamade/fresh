#!/bin/bash

# Fail out on first error
set -e

# Print commands as they run
set +v

# -------------------------------------------------------------------------------
# Deployment steps

# Configure git
git config --global user.email "ci@freyama.de"
git config --global user.name "Github Actions"

# Clone the private repo next to this one
git clone "https://freyamade:${GH_TOKEN}@github.com/freyamade/freyamade.github.io.git" ../public

# Copy the necessary files into the public directory
cp -r dist/* ../public

# Commit the changes in the public repo and push it
cd ../public
git add --all
git commit -m "Deploying $VERSION"
git push origin master
