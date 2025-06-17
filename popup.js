class TabTinder {
  constructor() {
    this.tabs = [];
    this.currentIndex = 0;
    this.closedCount = 0;
    this.keptCount = 0;
    this.init();
  }

  async init() {
    await this.loadTabs();
    this.setupEventListeners();
  }

  async loadTabs() {
    try {
      this.tabs = await chrome.tabs.query({});
      // Exclude the current popup tab
      this.tabs = this.tabs.filter(tab => !tab.url.startsWith('chrome-extension://'));
    } catch (error) {
      console.error('Error loading tabs:', error);
    }
  }

  setupEventListeners() {
    document.getElementById('start-btn').addEventListener('click', () => {
      this.startSwiping();
    });

    document.getElementById('restart-btn').addEventListener('click', () => {
      this.restart();
    });

    document.addEventListener('keydown', (event) => {
      if (this.isSwipeScreenActive()) {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          this.closeCurrentTab();
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          this.keepCurrentTab();
        }
      }
    });
  }

  startSwiping() {
    if (this.tabs.length === 0) {
      this.showComplete();
      return;
    }

    this.showScreen('swipe-screen');
    this.showCurrentTab();
  }

  async showCurrentTab() {
    if (this.currentIndex >= this.tabs.length) {
      this.showComplete();
      return;
    }

    const tab = this.tabs[this.currentIndex];
    
    // Update title and URL
    const titleElement = document.getElementById('tab-title').querySelector('span');
    titleElement.textContent = tab.title || 'Untitled';
    document.getElementById('tab-url').textContent = tab.url;
    document.getElementById('counter').textContent = `${this.currentIndex + 1} / ${this.tabs.length}`;
    
    // Show favicon if available
    const faviconImg = document.getElementById('tab-favicon');
    if (tab.favIconUrl && !tab.favIconUrl.startsWith('chrome://')) {
      faviconImg.src = tab.favIconUrl;
      faviconImg.style.display = 'inline';
    } else {
      faviconImg.style.display = 'none';
    }
    
  }

  async closeCurrentTab() {
    if (this.currentIndex >= this.tabs.length) return;

    const tab = this.tabs[this.currentIndex];
    try {
      await chrome.tabs.remove(tab.id);
      this.closedCount++;
    } catch (error) {
      console.error('Error closing tab:', error);
    }

    this.nextTab();
  }

  keepCurrentTab() {
    if (this.currentIndex >= this.tabs.length) return;
    
    this.keptCount++;
    this.nextTab();
  }

  nextTab() {
    this.currentIndex++;
    this.showCurrentTab();
  }

  showComplete() {
    this.showScreen('complete-screen');
    const message = `Closed ${this.closedCount} tabs, kept ${this.keptCount} tabs.`;
    document.getElementById('summary').textContent = message;
  }

  restart() {
    this.currentIndex = 0;
    this.closedCount = 0;
    this.keptCount = 0;
    this.loadTabs().then(() => {
      this.showScreen('start-screen');
    });
  }

  showScreen(screenId) {
    const screens = ['start-screen', 'swipe-screen', 'complete-screen'];
    screens.forEach(screen => {
      const element = document.getElementById(screen);
      if (screen === screenId) {
        element.classList.remove('hidden');
      } else {
        element.classList.add('hidden');
      }
    });
  }

  isSwipeScreenActive() {
    return !document.getElementById('swipe-screen').classList.contains('hidden');
  }
}

// Initialize the app when the popup loads
document.addEventListener('DOMContentLoaded', () => {
  new TabTinder();
});