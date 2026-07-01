# Spicetify Traditional to Simplified Chinese lyric conversion

A Spicetify extension that converts Traditional Chinese to Simplified Chinese in the Spotify desktop app.

## Features

- Converts Traditional Chinese lyrics to Simplified Chinese
- Supports both Taiwan and Hong Kong Traditional Chinese variants via OpenCC
- Toggle to keep artist names, album titles, and song names in Traditional Chinese while still converting lyrics
- Settings accessible via the 文 button in the Spotify top bar

## Requirements

- [Spicetify](https://spicetify.app/) v2.0+
- [Node.js](https://nodejs.org/) and npm

## Installation

1. Clone the repo:
```bash
git clone https://github.com/asterialnight/spicetify-zh-convert.git
cd spicetify-zh-convert
```

2. Install dependencies:
```bash
npm install
```

3. Build and apply:
```bash
./build.sh
```

## Usage

Click the 文 button in the top bar to open settings. Toggle "保留歌手/专辑/歌曲名繁体" to keep artist, album, and song names in Traditional Chinese while still converting lyrics.

## Known Issues

- Typing Chinese characters into playlist search may cause Spotify to crash. This is a known bug being investigated.
- Some content may require a page reload after toggling the setting.
- Characters that are identical in both Traditional and Simplified will not visually change.

## Notes

After running `./build.sh`, the extension is baked into Spotify and runs automatically every time Spotify opens. You do not need to keep the terminal open.
