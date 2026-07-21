# Spicetify Traditional to Simplified Chinese lyric conversion

A Spicetify extension that converts Traditional Chinese to Simplified Chinese in the Spotify desktop app. 
Spotify's lyrics for Mandarin songs are often displayed in Traditional Chinese, which this extension converts to Simplified.
## Features

- Converts Traditional Chinese lyrics to Simplified Chinese
- Supports both Taiwan and Hong Kong Traditional Chinese variants via OpenCC
- By default, extension converts artist names, album titles, and song names to Simplified Chinese. Toggle to keep artist names, album titles, and song names in Traditional Chinese while still converting lyrics
- Settings accessible via the 文 button in the Spotify top bar

**Original lyrics page**
<img width="1235" height="831" alt="image" src="https://github.com/user-attachments/assets/852696c1-074a-44a1-aa2f-df077d8b2c73" />

**New lyrics page**
<img width="1228" height="882" alt="image" src="https://github.com/user-attachments/assets/8c75de0d-3888-4828-88c2-0f85432d4769" />


## Requirements

- [Spicetify](https://spicetify.app/) v2.0+
- [Node.js](https://nodejs.org/) and npm


## Compatibility

Tested on macOS. May work on Windows and Linux but has not been verified.

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
<img width="682" height="133" alt="image" src="https://github.com/user-attachments/assets/ce561b8b-9408-4ebe-a7f5-98d05f4aaa3f" />


## Known Issues

- Some content may require a page reload after toggling the setting.

## Notes

 - Characters that are identical in both Traditional and Simplified will not visually change.
 - After running `./build.sh`, the extension is baked into Spotify and runs automatically every time Spotify opens. You do not need to keep the terminal open.
