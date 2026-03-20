import { MARKER_SYMBOLS } from './marker_symbols.js';
import { STORIES } from './stories.js';
import { TREE_KEYMAP } from './preprocess.js';
import {
  IS_DARK as isDark,
  IS_PRIVATE,
  MARKER_BACKGROUND_COLORS,
  MARKER_FOREGROUND_COLORS,
  MARKER_LABELS,
} from './settings.js';
import { encodeUtf8ToUrlSafeBase64 } from './url.js';

// requestIdleCallback polyfill (Safari)
const rIC = window.requestIdleCallback
  ? (fn) => window.requestIdleCallback(fn, { timeout: 2000 })
  : (fn) => setTimeout(fn, 1);

let _prebuildQueue = [];
let _prebuildScheduled = false;

function drainPrebuildQueue(deadline) {
  _prebuildScheduled = false;
  while (_prebuildQueue.length > 0 && deadline.timeRemaining() > 5) {
    const key = _prebuildQueue.shift();
    const data = TREE_KEYMAP[key];
    if (!data) continue;
    if (data.living && IS_PRIVATE) continue;
    if (document.getElementById('details-' + key)) continue;
    addPersonDetails({ key, data }, false);
  }
  if (_prebuildQueue.length > 0) {
    _prebuildScheduled = true;
    rIC(drainPrebuildQueue);
  }
}

function queueBackgroundPrebuild(currentNode) {
  const { father, mother, child, children, spouse } = currentNode.data;
  const relatives = [father, mother, spouse, child, ...(children || [])]
    .filter(k => k && k !== '__couple_point__' && k !== currentNode.key);

  const inQueue = new Set(_prebuildQueue);
  const allOthers = Object.keys(TREE_KEYMAP)
    .filter(k => k !== currentNode.key && !relatives.includes(k));

  const toAdd = [...relatives, ...allOthers].filter(k => !inQueue.has(k));
  _prebuildQueue.push(...toAdd);

  if (!_prebuildScheduled) {
    _prebuildScheduled = true;
    rIC(drainPrebuildQueue);
  }
}

export const startBackgroundPrebuild = () => {
  const inQueue = new Set(_prebuildQueue);
  const toAdd = Object.keys(TREE_KEYMAP).filter(k => !inQueue.has(k));
  _prebuildQueue.push(...toAdd);

  if (!_prebuildScheduled) {
    _prebuildScheduled = true;
    rIC(drainPrebuildQueue);
  }
};

// Function to handle the click event on a node and show the sidebar

function setScrollPos(selector, scroll) {
  var divs = document.querySelectorAll(selector);

  for (var p = 0; p < divs.length; p++) {
    // Reset the scroll position to the top-left corner
    divs[p].scrollTop = scroll;
  }
}

function addQueryParam(key, value) {
  const currentUrl = new URL(window.location);
  currentUrl.searchParams.set(key, value);
  window.history.replaceState({}, '', currentUrl);
}


let offcanvasInstance = null;

export const showSidebar = (node) => {
  if (node.data.living && IS_PRIVATE) {
    return;
  }

  // Check if the <div> for this node's details already exists
  var existingDiv = document.getElementById("details-" + node.key);

  // Hide all panels, then reveal the relevant one
  var sidebarContainer = document.getElementById("personDetailsDesc");
  Array.from(sidebarContainer.children).forEach(function(childDiv) {
    childDiv.classList.remove('sidebar-panel--visible');
  });

  updatePersonName(node);

  if (existingDiv) {
    existingDiv.classList.add('sidebar-panel--visible');
  } else {
    addPersonDetails(node, true);
  }

  queueBackgroundPrebuild(node);

  let encodedKey = encodeUtf8ToUrlSafeBase64(node.data.key);
  addQueryParam('id', encodedKey);

  // Reset scroll if a different person is clicked
  if (localStorage.getItem("family-tree-id") !== encodedKey) {
    setScrollPos("#personDetailsDesc", parseInt(localStorage.getItem(`family-tree-id-${encodedKey}-scroll`)));
  }

  var offcanvasElement = document.getElementById('personDetails');

  if (!offcanvasInstance) {
    offcanvasInstance = new Offcanvas(offcanvasElement);
  }

  if (isDark) {
    offcanvasElement.classList.add("text-bg-dark");
  } else {
    offcanvasElement.classList.remove("text-bg-dark");
  }

  const isVisible = offcanvasElement.classList.contains('show');
  offcanvasInstance.show();

  // Defer lightbox refresh until after the slide animation completes so it
  // doesn't block the opening transition. If the panel is already visible,
  // use rAF instead since the 'shown' event won't fire again.
  if (isVisible) {
    requestAnimationFrame(() => refreshFsLightbox());
  } else {
    offcanvasElement.addEventListener('shown.bs.offcanvas', () => refreshFsLightbox(), { once: true });
  }
}

