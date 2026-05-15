#!/bin/bash

# Fail out on first error
set -e

# Print commands as they run
set +v

# Get today's date
VERSION=$(date +'%Y.%m.%d')

# Builds will now be done from master in fresh to master in the pages repo

# Before running the build, take the latest commit and insert it into the code
sed -i "s/{VERSION}/$VERSION/" .env
sed -i "s/{VERSION}/$VERSION/" src/file_system/freyama.de/.changelog.md


# Build the static files on this branch first
npm run build

# Get the rendered html for the noJs and dump it into the file
npm run preview &
sleep 10
$HOME/.local/bin/lightpanda fetch --dump html --wait-ms 10000 --http-timeout 0 --strip-mode js http://localhost:12345/noJs.html | grep -v modulepreload
echo
$HOME/.local/bin/lightpanda fetch --dump html --wait-ms 10000 --http-timeout 0 --strip-mode js http://localhost:12345/noJs.html | grep -v modulepreload > dist/noJs.html
cat dist/noJs.html

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
