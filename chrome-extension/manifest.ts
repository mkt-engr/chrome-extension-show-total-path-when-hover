import { readFileSync } from 'node:fs';

const packageJson = JSON.parse(readFileSync('../package.json', 'utf8'));

const manifest = {
  manifest_version: 3,
  default_locale: 'en',
  /**
   * if you want to support multiple languages, you can use the following reference
   * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Internationalization
   */
  name: '__MSG_extensionName__',
  /**
   * Must be unique to your extension to upload to addons.mozilla.org
   * (you can delete if you only want a chrome extension)
   */
  browser_specific_settings: {
    gecko: {
      id: 'example@example.com',
      strict_min_version: '109.0',
    },
  },
  version: packageJson.version,
  description: '__MSG_extensionDescription__',
  host_permissions: ['<all_urls>'],
  // Firefox doesn't support sidePanel (It will be deleted in manifest parser)
  permissions: [
    'storage',
    'scripting',
    'tabs',
    'notifications',
    'sidePanel',
    /**
     * URLの変更を検知する
     *
     * @see {@link https://developer.chrome.com/docs/extensions/reference/webNavigation}
     * @see {@link https://stackoverflow.com/questions/4646360/monitoring-history-pushstate-from-a-chrome-extension/9651737}
     */
    'webNavigation', //
  ],
  options_page: 'options/index.html',
  background: {
    service_worker: 'background.js',
    type: 'module',
  },
  action: {
    default_popup: 'popup/index.html',
    default_icon: 'icon-34.png',
  },
  chrome_url_overrides: {
    newtab: 'new-tab/index.html',
  },
  icons: {
    128: 'icon-128.png',
  },
  content_scripts: [
    {
      // matches: ['http://*/*', 'https://*/*', '<all_urls>'],
      matches: ['https://github.com/*'],
      js: ['content/index.iife.js'],
    },
    {
      // matches: ['http://*/*', 'https://*/*', '<all_urls>'],
      matches: ['https://github.com/*'],
      js: ['content-ui/index.iife.js'],
    },
    {
      // matches: ['http://*/*', 'https://*/*', '<all_urls>'],
      matches: ['https://github.com/*'],
      css: ['content.css'], // public folder
    },
  ],
  devtools_page: 'devtools/index.html',
  web_accessible_resources: [
    {
      resources: ['*.js', '*.css', '*.svg', 'icon-128.png', 'icon-34.png'],
      matches: ['*://*/*'],
    },
  ],
  side_panel: {
    default_path: 'side-panel/index.html',
  },
} satisfies chrome.runtime.ManifestV3;

export default manifest;
