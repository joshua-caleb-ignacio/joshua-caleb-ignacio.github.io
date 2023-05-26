var TREE_DATA = [
  { key: 'TEMP-010',                                                                                                                         gender: '',  birthDate: null,         deathDate: null,               living: false, hasDNA: false, hasImage: false,  birthPlace: null,                                deathPlace: null,                                height: 0, width: 0 },
    { key: 'G2S2-FTC',               child: 'TEMP-010', firstName: 'Joshua Caleb',       middleName: 'Acosta',      lastName: 'Ignacio',     gender: 'F', birthDate: '2008-08-01', deathDate: null,               living: true,  hasDNA: false, hasImage: true,   birthPlace: 'Poblacion, Caloocan, PHL',          deathPlace: null,                                },
      { key: 'GHB5-KJ8',             child: 'G2S2-FTC', firstName: 'Larry',              middleName: 'Calilong',    lastName: 'Ignacio',     gender: 'M', birthDate: '1971-05-10', deathDate: null,               living: true,  hasDNA: false, hasImage: true,   birthPlace: 'Manila, PHL',                       deathPlace: null,                                marker: 'church' },
        { key: 'GHBP-BWB',           child: 'GHB5-KJ8', firstName: 'Lorenzo',            middleName: 'Ventura',     lastName: 'Ignacio',     gender: 'M', birthDate: null,         deathDate: 'after 1970-07-10', living: false, hasDNA: false, hasImage: true,   birthPlace: null,                                deathPlace: 'Tondo, Manila, PHL',                },
        { key: 'GHB5-Q4S',           child: 'GHB5-KJ8', firstName: 'Teresita',           middleName: 'Go',          lastName: 'Calilong',    gender: 'F', birthDate: '1952-09-28', deathDate: null,               living: true,  hasDNA: false, hasImage: true,   birthPlace: null,                                deathPlace: null,                                marker: 'housewife' },
          { key: 'G2SW-JY7',         child: 'GHB5-Q4S', firstName: 'Juanito',            middleName: '',            lastName: 'Calilong',    gender: 'M', birthDate: 'about 1930', deathDate: 'after 1951-12-26', living: false, hasDNA: false, hasImage: false,  birthPlace: null,                                deathPlace: null,                                },
            { key: 'G2SW-N13',       child: 'G2SW-JY7', firstName: 'Gelacio',            middleName: '',            lastName: 'Calilong',    gender: 'M', birthDate: null,         deathDate: null,               living: false, hasDNA: false, hasImage: false,  birthPlace: null,                                deathPlace: null,                                },
            { key: 'G2SW-LZQ',       child: 'G2SW-JY7', firstName: 'Brigida',            middleName: '',            lastName: 'Tiro',        gender: 'F', birthDate: null,         deathDate: null,               living: false, hasDNA: false, hasImage: false,  birthPlace: null,                                deathPlace: null,                                },
          { key: 'G2SW-4NR',         child: 'GHB5-Q4S', firstName: 'Nenita',             middleName: '',            lastName: 'Go',          gender: 'F', birthDate: 'about 1934', deathDate: 'after 1952-09-28', living: false, hasDNA: false, hasImage: false,  birthPlace: null,                                deathPlace: null,                                },
            { key: 'G2SW-LZC',       child: 'G2SW-4NR', firstName: 'Mauro',              middleName: '',            lastName: 'Go',          gender: 'M', birthDate: null,         deathDate: null,               living: false, hasDNA: false, hasImage: false,  birthPlace: null,                                deathPlace: null,                                },
            { key: 'G2SW-47C',       child: 'G2SW-4NR', firstName: 'Natividad',          middleName: '',            lastName: 'Litua',       gender: 'F', birthDate: null,         deathDate: null,               living: false, hasDNA: false, hasImage: false,  birthPlace: null,                                deathPlace: null,                                },
      { key: 'GQJK-G8W',             child: 'G2S2-FTC', firstName: 'Corazon',            middleName: 'Maramba',     lastName: 'Acosta',      gender: 'F', birthDate: '1971-03-10', deathDate: '2018-05-25',       living: false, hasDNA: false, hasImage: true,   birthPlace: 'Sampaloc, Manila, PHL',             deathPlace: 'Santa Cruz, Laguna, PHL',           marker: 'housewife' },
        { key: 'GHBD-7M4',           child: 'GQJK-G8W', firstName: 'Manuel',             middleName: 'San Agustin', lastName: 'Acosta Jr.',  gender: 'M', birthDate: '1948-07-06', deathDate: '1979-06-07',       living: false, hasDNA: false, hasImage: true,   birthPlace: 'Manila, PHL',                       deathPlace: 'Pasadena, Los Angeles, CA, USA',    marker: 'seaman' },
          { key: 'GHBD-9L6',         child: 'GHBD-7M4', firstName: 'Manuel',             middleName: 'Bongco',      lastName: 'Acosta Sr.',  gender: 'M', birthDate: '1913-11-10', deathDate: '1994-11-20',       living: false, hasDNA: false, hasImage: true,   birthPlace: 'Orani, Bataan, PHL',                deathPlace: 'San Dimas, Los Angeles, CA, USA',   marker: 'police' },
            { key: 'GHB8-SQN',       child: 'GHBD-9L6', firstName: 'Ligorio',            middleName: '',            lastName: 'Acosta',      gender: 'M', birthDate: 'about 1871', deathDate: '1948-07-07',       living: false, hasDNA: false, hasImage: false,  birthPlace: null,                                deathPlace: 'Manila, PHL',                       },
            { key: 'GHB8-5K8',       child: 'GHBD-9L6', firstName: 'Maximiana',          middleName: 'Cahanding',   lastName: 'Bongco',      gender: 'F', birthDate: null,         deathDate: 'after 1913-11-10', living: false, hasDNA: false, hasImage: false,  birthPlace: 'Orani, Bataan, PHL',                deathPlace: null,                                },
              { key: 'G4MF-WD8',     child: 'GHB8-5K8', firstName: 'Fabian',             middleName: '',            lastName: 'Bongco',      gender: 'M', birthDate: null,         deathDate: null,               living: false, hasDNA: false, hasImage: false,  birthPlace: 'Orani, Bataan, PHL',                deathPlace: null,                                },
              { key: 'G4MF-S3R',     child: 'GHB8-5K8', firstName: 'Lucina',             middleName: '',            lastName: 'Cahanding',   gender: 'F', birthDate: null,         deathDate: null,               living: false, hasDNA: false, hasImage: false,  birthPlace: 'Orani, Bataan, PHL',                deathPlace: null,                                },
          { key: 'GHB8-DXY',         child: 'GHBD-7M4', firstName: 'Natividad',          middleName: 'Villacorta',  lastName: 'San Agustin', gender: 'F', birthDate: '1925-12-21', deathDate: '2008-10-09',       living: false, hasDNA: false, hasImage: true,   birthPlace: 'Ermita, Manila, PHL',               deathPlace: 'San Dimas, Los Angeles, CA, USA',   },
            { key: 'GHB8-LCC',       child: 'GHB8-DXY', firstName: 'Vicente',            middleName: '',            lastName: 'San Agustin', gender: 'M', birthDate: null,         deathDate: null,               living: false, hasDNA: false, hasImage: false,  birthPlace: null,                                deathPlace: null,                                },
            { key: 'GHB8-H7K',       child: 'GHB8-DXY', firstName: 'Nena',               middleName: '',            lastName: 'Villacorta',  gender: 'F', birthDate: null,         deathDate: null,               living: false, hasDNA: false, hasImage: false,  birthPlace: null,                                deathPlace: null,                                },
        { key: 'GHB8-J1B',           child: 'GQJK-G8W', firstName: 'Catalina',           middleName: 'Dumantay',    lastName: 'Maramba',     gender: 'F', birthDate: '1943-01-28', deathDate: '1974-08-10',       living: false, hasDNA: false, hasImage: true,   birthPlace: 'Santa Barbara, Pangasinan, PHL',    deathPlace: 'Sangandaan, Caloocan, PHL',         },
          { key: 'GHB8-GB6',         child: 'GHB8-J1B', firstName: 'Sotero',             middleName: 'Reyes',       lastName: 'Maramba Sr.', gender: 'M', birthDate: '1910-04-22', deathDate: '1969-12-12',       living: false, hasDNA: false, hasImage: true,   birthPlace: 'Santa Barbara, Pangasinan, PHL',    deathPlace: 'Sangandaan, Caloocan, PHL',         marker: 'police' },
            { key: 'LLQS-641',       child: 'GHB8-GB6', firstName: 'Miguel',             middleName: 'Bautista',    lastName: 'Maramba',     gender: 'M', birthDate: '1858',       deathDate: 'after 1909-06-22', living: false, hasDNA: false, hasImage: false,  birthPlace: 'Santa Barbara, Pangasinan, PHL',    deathPlace: 'Santa Barbara, Pangasinan, PHL',    marker: 'government' },
              { key: 'LLQS-6YC',     child: 'LLQS-641', firstName: 'Guillermo',          middleName: 'Bautista',    lastName: 'Maramba',     gender: 'M', birthDate: null,         deathDate: null,               living: false, hasDNA: false, hasImage: false,  birthPlace: null,                                deathPlace: null,                                },
              { key: 'L281-614',     child: 'LLQS-641', firstName: 'Maria',              middleName: 'Garcia',      lastName: 'Bautista',    gender: 'F', birthDate: null,         deathDate: 'after 1858-12-31', living: false, hasDNA: false, hasImage: false,  birthPlace: null,                                deathPlace: null,                                },
                { key: 'GC7T-H59',   child: 'L281-614', firstName: 'Agustin',            middleName: '',            lastName: 'Bautista',    gender: 'M', birthDate: '1812-05-29', deathDate: null,               living: false, hasDNA: false, hasImage: false,  birthPlace: 'Santa Barbara, Pangasinan, PHL',    deathPlace: 'Santa Barbara, Pangasinan, PHL',    marker: 'government' },
                  { key: 'L66T-WY8', child: 'GC7T-H59', firstName: 'Juan',               middleName: '',            lastName: 'Bautista',    gender: 'M', birthDate: 'about 1783', deathDate: 'after 1811-07-29', living: false, hasDNA: false, hasImage: false,  birthPlace: 'Santa Barbara, Pangasinan, PHL',    deathPlace: null,                                },
                  { key: 'L6HC-MMX', child: 'GC7T-H59', firstName: 'Maria',              middleName: '',            lastName: 'Quinto',      gender: 'F', birthDate: null,         deathDate: null,               living: false, hasDNA: false, hasImage: false,  birthPlace: null,                                deathPlace: null,                                },
                { key: 'GC7T-1PK',   child: 'L281-614', firstName: 'Felipe',             middleName: '',            lastName: 'Garcia',      gender: 'F', birthDate: null,         deathDate: null,               living: false, hasDNA: false, hasImage: false,  birthPlace: null,                                deathPlace: null,                                },
            { key: 'LLQS-6F1',       child: 'GHB8-GB6', firstName: 'Mercedes',           middleName: 'Novilla',     lastName: 'Reyes',       gender: 'F', birthDate: null,         deathDate: null,               living: false, hasDNA: false, hasImage: false,  birthPlace: null,                                deathPlace: null,                                },
              { key: 'G7C3-B6P',     child: 'LLQS-6F1', firstName: 'Gregorio',           middleName: '',            lastName: 'Reyes',       gender: 'M', birthDate: null,         deathDate: null,               living: false, hasDNA: false, hasImage: false,  birthPlace: null,                                deathPlace: null,                                },
              { key: 'G7C3-J9S',     child: 'LLQS-6F1', firstName: 'Leocadia',           middleName: '',            lastName: 'Novilla',     gender: 'F', birthDate: null,         deathDate: null,               living: false, hasDNA: false, hasImage: false,  birthPlace: null,                                deathPlace: null,                                },
          { key: 'GHBD-9LY',         child: 'GHB8-J1B', firstName: 'Crescencia',         middleName: '',            lastName: 'Dumantay',    gender: 'F', birthDate: '1918-04-19', deathDate: '1990-04-16',       living: false, hasDNA: false, hasImage: true,   birthPlace: null,                                deathPlace: 'Sangandaan, Caloocan, PHL',         },
            { key: 'TEMP-001',       child: 'GHBD-9LY', firstName: 'Unknown',            middleName: '',            lastName: 'name',        gender: 'F', birthDate: null,         deathDate: null,               living: false, hasDNA: false, hasImage: true,   birthPlace: null,                                deathPlace: null,                                },
];

// Add "parent" from "child" value since GoJS works that way
for (var i = TREE_DATA.length - 1; i >= 0; i--) {
  TREE_DATA[i]["parent"] = TREE_DATA[i]["child"];
}

for (const [i, person] of Object.entries(TREE_DATA)) {
  if (person.firstName == undefined) {
    continue;
  }
  let middleInitialsArray  = person.middleName.trim().split(' ');
  let middleInitialsString = '';

  if (middleInitialsArray[0] != '') {
    for (let i = 0; i < middleInitialsArray.length; i++) {
      middleInitialsString += middleInitialsArray[i][0] + '. '
    }
  }

  // Add "fullName" to each person
  TREE_DATA[i]['fullName'] = person.firstName + " " + middleInitialsString + person.lastName;
}

// Create a map of child to parents.
let childToParents = {};
TREE_DATA.forEach(node => {
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
  if (node.child && childToParents[node.child].length > 1) {
    node.partner = childToParents[node.child].find(parentKey => parentKey !== node.key);
  }
});

// const TREE_DATA = TREE_DATA;
/*
  Grumaduate si Nanay ng May 30, 1994 ng BS Accounting sa UE Caloocan
  Grumaduate si Nanay ng March 22, 1990 ng Highschool
*/