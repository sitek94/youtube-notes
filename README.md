# YouTube Notes

A Chrome Extension for taking quick notes while watching a YouTube video

## Why

I'm watching a YouTube video and I want to take some notes, but I don't want to open a Notes App, split screen, etc. 

I want to have a textarea field next to the YT video that I'm watching where I can enter my notes.

![Screenshot 2022-01-03 at 11 13 03](https://user-images.githubusercontent.com/58401630/147919353-9de8ed4e-3bfc-42db-be9c-23cdaa93a877.png)

### v1 

* Notes should be persistent, initially `localStorage` should be enough.

### v2

* Save notes to Notion

## Resources

- https://blog.logrocket.com/creating-chrome-extension-react-typescript/
- https://levelup.gitconnected.com/make-your-first-chrome-extension-with-javascript-7aa383db2b03
- https://developer.chrome.com/docs/extensions/mv3/getstarted/

## Development 

- if you use WebStorm, and it doesn't recognize `chrome` variable, follow [this stackoverflow thread](https://stackoverflow.com/a/25466708/13504198)
  and install `@types/chrome`
- if you have some error around step [Inspect the background script](https://developer.chrome.com/docs/extensions/mv3/getstarted/#inspect-background)
  try removing and adding again your extension
