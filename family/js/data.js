var ME_PERSON_ID = 'G2S2-FTC';
var COMMON_PERSON_ID = 'GQJK-G8W';

var NEW_DATA = [
  { key: 'TEMP-010',                                                                                                                         gender: '',  birthDate: null,         deathDate: null,               living: false, hasDNA: false, hasImage: false,  birthPlace: null,                                deathPlace: null,                                height: 0, width: 0 },
    { key: ME_PERSON_ID,             child: 'TEMP-010',   firstName: 'Joshua Caleb',       middleName: 'Acosta',      lastName: 'Ignacio',     gender: 'F', birthDate: '2008-08-01', deathDate: null,               living: true,  hasDNA: false, hasImage: true,   birthPlace: 'Poblacion, Caloocan, PHL',          deathPlace: null,                                },
      { key: 'GHB5-KJ8',             child: ME_PERSON_ID, firstName: 'Larry',              middleName: 'Calilong',    lastName: 'Ignacio',     gender: 'M', birthDate: '1971-05-10', deathDate: null,               living: true,  hasDNA: false, hasImage: true,   birthPlace: 'Manila, PHL',                       deathPlace: null,                                marker: 'church' },
        { key: 'GHBP-BWB',           child: 'GHB5-KJ8',   firstName: 'Lorenzo',            middleName: 'Ventura',     lastName: 'Ignacio',     gender: 'M', birthDate: null,         deathDate: 'after 1970-07-10', living: false, hasDNA: false, hasImage: true,   birthPlace: null,                                deathPlace: 'Tondo, Manila, PHL',                },
        { key: 'GHB5-Q4S',           child: 'GHB5-KJ8',   firstName: 'Teresita',           middleName: 'Go',          lastName: 'Calilong',    gender: 'F', birthDate: '1952-09-28', deathDate: null,               living: true,  hasDNA: false, hasImage: true,   birthPlace: null,                                deathPlace: null,                                marker: 'housewife' },
          { key: 'G2SW-JY7',         child: 'GHB5-Q4S',   firstName: 'Juanito',            middleName: '',            lastName: 'Calilong',    gender: 'M', birthDate: 'about 1930', deathDate: 'after 1951-12-26', living: false, hasDNA: false, hasImage: false,  birthPlace: null,                                deathPlace: null,                                },
            { key: 'G2SW-N13',       child: 'G2SW-JY7',   firstName: 'Gelacio',            middleName: '',            lastName: 'Calilong',    gender: 'M', birthDate: null,         deathDate: null,               living: false, hasDNA: false, hasImage: false,  birthPlace: null,                                deathPlace: null,                                },
            { key: 'G2SW-LZQ',       child: 'G2SW-JY7',   firstName: 'Brigida',            middleName: '',            lastName: 'Tiro',        gender: 'F', birthDate: null,         deathDate: null,               living: false, hasDNA: false, hasImage: false,  birthPlace: null,                                deathPlace: null,                                },
          { key: 'G2SW-4NR',         child: 'GHB5-Q4S',   firstName: 'Nenita',             middleName: '',            lastName: 'Go',          gender: 'F', birthDate: 'about 1934', deathDate: 'after 1952-09-28', living: false, hasDNA: false, hasImage: false,  birthPlace: null,                                deathPlace: null,                                },
            { key: 'G2SW-LZC',       child: 'G2SW-4NR',   firstName: 'Mauro',              middleName: '',            lastName: 'Go',          gender: 'M', birthDate: null,         deathDate: null,               living: false, hasDNA: false, hasImage: false,  birthPlace: null,                                deathPlace: null,                                },
            { key: 'G2SW-47C',       child: 'G2SW-4NR',   firstName: 'Natividad',          middleName: '',            lastName: 'Litua',       gender: 'F', birthDate: null,         deathDate: null,               living: false, hasDNA: false, hasImage: false,  birthPlace: null,                                deathPlace: null,                                },
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
