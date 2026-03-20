import {
  COUNTRY_CODES,
  IS_PRIVATE,
  TREE_NODE_BASE_HEIGHT,
} from './settings.js';

export const TREE_KEYMAP = {};
export const TREE_FIDMAP = {};

/**
 * Get lifespan information from given nodeData.
 * @param {Object} nodeData - Contains living, birthDate, and deathDate data.
 * @return {string} Formatted lifespan string.
 */
const getRelativeDates = function(nodeData, isPrivate) {
  if (nodeData.useNonePhoto) {
    return "";
  }

  const separator = ' — ';
  const { living, birthDate, marriageDate, deathDate } = nodeData;

  let rawAge = calculateAge(birthDate, deathDate)
  let age = rawAge;

  const birthYear = formatDate(nodeData.birthDate, isPrivate && nodeData.living);
  const marriageYear = formatDate(nodeData.marriageDate, isPrivate && nodeData.living);
  const deathYear = formatDate(nodeData.deathDate, false);

  // If both birthYear and deathYear do not exist, return
  // "Living" or "Deceased" based on the living flag.
  if (!birthYear && !deathYear && !marriageYear) {
    return living ? 'Living' : 'Deceased';
  }

  // If birthYear does not exist, return the
  // formatted deathYear with a separator.
  if (!birthYear) {
    let age = (nodeData.deathAge) ? ` (${nodeData.deathAge})` : '';

    if (!marriageYear) {
      return `${separator}${deathYear}${age}`;
    }
    if (!deathYear) {
      return `${separator}${marriageYear}${separator}${living ? 'Living' : 'Deceased'}${age}`;
    }
    return `${separator}${marriageYear}${separator}${deathYear}${age}`;
  }

  // Do not show negative ages
  // or null ages
  if (age < 0 || age == null) {
    age = "NaN";
  }

  // If deathYear does not exist, return the formatted
  // `birthYear` with a separator and "Living" or "Deceased"
  // based on the living flag.
  if (!deathYear) {
    if (nodeData.deathAge) {
      age = nodeData.deathAge;
    }

    if (String(age).includes("NaN")) {
      if (!marriageYear) {
        return `${birthYear}${separator}${living ? 'Living' : 'Deceased'}`;
      } else {
        return `${birthYear}${separator}${marriageYear}${separator}${living ? 'Living' : 'Deceased'}`;
      }
    }
    if (!marriageYear) {
      return `${birthYear}${separator}${living ? 'Living' : 'Deceased'}` + (living ? ` (${age})` : '');
    } else {
      return `${birthYear}${separator}${marriageYear}${separator}${living ? 'Living' : 'Deceased'}` + (living ? ` (${age})` : '');
    }
  }

  if (deathDate.includes('after')) {
    if (birthDate.includes('after')) {
      age = `~${rawAge}`;
    } else if (birthDate.includes('before')) {
      age = `${rawAge}+`;
    } else if (birthDate.includes('about')) {
      age = `${rawAge}+`;
    } else {
      age = `${rawAge}+`;
    }
  } else if (deathDate.includes('before')) {
    if (birthDate.includes('after')) {
      age = `${rawAge}-`;
    } else if (birthDate.includes('before')) {
      age = `~${rawAge}`;
    } else if (birthDate.includes('about')) {
      age = `${rawAge}-`;
    } else {
      age = `${rawAge}-`;
    }
  } else if (deathDate.includes('about')) {
    age = `~${rawAge}`;
  } else {
    if (birthDate.includes('after')) {
      age = `${rawAge}-`;
    } else if (birthDate.includes('before')) {
      age = `${rawAge}+`;
    } else if (birthDate.includes('about')) {
      age = `~${rawAge}`;
    }
  }

  if (nodeData.deathAge) {
    age = nodeData.deathAge;
  }

  if (String(age).includes("NaN")) {
    if (!marriageYear) {
      return `${birthYear}${separator}${deathYear}`;
    } else {
      return `${birthYear}${separator}${marriageYear}${separator}${deathYear}`;
    }
  }

  // If both birthYear and deathYear exist,
  // return the formatted lifespan string.
  if (!marriageYear) {
    return `${birthYear}${separator}${deathYear} (${age})`;
  } else {
    return `${birthYear}${separator}${marriageYear}${separator}${deathYear} (${age})`;
  }
}

/**
 * Converts country codes in the input string to their full country names.
 *
 * @param {string|null|undefined} input - The input string potentially containing a country code.
 * @returns {string|null|undefined} - The input with country codes replaced by full country names.
 */
const convertCountryCode = function(input) {
  if (!input) {
    return input;
  }

  const segments = input.split(',').map(segment => segment.trim());
  if (input.length < 37) {
    segments[segments.length - 1] = COUNTRY_CODES[segments[segments.length - 1]];
  }

  let output = segments.join(', ');
  if (output.length >= 44 && output.toLowerCase().includes("south caloocan")) {
    output = output.replace("South Caloocan", "S. Caloocan");
  }

  return output;
}

