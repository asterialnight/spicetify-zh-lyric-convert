import * as OpenCC from 'opencc-js';

const converterTW = OpenCC.Converter({ from: 'tw', to: 'cn' });
const converterHK = OpenCC.Converter({ from: 'hk', to: 'cn' });

function convert(text: string): string {
  return converterHK(converterTW(text));
}

const SETTINGS_KEY = 'zh-convert-keep-metadata';
let keepMetadata = Spicetify.LocalStorage.get(SETTINGS_KEY) === 'true';

function isLyrics(el: Element): boolean {
  return !!el.closest('[class*="lyric"],[class*="lyrics"],[data-testid*="lyric"]');
}

function isSearchContainer(el: Element): boolean {
  return !!el.closest('[data-testid="playlist-tracklist-search-input-container"], [data-testid="search-input"], [class*="SearchInputContainer"], [class*="filterRow"]');
}

function convertElement(el: Element): void {
  if (isSearchContainer(el)) return;
  if (el.children.length === 0 && el.textContent?.trim()) {
    if (isLyrics(el) || !keepMetadata) {
      const converted = convert(el.textContent);
      if (converted !== el.textContent) {
        el.textContent = converted;
      }
    }
  }
}

function convertAll(root: Element): void {
  observer.disconnect();
  root.querySelectorAll('*').forEach(el => convertElement(el));
  observer.observe(document.body, { childList: true, subtree: true });
}

const observer = new MutationObserver((mutations) => {
  const addedNodes: Element[] = [];
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        addedNodes.push(node as Element);
      }
    }
  }
  if (addedNodes.length === 0) return;
  observer.disconnect();
  addedNodes.forEach(node => {
    if (!isSearchContainer(node)) {
      convertElement(node);
      convertAll(node);
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
});

observer.observe(document.body, { childList: true, subtree: true });
convertAll(document.body);

function createDropdown(): HTMLElement {
  const dropdown = document.createElement('div');
  dropdown.id = 'zh-convert-dropdown';
  dropdown.style.cssText = `
    position: fixed; top: 50px; left: 120px;
    background: #282828; border-radius: 8px; padding: 12px 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.5); z-index: 99999;
    display: none; min-width: 280px;
  `;

  const row = document.createElement('div');
  row.style.cssText = `display: flex; align-items: center; justify-content: space-between; gap: 16px;`;

  const label = document.createElement('span');
  label.textContent = '保留歌手/专辑/歌曲名繁体';
  label.style.cssText = `color: #fff; font-size: 13px;`;

  const toggle = document.createElement('div');
  toggle.style.cssText = `
    width: 40px; height: 22px; border-radius: 11px;
    background: ${keepMetadata ? '#1db954' : '#727272'};
    cursor: pointer; position: relative; transition: background 0.2s; flex-shrink: 0;
  `;

  const knob = document.createElement('div');
  knob.style.cssText = `
    width: 18px; height: 18px; border-radius: 50%; background: #fff;
    position: absolute; top: 2px; left: ${keepMetadata ? '20px' : '2px'}; transition: left 0.2s;
  `;

  toggle.appendChild(knob);
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    keepMetadata = !keepMetadata;
    Spicetify.LocalStorage.set(SETTINGS_KEY, String(keepMetadata));
    toggle.style.background = keepMetadata ? '#1db954' : '#727272';
    knob.style.left = keepMetadata ? '20px' : '2px';
    convertAll(document.body);
  });

  const disclaimer = document.createElement('p');
  disclaimer.textContent = '* 部分内容可能需要刷新页面后生效';
  disclaimer.style.cssText = `color: #b3b3b3; font-size: 11px; margin: 8px 0 0 0;`;

  row.appendChild(label);
  row.appendChild(toggle);
  dropdown.appendChild(row);
  dropdown.appendChild(disclaimer);
  document.body.appendChild(dropdown);

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target as Node)) {
      dropdown.style.display = 'none';
    }
  });

  return dropdown;
}

async function waitForSpicetify(): Promise<void> {
  while (!(Spicetify as any)?.Topbar?.Button) {
    await new Promise(r => setTimeout(r, 300));
  }

  const dropdown = createDropdown();
  const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><text x="12" y="18" font-size="18" fill="currentColor" font-family="sans-serif" text-anchor="middle">文</text></svg>`;
  const btn = new (Spicetify as any).Topbar.Button('中文转换', icon, () => {}, false);

  setTimeout(() => {
    const btnEl = btn.element;
    if (btnEl) {
      btnEl.addEventListener('click', (e: Event) => {
        e.stopPropagation();
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
      });
    }
  }, 1000);
}

waitForSpicetify();
