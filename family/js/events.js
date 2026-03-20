import { TREE_KEYMAP } from './preprocess.js';
import { showSidebar, startBackgroundPrebuild } from './sidebar.js';
import { decodeUrlSafeBase64ToUtf8 } from './url.js';

function removeQueryParam(key) {
  const currentUrl = new URL(window.location);
  currentUrl.searchParams.delete(key);
  window.history.replaceState({}, '', currentUrl);
}

window.onload = () => {
  // Loop through all localStorage keys
  for (let i = 0; i < localStorage.length; i++) {
      // Get the key name
      let key = localStorage.key(i);

      // Check if the key starts with "family-tree-"
      if (key && key.startsWith('family-tree-')) {
          // Remove the key from localStorage
          localStorage.removeItem(key);
          // Since we've removed an item, adjust the index to account for the shift in the keys
          i--;
      }
  }

  let Id = window.location.get("id");
  if (Id) {
    let decodedId = decodeUrlSafeBase64ToUtf8(Id);

    if (TREE_KEYMAP[decodedId]) {
      let node = {'key': decodedId, 'data': TREE_KEYMAP[decodedId]}
      showSidebar(node);
    }
  }

  setTimeout(startBackgroundPrebuild, 1000);

  const closeButton = document.getElementById('personDetails');
  closeButton.addEventListener('hide.bs.offcanvas', () => {
    const encodedKey = window.location.get("id");
    const sidebarContainer = document.getElementById('personDetailsDesc');

    localStorage.setItem(`family-tree-id-${encodedKey}-scroll`, sidebarContainer.scrollTop);

    removeQueryParam('id');
  });
};
