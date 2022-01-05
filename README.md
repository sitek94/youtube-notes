# YouTube Notes

A Chrome Extension for taking quick notes while watching a YouTube video

## Why

- I'm watching a YouTube video and I want to take some notes, but I don't want to open a Notes App, split screen, etc. 
- I want to have a textarea field next to the YT video that I'm watching where I can enter my notes.
- I want my notes to be persistent - if I ever open the same video again, I want to see my old notes to quickly recall what the video is about

![Screenshot 2022-01-03 at 11 13 03](https://user-images.githubusercontent.com/58401630/147919353-9de8ed4e-3bfc-42db-be9c-23cdaa93a877.png)

## Resources

`Chrome Developers > Documentation > Extensions`

- [Getting started](https://developer.chrome.com/docs/extensions/mv3/getstarted/)
- [Content scripts](https://developer.chrome.com/docs/extensions/mv3/content_scripts/#functionality)
- [chrome.storage](https://developer.chrome.com/docs/extensions/reference/storage/)

## Development 

- if you use WebStorm, and it doesn't recognize `chrome` variable, follow [this stackoverflow thread](https://stackoverflow.com/a/25466708/13504198)
  and install `@types/chrome`
- if you have some error around step [Inspect the background script](https://developer.chrome.com/docs/extensions/mv3/getstarted/#inspect-background)
  try removing and adding again your extension

## Known obstacles

- persisting notes 
  - storage limit - the easiest way to store the notes is to use [chrome.storage](https://developer.chrome.com/docs/extensions/reference/storage/),
    which seems to have a [limit](https://developer.chrome.com/docs/extensions/reference/storage/#property-sync) of 102400 bytes.
    - above-mentioned limit is for `storage.sync`, `storage.local` with `unlimitedStorage` permission, doesn't have such limit, 
      so if you don't need to sync your notes between devices, that's something to consider
  - write operations limit (120 per minute) - we can't save the notes on each keystroke, instead we need to either debounce
    the input, or save the notes every minute or so.

## Ideas 

Just a few ideas that one might want to implement, but I'll probably never add them, because I don't really 
need them:

- [ ] add options page to customize the font size, colors, etc.
