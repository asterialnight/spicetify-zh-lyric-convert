#!/bin/bash
./node_modules/.bin/esbuild src/zh-convert.ts \
  --bundle \
  --outfile=zh-convert.built.js \
  --format=iife \
  --platform=browser
cp zh-convert.built.js ~/.config/spicetify/Extensions/zh-convert.js
spicetify apply
echo "Done!"