/**
 * Calculates the age based on the birth date and optionally the death date.
 * If the death date is not provided, the current date is used.
 *
 * @param {string} birthDateString - The birth date in a string format.
 * @param {string} [deathDateString] - The optional death date in a string format.
 * @returns {number} - The calculated age.
 */
export const calculateAge = function(birthDateString, deathDateString) {
  const age = _getExactAge(birthDateString, deathDateString);

  if (age.value == null) {
    return null;
  }

  if (age.unit == 'years') {
    return age.value;
  }
  return `${age.value} ${age.unit}`;
}

function _getExactAge(birthDateString, currentDateString) {
  const birth = new Date(birthDateString);
  const now = currentDateString ? new Date(currentDateString) : new Date();

  if (birth > now) {
    throw new Error('Birth date cannot be in the future');
  }

  // Calculate years
  let years = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    years--;
  }

  // If 2+ years old, return years
  if (years >= 2) {
    return { value: years, unit: 'years' };
  }

  // Calculate total months
  let months = (now.getFullYear() - birth.getFullYear()) * 12;
  months += now.getMonth() - birth.getMonth();
  if (now.getDate() < birth.getDate()) {
    months--;
  }

  // If 2+ months old, return months
  if (months >= 2) {
    return { value: months, unit: 'months' };
  }

  // Otherwise return days
  const diffTime = Math.abs(now - birth);
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return { value: days, unit: 'days' };
}

/**
 * Format date string as 'day month year'.
 * @param {string} dateString - Date in 'YYYY-MM-DD' format.
 * @return {string|null} Formatted date or null if dateString is falsy.
 */
const formatDate = function(raw, isPrivate, noDay) {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const longMonths = [
    'January', 'February', 'March',
    'April', 'May', 'June', 'July',
    'August', 'September', 'October',
    'November', 'December',
  ];

  if (!raw) {
    return null;
  }

  if (raw.includes("from ") && raw.includes(" to ")) {
    return raw;
  }

  // Check for prefix words
  let [prefix, dateString] = raw.includes(' ') ? raw.split(' ') : ["", raw];
  let [year, month, day] = dateString.split('-', 3);

  // Add a separating space for prefix if its populated
  if (prefix != '') {
    prefix += ' ';
  }

  if (month && !isPrivate) {
    day = (day === undefined) ? "" : day + " ";

    // Remove leading zero from days
    if (day.startsWith('0')) {
      day = day.slice(1);
    }

    if (!noDay) {
      return `${prefix}${day}${months[parseInt(month, 10) - 1]} ${year}`;
    }
    return `${prefix}${months[parseInt(month, 10) - 1]} ${year}`;
  }

  return `${prefix}${year}`;
};

