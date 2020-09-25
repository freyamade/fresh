# CHANGELOG
Details of changes and the dates on which they occurred.

## 25.09.2020
- npm fixes
- various changes to the site to match new CV
    - added experience dir
    - removed the fact that I'm no longer working in CIX
    - added more details to `whoami`
- added a `cv` command
    - opens my CV as a pdf in a new window

## 26.08.2019
- `pkg` command implemented.
    - The `pkg` command allows for installation of extra packages to add extra functionality to the website.
    - There aren't any useful packages in the system yet, but the feature is there now and that's the main thing.

## 19.07.2019
- Fully redeveloped the website using a [different library](https://github.com/rohanchandra/javascript-terminal) instead of XtermJS
    - XtermJS was a library meant to connect to a bash shell or something underneath, wasn't really designed for the use case.
    - This new library comes with some command emulation built in
    - It's also made my bundle size smaller!
    - And the website uses normal HTML to render output and gather input, meaning it's actually usable on mobile!

## 16.07.2019
- Fully deployed basic terminal website
    - Mobile support is all but non-existant, but it's a start!
