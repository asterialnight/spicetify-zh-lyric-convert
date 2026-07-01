# spicetify-zh-convert

A Spicetify extension that converts Traditional Chinese to Simplified Chinese in the Spotify desktop app.

## Features

- Converts Traditional Chinese lyrics to Simplified Chinese
- Supports both Taiwan and Hong Kong Traditional Chinese variants via OpenCC
- Optional toggle to keep artist names, album titles, and song names in Traditional Chinese
- Settings accessible via the 文 button in the Spotify top bar

## Requirements

- [Spicetify](https://spicetify.app/) v2.0+
- [Node.js](https://nodejs.org/) and npm
- [opencc-js](https://www.npmjs.com/package/opencc-js)

## Installation

1. Install dependencies:
```bash
npm install opencc-js
```

2. Build the extension:
```bash
cat ~/node_modules/opencc-js/dist/umd/full.js > ~/.config/spicetify/Extensions/zh-convert.js
cat zh-convert.js >> ~/.config/spicetify/Extensions/zh-convert.js
```

3. Register and apply:
```bash
spicetify config extensions zh-convert.js
spicetify apply
```

## Usage

Click the 文 button in the top bar to open settings. Toggle "保留歌手/专辑/歌曲名繁体" to keep artist, album, and song names in Traditional Chinese while still converting lyrics.

## Notes

- Some content may require a page reload after toggling the setting
- Characters that are identical in both Traditional and Simplified will not visually change
- Typing in search fields is not affected by conversion