for (const [i, person] of Object.entries(TREE_DATA)) {
  // =======================================================================
  // Add "parent" from "child" value since chart.js works that way
  // =======================================================================
  if (TREE_DATA[i]["child"]) {
    TREE_DATA[i]["parent"] = TREE_DATA[i]["child"];
  }

  // Initialize detailsRow fields if not already set
  TREE_DATA[i]['detailsRow1'] = TREE_DATA[i]['detailsRow1'] || {};
  TREE_DATA[i]['detailsRow2'] = TREE_DATA[i]['detailsRow2'] || {};
  TREE_DATA[i]['detailsRow3'] = TREE_DATA[i]['detailsRow3'] || {};
  TREE_DATA[i]['detailsRow4'] = TREE_DATA[i]['detailsRow4'] || {};

  if (person.firstName == undefined) {
    continue;
  }

  let nodeData = TREE_DATA[i];

  // =======================================================================
  // Auto-fill story marker
  // =======================================================================
  if (!(IS_PRIVATE && person.living)) {
    let counter = 0;
    if (person.marker4) {
      counter = 4;
    } else if (person.marker3) {
      counter = 4;
    } else if (person.marker2) {
      counter = 3;
    } else if (person.marker && person.hasDNA) {
      counter = 3;
    } else if (person.marker && !person.hasDNA) {
      counter = 2;
    } else if (!person.marker && person.hasDNA) {
      counter = 2;
    } else {
      counter = 1;
    }

    if (counter == 1) {
      counter = '';
    }
    TREE_DATA[i][`hasStories`] = true;
  }
  TREE_DATA[i][`hasStories`] = true;

  // =======================================================================
  // Add "fullName" to each person
  // =======================================================================
  let middleInitialsArray  = ((!person.middleName) ? '' : person.middleName).trim().split(' ');
  let middleInitialsString = '';

  if (middleInitialsArray[0] != '') {
    for (let i = 0; i < middleInitialsArray.length; i++) {
      middleInitialsString += middleInitialsArray[i][0] + '. '
    }
  }

  let prefix = '';
  let suffix = '';

  if (!!person.prefix) prefix = `${person.prefix} `;
  if (!!person.suffix) suffix = ` ${person.suffix}`;

  let firstName = person.firstName;
  let nickname = (!person.nickname) ? '' : `"${person.nickname}" `;
  if (IS_PRIVATE && person.living) {
    nickname = '';
  }

  TREE_DATA[i]['basicName'] = (
    firstName +
    ((!person.lastName) ? '' : ` ${person.lastName}`) +
    suffix
  );

  TREE_DATA[i]['fullName'] = (
    prefix +
    firstName + ' ' +
    nickname +
    middleInitialsString +
    ((!person.lastName) ? '' : person.lastName) +
    suffix
  );

  TREE_DATA[i]['fullNamePrefixless'] = (
    firstName + ' ' +
    nickname +
    middleInitialsString +
    ((!person.lastName) ? '' : person.lastName) +
    suffix
  );

  // =======================================================================
  // Improve locations and make living the death place for easier UI change
  // =======================================================================
  TREE_DATA[i]['birthPlace'] = convertCountryCode(person.birthPlace);
  TREE_DATA[i]['marriagePlace'] = convertCountryCode(person.marriagePlace);
  TREE_DATA[i]['deathPlace'] = convertCountryCode(person.deathPlace);
  TREE_DATA[i]['livingPlace'] = convertCountryCode(person.livingPlace);

  // Replace death place with living place for quicker size changes
  if (person.living) {
    TREE_DATA[i]['deathPlace'] = person.livingPlace;
  }

  // =======================================================================
  // Add details to each person
  // =======================================================================
  let birthUsed = false;
  let deathUsed = false;
  let marriageUsed = false;

  const separator = ' — ';

  TREE_DATA[i]['detailsRow1'] = {
    'text': getRelativeDates(person, IS_PRIVATE),
    'letter': null,
  }

  if (person.birthPlace != null && !birthUsed) {
    birthUsed = true;
    TREE_DATA[i]['detailsRow2']['text'] = `${person.birthPlace}`;
    TREE_DATA[i]['detailsRow2']['letter'] = 'B';
  } else {
    TREE_DATA[i]['detailsRow2']['text'] = '';
    TREE_DATA[i]['detailsRow2']['letter'] = '';
  }

  if (person.marriagePlace != null && !marriageUsed) {
    marriageUsed = true;

    if (!birthUsed) {
      TREE_DATA[i]['detailsRow2']['text'] = `${person.marriagePlace}`;
      TREE_DATA[i]['detailsRow2']['letter'] = 'M';
    } else {
      TREE_DATA[i]['detailsRow3']['text'] = `${person.marriagePlace}`;
      TREE_DATA[i]['detailsRow3']['letter'] = 'M';
    }
  } else {
    TREE_DATA[i]['detailsRow3']['text'] = '';
    TREE_DATA[i]['detailsRow3']['letter'] = '';
  }

  if (((person.deathPlace != null || person.living)) && !deathUsed) {
    deathUsed = true;

    if (!birthUsed) {
      TREE_DATA[i]['detailsRow2']['text'] = `${person.deathPlace}`;
      TREE_DATA[i]['detailsRow2']['letter'] = (person.living) ? 'L' : 'D';
    } else if (!marriageUsed) {
      TREE_DATA[i]['detailsRow3']['text'] = `${person.deathPlace}`;
      TREE_DATA[i]['detailsRow3']['letter'] = (person.living) ? 'L' : 'D';
    } else {
      TREE_DATA[i]['detailsRow4']['text'] = `${person.deathPlace}`;
      TREE_DATA[i]['detailsRow4']['letter'] = (person.living) ? 'L' : 'D';
    }
  } else {
    TREE_DATA[i]['detailsRow4']['text'] = '';
    TREE_DATA[i]['detailsRow4']['letter'] = '';
  }
}

function addGeneration(data) {
    // Create a map to easily find each person by their key
    data.forEach(person => {
        TREE_KEYMAP[person.key] = person;
        TREE_FIDMAP[person.fid] = person;
        person.generation = 0; // Default generation, will be adjusted later
    });

    // Function to update the generation for a person and their ancestors
    function updateGeneration(key, generation) {
        if (TREE_KEYMAP[key]) {
            TREE_KEYMAP[key].generation = generation;
            data.filter(person => person.child === key).forEach(child => {
                updateGeneration(child.key, generation + 1);
            });
        }
    }

    // Start from the root nodes and update their generations
    data.filter(person => !person.child).forEach(root => {
        updateGeneration(root.key, 0);
    });
}

addGeneration(TREE_DATA);

// Create a map of child to parents and the FamilySearch keys to MacFamilyTree IDs
var treeToFid = {};
var childToParents = {};
TREE_DATA.forEach(node => {
  treeToFid[node.key] = node.fid;
  if (node.child) {
    if (childToParents[node.child]) {
      childToParents[node.child].push(node.key);
    } else {
      childToParents[node.child] = [node.key];
    }
  }
});

// Add partner to each node.
TREE_DATA.forEach(node => {
  node.partner = null; // Default value
  if (node.child && childToParents[node.child] && childToParents[node.child].length > 1) {
    node.partner = childToParents[node.child].find(parentKey => parentKey !== node.key);
  }
});
