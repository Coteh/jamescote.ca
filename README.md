# 2020 Portfolio Website

The latest version of my portfolio website. Based off of template provided by [zirafa](https://github.com/zirafa/simple-website-template), with modifications including but not limited to:

- Fixed issue with dynamic page sections fetched using AJAX not appearing on the page (e.g. Projects) ([see here](https://github.com/Coteh/coteh.github.io/commit/f2c017cf565ce4bafb3698aa50711820be8ab81d#diff-9a9569e9d73f33740eada95275da7f30R28-R34))
- Added Material Icons (currently, the Email icon is used)
- Fixed background image changing size when scrollbar appears (adapted from [this StackOverflow solution](https://stackoverflow.com/a/48705670))
- Lazy load a low resolution version of the background on initial page load for slow Internet connections, then transition to the original background once it's loaded ([#9](https://github.com/Coteh/coteh.github.io/pull/9))

![Screenshot](screenshot.png "App Screenshot")
