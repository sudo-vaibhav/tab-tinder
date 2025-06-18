Tab Tinder

A Chrome extension that brings Tinder-style swiping to browser tab management. Swipe left to close tabs, swipe right to keep them - it's Tinder for your browser tabs!

Features

- Swipe Interface: Navigate through your open tabs one by one
- Keyboard Controls: Use arrow keys to quickly decide on tabs
  - Left Arrow = Close Tab
  - Right Arrow = Keep Tab
- Tab Information: See tab titles, URLs, and favicons
- Progress Tracking: Counter shows current position in tab stack
- Session Summary: View how many tabs were closed vs kept

Installation

1. Clone this repository or download the files
2. Open Chrome and navigate to chrome://extensions/
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory
5. The Tab Tinder icon will appear in your extensions toolbar

Usage

1. Click the Tab Tinder extension icon in your toolbar
2. Click "Start Swiping" to begin
3. Review each tab:
   - Press left arrow to close the tab
   - Press right arrow to keep the tab
4. Continue until all tabs are reviewed
5. See your cleanup summary and optionally start again

How It Works

The extension uses Chrome's tabs API to:
- Query all open tabs in your browser
- Display tab information including title, URL, and favicon
- Close tabs based on your swiping decisions

Files

- manifest.json - Extension configuration and permissions
- popup.html - Main UI with three screens (start, swipe, complete)
- popup.js - Core logic for tab management and user interactions

Permissions

- tabs - Access to browser tabs for querying and closing

Browser Compatibility

This extension is designed for Chrome and Chromium-based browsers with Manifest V3 support.