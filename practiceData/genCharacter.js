const raceModifiers = {
  dragonborne: {
    str: 2,
    cha: 1,
  },
  dwarf: {
    con: 2,
  },
  elf: {
    dex: 2,
  },
  gnome: {
    int: 2,
  },
  'half-elf': {
    cha: 2,
  },
  'half-orc': {
    str: 2,
    Con: 1,
  },
  halfling: {
    dex: 2,
  },
  human: {
    str: 1,
    dex: 1,
    con: 1,
    int: 1,
    wis: 1,
    cha: 1,
  },
  tiefling: {
    int: 1,
    cha: 2,
  },
};

const emptyScores = {
  str: 0,
  dex: 0,
  con: 0,
  int: 0,
  wis: 0,
  cha: 0,
};

const emptyMoney = {
  cp: 0,
  sp: 0,
  gp: 0,
  pp: 0,
};

const raceAttributes = {
  dragonborne: [1, 2, 3, 4],
  dwarf: [1, 2, 3, 4],
  elf: [1, 2, 3, 4],
  gnome: [1, 2, 3, 4],
  'half-elf': [1, 2, 3, 4],
  'half-orc': [1, 2, 3, 4],
  halfling: [1, 2, 3, 4],
  human: [1, 2, 3, 4],
  tiefling: [1, 2, 3, 4],
};

const classList = {
  barbarian: {
    die: 12,
    proficiencies: ['proficiencies go here'],
    features: ['features go here'],
  },
  bard: {
    die: 8,
    proficiencies: ['proficiencies go here'],
    features: ['features go here'],
  },
  cleric: {
    die: 8,
    proficiencies: ['proficiencies go here'],
    features: ['features go here'],
  },
  druid: {
    die: 8,
    proficiencies: ['proficiencies go here'],
    features: ['features go here'],
  },
  fighter: {
    die: 10,
    proficiencies: ['proficiencies go here'],
    features: ['features go here'],
  },
  monk: {
    die: 8,
    proficiencies: ['proficiencies go here'],
    features: ['features go here'],
  },
  paladin: {
    die: 10,
    proficiencies: ['proficiencies go here'],
    features: ['features go here'],
  },
  ranger: {
    die: 10,
    proficiencies: ['proficiencies go here'],
    features: ['features go here'],
  },
  rogue: {
    die: 8,
    proficiencies: ['proficiencies go here'],
    features: ['features go here'],
  },
  sorceror: {
    die: 6,
    proficiencies: ['proficiencies go here'],
    features: ['features go here'],
  },
  warlock: {
    die: 8,
    proficiencies: ['proficiencies go here'],
    features: ['features go here'],
  },
  wizard: {
    die: 8,
    proficiencies: ['proficiencies go here'],
    features: ['features go here'],
  },
};

const savesList = {
  str: ['saving', 'athletics'],
  dex: ['saving', 'acrobatics', 'slightOfHand', 'stealth'],
  con: ['saving'],
  int: ['saving', 'arcana', 'history', 'investigation', 'nature', 'religion'],
  wis: ['saving', 'animalHandling', 'insight', 'medicine', 'perception', 'survival'],
  cha: ['saving', 'deception', 'intimidation', 'performance', 'persuasion'],
};

const genRaceMods = (mods) => {
  const boosts = mods || {};
  const stats = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
  const base = {};
  stats.forEach((stat) => {
    base[stat] = 0;
  });

  return Object.assign(base, boosts);
};

const genSaves = (stat, mod) => {
  const saves = {};
  savesList[stat].forEach((save) => {
    saves[save] = mod;
  });

  return saves;
};

const genStat = (value, stat) => {
  const score = {};
  score.value = value;
  score.mod = Math.floor((value - 10) / 2);
  score.saves = genSaves(stat, score.mod);

  return score;
};

const genAbility = (scores) => {
  const ability = {};
  const stats = scores || emptyScores;
  Object.keys(stats).forEach((stat) => {
    ability[stat] = genStat(stats[stat], stat);
  });

  return ability;
};

const genProfile = (name, gender, height, age, hair, eye, align) => {
  const profile = {};
  profile.name = name;
  profile.gender = gender;
  profile.height = height;
  profile.age = age;
  profile.hair = hair;
  profile.eye = eye;
  profile.align = align;

  return profile;
};

const genRace = (raceName) => {
  const race = {};
  race.name = raceName || '';
  race.modifiers = genRaceMods(raceModifiers[raceName]) || null;
  race.attributes = raceAttributes[raceName] || null;

  return race;
};

const genClass = (className) => {
  const charClass = {};
  charClass.name = '';
  charClass.hitDie = null;
  charClass.proficiencies = null;
  charClass.features = null;

  if (className in classList) {
    charClass.name = className;
    charClass.hitDie = classList[className].die;
    charClass.proficiencies = classList[className].proficiencies;
    charClass.features = classList[className].features;
  }

  return charClass;
};

const genStatus = () => ({
  level: 0,
  experience: Math.floor(Math.random() * 201),
  nextLevel: 200,
  maxHP: null,
  currentHP: null,
  tempHP: null,
  armorClass: null,
  speed: null,
  init: null,
  saves: {
    success: [null, null, null],
    failures: [null, null, null],
  },
});

const genGear = (weapons, spells, money) => {
  const gear = {};
  const weaponList = weapons || [];
  const spellList = spells || [];
  gear.weapons = [...weaponList];
  gear.spells = [...spellList];
  gear.money = money || emptyMoney;

  return gear;
};

const genCharacter = (
  scores,
  name,
  gender,
  height,
  age,
  hair,
  eye,
  align,
  raceName,
  className,
  weapons,
  spells,
  money,
) => {
  const character = {};
  character.ability = genAbility(scores);
  character.profile = genProfile(name, gender, height, age, hair, eye, align);
  character.race = genRace(raceName);
  character.charClass = genClass(className);
  character.status = genStatus();
  character.gear = genGear(weapons, spells, money);
  character.equipped = {
    weapons: [],
    spells: [],
    armor: [],
  };

  return character;
};

export default {
  genRaceMods,
  genSaves,
  genStat,
  genAbility,
  genProfile,
  genClass,
  genRace,
  genStatus,
  genGear,
  genCharacter,
};
