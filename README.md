# YouTube Notes

A Chrome Extension for taking quick notes while watching a YouTube video

## Why

- I'm watching a YouTube video and I want to take some notes, but I don't want to open a Notes App, split screen, etc. 
- I want to have a textarea field next to the YT video that I'm watching where I can enter my notes.
- I want my notes to be persistent - if I ever open the same video again, I want to see my old notes to quickly recall what the video is about

![Screenshot 2022-01-03 at 11 13 03](https://user-images.githubusercontent.com/58401630/147919353-9de8ed4e-3bfc-42db-be9c-23cdaa93a877.png)

## Development

### Available scripts
`npm run dev` - runs parcel in watch mode, so whenever you make changes you only have to reload the extension

`npm run build` - runs parcel in production mode

## Tips 
- if you're looking for a simpler version of the extension, here's [a last commit](https://github.com/sitek94/youtube-notes/tree/d577812d6a0963c19b861ffc3e15a42d51aa63f0) before I introduced parcel, started to bundle the files and added markdown support
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
- developing is quite hard, because you have to manually reload the extension 
  - [webpack-ext-reloader] could help, but unfortunatelly, as of now it doesn't support Manifest v3. In case it is supported in the future, I've got a branch with the build already migrated from rollup to webpack: [webpack migration branch](https://github.com/sitek94/youtube-notes/tree/webpack)
  - another option that looks promising is using Chrome API to reload the extention, I have to do some more digging still

## Resources

`Chrome Developers > Documentation > Extensions`

- [Getting started](https://developer.chrome.com/docs/extensions/mv3/getstarted/)
- [Content scripts](https://developer.chrome.com/docs/extensions/mv3/content_scripts/#functionality)
- [chrome.storage](https://developer.chrome.com/docs/extensions/reference/storage/)

## Ideas 

Just a few ideas that one might want to implement, but I'll probably never add them, because I don't really 
need them:

- [ ] add options page to customize the font size, colors, etc.
