// Create a map of child to parents.
var childToParents = {};
TREE_DATA.forEach(node => {
  if (node.child) {
    if (childToParents[node.child]) {
      childToParents[node.child].push(node.key);
    } else {
      childToParents[node.child] = [node.key];
    }
  }
});

var ME_PERSON_ID = 'G2S2-FTC';
var COMMON_PERSON_ID = 'GQJK-G8W';

var NEW_DATA = [
  { key: 'TEMP-010',                                      firstName: 'aesthetic',      nickname: null,    middleName: null,            lastName: 'person',      gender: '',  birthDate: null,         marriageDate: null,         deathDate: null,               living: false, hasDNA: false, hasImage: false,  birthPlace: null,                       marriagePlace: null,                             livingPlace: null,                     deathPlace: null,                                height: 0, width: 0 },
    { key: ME_PERSON_ID,             child: 'TEMP-010',   firstName: 'Joshua Caleb',   nickname: null,    middleName: 'Acosta',        lastName: 'Ignacio',     gender: 'M', birthDate: '2004-08-01', marriageDate: null,         deathDate: null,               living: true,  hasDNA: false, hasImage: true,   birthPlace: 'Poblacion, Caloocan, PHL', marriagePlace: null,                             livingPlace: 'Magdalena, Laguna, PHL', deathPlace: null,                                },
      { key: 'GHB5-KJ8',             child: ME_PERSON_ID, firstName: 'Larry',          nickname: null,    middleName: 'Calilong',      lastName: 'Ignacio',     gender: 'M', birthDate: '1971-05-10', marriageDate: '2003-02-03', deathDate: null,               living: true,  hasDNA: false, hasImage: true,   birthPlace: 'Manila, PHL',              marriagePlace: 'City Hall, Ermita, Manila, PHL', livingPlace: 'Magdalena, Laguna, PHL', deathPlace: null,                                marker: 'church' },
        { key: 'GHBP-BWB',           child: 'GHB5-KJ8',   firstName: 'Lorenzo',        nickname: null,    middleName: 'Ventura',       lastName: 'Ignacio',     gender: 'M', birthDate: null,         marriageDate: null,         deathDate: 'after 1970-07-10', living: false, hasDNA: false, hasImage: true,   birthPlace: null,                       marriagePlace: null,                             livingPlace: null,                     deathPlace: 'Tondo, Manila, PHL',                },
        { key: 'GHB5-Q4S',           child: 'GHB5-KJ8',   firstName: 'Teresita',       nickname: null,    middleName: 'Go',            lastName: 'Calilong',    gender: 'F', birthDate: '1952-09-28', marriageDate: null,         deathDate: null,               living: true,  hasDNA: false, hasImage: true,   birthPlace: null,                       marriagePlace: null,                             livingPlace: 'Tondo, Manila, PHL',     deathPlace: null,                                marker: 'housewife' },
          { key: 'G2SW-JY7',         child: 'GHB5-Q4S',   firstName: 'Juanito',        nickname: null,    middleName: null,            lastName: 'Calilong',    gender: 'M', birthDate: 'about 1930', marriageDate: null,         deathDate: 'after 1951-12-26', living: false, hasDNA: false, hasImage: false,  birthPlace: null,                       marriagePlace: null,                             livingPlace: null,                     deathPlace: null,                                },
            { key: 'G2SW-N13',       child: 'G2SW-JY7',   firstName: 'Gelacio',        nickname: null,    middleName: null,            lastName: 'Calilong',    gender: 'M', birthDate: null,         marriageDate: null,         deathDate: null,               living: false, hasDNA: false, hasImage: false,  birthPlace: null,                       marriagePlace: null,                             livingPlace: null,                     deathPlace: null,                                },
            { key: 'G2SW-LZQ',       child: 'G2SW-JY7',   firstName: 'Brigida',        nickname: null,    middleName: null,            lastName: 'Tiro',        gender: 'F', birthDate: null,         marriageDate: null,         deathDate: null,               living: false, hasDNA: false, hasImage: false,  birthPlace: null,                       marriagePlace: null,                             livingPlace: null,                     deathPlace: null,                                },
          { key: 'G2SW-4NR',         child: 'GHB5-Q4S',   firstName: 'Nenita',         nickname: null,    middleName: null,            lastName: 'Go',          gender: 'F', birthDate: 'about 1934', marriageDate: null,         deathDate: 'after 1952-09-28', living: false, hasDNA: false, hasImage: false,  birthPlace: null,                       marriagePlace: null,                             livingPlace: null,                     deathPlace: null,                                },
            { key: 'G2SW-LZC',       child: 'G2SW-4NR',   firstName: 'Mauro',          nickname: null,    middleName: null,            lastName: 'Go',          gender: 'M', birthDate: null,         marriageDate: null,         deathDate: null,               living: false, hasDNA: false, hasImage: false,  birthPlace: null,                       marriagePlace: null,                             livingPlace: null,                     deathPlace: null,                                },
            { key: 'G2SW-47C',       child: 'G2SW-4NR',   firstName: 'Natividad',      nickname: null,    middleName: null,            lastName: 'Litua',       gender: 'F', birthDate: null,         marriageDate: null,         deathDate: null,               living: false, hasDNA: false, hasImage: false,  birthPlace: null,                       marriagePlace: null,                             livingPlace: null,                     deathPlace: null,                                },
];

get_all_descendants(COMMON_PERSON_ID, childToParents).forEach(person_id => {
  for (let i = 0; i < TREE_DATA.length; i++) {
    let node = TREE_DATA[i];

    if (node.key == COMMON_PERSON_ID) {
      TREE_DATA[i]["child"] = ME_PERSON_ID;
    }

    if (person_id === node.key) {
      NEW_DATA.push(node);
      break;
    }
  }
});

TREE_DATA = NEW_DATA;