function wrapImagesWithLightbox(htmlString, id) {
  // Replace all img tags with anchor-wrapped img tags
  return htmlString.replace(/<img\s+([^>]*src=["']([^"']+)["'][^>]*)>/gi, (match, imgAttributes, srcUrl) => {
    if (imgAttributes.includes('for-design')) {
      return `<img decoding="async" ${imgAttributes}>`;
    }
    return `<a data-fslightbox="${id}" href="${srcUrl.replace('lossy', 'lossless')}"><img decoding="async" ${imgAttributes}></a>`;
  });
}

function updatePersonName(node) {
  // Update the name in the sidebar
  const nodeTitle = document.getElementById("personName");
  nodeTitle.innerHTML = simulateSmallCaps(node.data.basicName);
}

function simulateSmallCaps(text) {
  return text.split(' ').map(word => {
    const firstLetter = word.charAt(0);
    const laterLetters = word.slice(1);
    return `<span class="first-letter">${firstLetter}</span><span class="later-letters">${laterLetters}</span>`;
  }).join(' ');
}

function addPersonDetails(node, visible = true) {
  const nodeDescription = document.getElementById("personDetailsDesc");

  // If it doesn't exist, create a new div and insert it
  var newDiv = document.createElement("div");
  newDiv.id = "details-" + node.key;

  let headline = null;
  let headshotFilename = `${node.data.fid}.lossy.webp`;

  if (STORIES[node.data.fid]) {
    headline = STORIES[node.data.fid]['headline'] || null;
    if (headline) {
      headline = headline.replace(/\$\{([^}]+)\}/g, (match, attrName) => {
        return node.data[attrName] !== undefined ? node.data[attrName] : match;
      });
    }

    // Determine headshot to use
    if (STORIES[node.data.fid]['headshot']) {
      headshotFilename = STORIES[node.data.fid]['headshot'];
    }
    if (STORIES[node.data.fid]['headshotDark'] && isDark) {
      headshotFilename = STORIES[node.data.fid]['headshotDark'];
    } else if (STORIES[node.data.fid]['headshotLight'] && !isDark) {
      headshotFilename = STORIES[node.data.fid]['headshotLight'];
    }
  }

  // Update sidebar content
  let tempInnerHTML = '';
  let headlineInnerHTML = '';

  if ((node.data.hasImage || (STORIES[node.data.fid] && headshotFilename != `${node.data.fid}.lossy.webp`)) && node.data.fid !== undefined) {
    tempInnerHTML += wrapImagesWithLightbox(
      `<figure class="headshot"><div><img alt="headshot" src="images/people/${headshotFilename}" /></div></figure>`,
      node.data.fid,
    );
  }
  let hasBadges = false;


  if (headline) {
    tempInnerHTML += `<p class="headline">${headline}</p>`;
    tempInnerHTML += `<hr class="headshot-sep" />`;
  } else {
    let childNoun = (node.data.gender == "M") ? "Son" : "Daughter";
    let parentNoun = (node.data.gender == "M") ? "Father" : "Mother";

    if (node.data.father) {
      let fathersName = TREE_KEYMAP[node.data.father] && TREE_KEYMAP[node.data.father]['basicName'];
      if (fathersName && !fathersName.includes('nown')) {
        headlineInnerHTML += `${childNoun} of ${fathersName}`;
      }
    }
    if (node.data.mother) {
      let mothersName = TREE_KEYMAP[node.data.mother] && TREE_KEYMAP[node.data.mother]['basicName'];
      if (mothersName && !mothersName.includes('nown')) {
        if (headlineInnerHTML != '') {
          headlineInnerHTML += ` and ${mothersName}`;
        } else {
          headlineInnerHTML += `${childNoun} of ${mothersName}`;
        }
      }
    }
    if (node.data.child && node.data.child != '__couple_point__') {
      let childsName = TREE_KEYMAP[node.data.child] && TREE_KEYMAP[node.data.child]['basicName'];
      if (childsName && !childsName.includes('nown')) {
        if (headlineInnerHTML != '') {
          parentNoun = parentNoun.toLowerCase();
          if (headlineInnerHTML.includes(' and ')) {
            headlineInnerHTML += '. '
          } else {
            headlineInnerHTML += ' and '
          }
        }
        headlineInnerHTML += `${parentNoun} of ${childsName}`
      }
    } else if (node.data.children) {
      parentNoun = parentNoun.toLowerCase();

      if (headlineInnerHTML.includes(' and ')) {
        headlineInnerHTML += `. ${parentNoun} of `;

        for (let i = 0; i < node.data.children.length; i++) {
          let childsName = TREE_KEYMAP[node.data.children[i]]['basicName'];

          if (i === 0) {
            headlineInnerHTML += childsName;
          } else if (i === node.data.children.length - 1) {
            headlineInnerHTML += node.data.children.length > 2
              ? `, and ${childsName}`
              : ` and ${childsName}`;
          } else {
            headlineInnerHTML += `, ${childsName}`;
          }
        }
      }
    }

    if (headlineInnerHTML != '') {
      if (!headlineInnerHTML.endsWith('.')) {
        headlineInnerHTML += '.';
      }
      tempInnerHTML += `<p class="headline">${headlineInnerHTML}</p>`;
      tempInnerHTML += `<hr class="headshot-sep" />`;
    }
  }

  tempInnerHTML += '<div class="badges">'
  if (node.data.hasDNA) {
    tempInnerHTML += `
      <span class="badge rounded-pill story-marker" style="
        background: ${adjustBrightness(MARKER_BACKGROUND_COLORS.dna, 3 * (!isDark ? -1 : 1))};
        color: ${adjustBrightness(MARKER_FOREGROUND_COLORS.dna, 5 * (!isDark ? -1 : 1))};
      ">
        <img src=${MARKER_SYMBOLS['dna']} />
        ${MARKER_LABELS['dna']}
      </span>
    `
    hasBadges = true;
  }
  for (let i = 1; i <= 4; i++) {
    let markerKey = (i == 1) ? 'marker' : `marker${i}`;
    let marker = node.data[markerKey];
    let markerLabel = MARKER_LABELS[marker] ?? marker;
    if (marker !== undefined) {
      tempInnerHTML += `
        <span class="badge rounded-pill story-marker" style="
          background: ${adjustBrightness(MARKER_BACKGROUND_COLORS[marker], 3 * (!isDark ? -1 : 1))};
          color: ${adjustBrightness(MARKER_FOREGROUND_COLORS[marker], 5 * (!isDark ? -1 : 1))};
        ">
          <img src=${MARKER_SYMBOLS[marker]} />
          ${markerLabel}
        </span>
      `
      hasBadges = true;
    }
  }
  tempInnerHTML += '</div>'

  if (tempInnerHTML.endsWith('<div class="badges"></div>')) {
    tempInnerHTML = tempInnerHTML.replace('<div class="badges"></div>', '');
  }

  let story = '';
  if (STORIES[node.data.fid]) {
    if (STORIES[node.data.fid]['stories']) {
      story = wrapImagesWithLightbox(STORIES[node.data.fid]['stories'], node.data.fid);
      story = story.replace(/\$\{([^}]+)\}/g, (match, attrName) => {
        return node.data[attrName] !== undefined ? node.data[attrName] : match;
      });
    }
  }
  tempInnerHTML += story;

  if (headlineInnerHTML != '' && tempInnerHTML.endsWith('<hr class="headshot-sep" />')) {
    tempInnerHTML += '<p>No stories have been written about this person yet'
    if (!node.data.hasImage) {
      tempInnerHTML += ', and no photo is available'
    }
    tempInnerHTML += '.</p>'
  }

  // Add gravemarker if photo is indicated
  let graveStory = STORIES[node.data.fid]?.graveStory;
  graveStory = (graveStory === undefined) ? '' : `<p>${graveStory}</p>`;

  if (STORIES[node.data.fid] && STORIES[node.data.fid].gravemarker !== undefined) {
    let graveMarkerStory = `
      <hr />
      <h5>Grave Marker</h5>
      ${graveStory}
      <figure>
        <img alt="Grave Marker photo" src="images/gravemarkers/${STORIES[node.data.fid].gravemarker}" />
        <p class="caption"><em>${node.data.basicName}'s grave marker photo.</em></p>
      </figure>
    `;
    tempInnerHTML += wrapImagesWithLightbox(graveMarkerStory, node.data.fid);
  }

  if (
    STORIES[node.data.fid] &&
    STORIES[node.data.fid]['sources'] &&
    Object.keys(STORIES[node.data.fid]['sources']).length !== 0
  ) {
    let sources = STORIES[node.data.fid]['sources'];
    let sourceHTML = '';

    sourceHTML += `
      <hr />
      <h5>Verification of Vital Information</h5>
    `
    sourceHTML += '<table class="source-table">';
    sourceHTML += '<thead><tr"><th>Info</th><th>Sources / Basis</th></tr></thead><tbody>';
    for (const [key, value] of Object.entries(sources)) {
      const capsules = value
        .split(';')
        .map(item => `<span class="source-item">${item.trim()}</span>`)
        .join('<br />');
      sourceHTML += `<tr><td><span class="source-item">${key}</span></td><td>${capsules}</td></"tr>`;
    }
    sourceHTML += '</tbody></table>';

    if (
      sourceHTML.includes('ersonally') ||
      sourceHTML.includes('irsthand') ||
      sourceHTML.includes('elf record')
    ) {
      sourceHTML += '<p class="source-disclaimer"><em>"Personally", "Firsthand account", and "Self record" are currently all in the perspective of the family historian: Arbyn Acosta Argabioso.</em></p>';
    }
    if (sourceHTML.includes(' *')) {
      sourceHTML += '<p class="source-disclaimer"><em><span class="source-asterisk">*</span> – small difference between shown information and source / basis.</em></p>';
    }

    tempInnerHTML += sourceHTML;
  }

  // Insert the new div into the container; only mark visible if user-triggered
  newDiv.innerHTML = tempInnerHTML;
  if (visible) {
    newDiv.classList.add('sidebar-panel--visible');
  }
  nodeDescription.appendChild(newDiv);
}

function adjustBrightness(hex, percent) {
  // Ensure hex is a valid 6-digit hex code
  if (hex.length === 4) {
    hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  }

  let rgb = "#";

  for (let i = 1; i < 7; i += 2) {
    // Convert each color component to a decimal
    const component = parseInt(hex.substr(i, 2), 16);

    // Adjust brightness by the percentage provided
    const adjusted = Math.min(255, Math.max(0, Math.floor(component * (1 + percent / 100))));

    // Convert back to hex and ensure it's always two digits
    rgb += ("0" + adjusted.toString(16)).slice(-2);
  }

  return rgb;
}
