export type WeaponData = {
  SAID: string;
  internalName: string;
  displayName: string;
};

export const weapons: WeaponData[] = [
  {
    SAID: 'SAID01475792313',
    internalName: 'alternator',
    displayName: 'Alternator',
  },
  {
    SAID: 'SAID01981891556',
    internalName: 'car',
    displayName: 'Car SMG',
  },
  {
    SAID: 'SAID00107352658',
    internalName: 'chargerifle',
    displayName: 'Charge Rifle',
  },
  {
    SAID: 'SAID01644528094',
    internalName: 'Compound',
    displayName: 'Bocek',
  },
  {
    SAID: 'SAID00352110003',
    internalName: 'devotion',
    displayName: 'Devotion',
  },
  {
    SAID: 'SAID02050922236',
    internalName: 'dragon',
    displayName: 'Rampage',
  },
  {
    SAID: 'SAID01928357643',
    internalName: 'eva8',
    displayName: 'EVA8',
  },
  {
    SAID: 'SAID01870377113',
    internalName: 'flatline',
    displayName: 'Flatline',
  },
  {
    SAID: 'SAID00909655776',
    internalName: 'g7',
    displayName: 'G7 Scout',
  },
  {
    SAID: 'SAID01820095990',
    internalName: 'havoc',
    displayName: 'Havoc',
  },
  {
    SAID: 'SAID01082669812',
    internalName: 'hemlok',
    displayName: 'Hemlok',
  },
  {
    SAID: 'SAID01920744447',
    internalName: 'kraber',
    displayName: 'Kraber',
  },
  {
    SAID: 'SAID00908539842',
    internalName: 'longbow',
    displayName: 'Longbow',
  },
  {
    SAID: 'SAID00194888968',
    internalName: 'lstar',
    displayName: 'L-Star',
  },
  {
    SAID: 'SAID00418361060',
    internalName: 'mastiff',
    displayName: 'Mastiff',
  },
  {
    SAID: 'SAID00945439943',
    internalName: 'mozambique',
    displayName: 'Mozambique',
  },
  {
    SAID: 'SAID01580685432',
    internalName: 'nemesis',
    displayName: 'Nemesis',
  },
  {
    SAID: 'SAID00970511567',
    internalName: 'p2020',
    displayName: 'P2020',
  },
  {
    SAID: 'SAID01388774763',
    internalName: 'peacekeeper',
    displayName: 'PeaceKeeper',
  },
  {
    SAID: 'SAID01496005473',
    internalName: 'prowler',
    displayName: 'Prowler',
  },
  {
    SAID: 'SAID00048783537',
    internalName: 'r301',
    displayName: 'R301',
  },
  {
    SAID: 'SAID00080404303',
    internalName: 'r99',
    displayName: 'R99',
  },
  {
    SAID: 'SAID00686444189',
    internalName: 're45',
    displayName: 'RE45',
  },
  {
    SAID: 'SAID01408780340',
    internalName: 'repeater3030',
    displayName: '30-30 Repeater',
  },
  {
    SAID: 'SAID00947460272',
    internalName: 'sentinel',
    displayName: 'Sentinel',
  },
  {
    SAID: 'SAID01363034817',
    internalName: 'spitfire',
    displayName: 'Spitfire',
  },
  {
    SAID: 'SAID01603172346',
    internalName: 'tripletake',
    displayName: 'Triple Take',
  },
  {
    SAID: 'SAID00342631558',
    internalName: 'volt',
    displayName: 'Volt SMG',
  },
  {
    SAID: 'SAID02091853053',
    internalName: 'wingman',
    displayName: 'Wingman',
  },
];

export type WeaponCategoryNames = 'ar' | 'crate_unique' | 'lmg' | 'marksman' | 'pistol' | 'shotgun' | 'smg' | 'sniper';

export const weaponCategories: Record<WeaponCategoryNames, string> = {
  ar: 'AR',
  crate_unique: 'Care Package Weapon',
  lmg: 'LMG',
  marksman: 'Marksman',
  pistol: 'Pistol',
  shotgun: 'Shotgun',
  smg: 'SMG',
  sniper: 'Sniper',
};

export const mpWeapons: Record<string, string> = {
  volt_smg: 'Volt SMG',
  energy_shotgun: 'PeaceKeeper',
  semipistol: 'P2020',
  semipistol_akimbo: 'P2020 Akimbo',
  rspn101: 'R301',
  energy_ar: 'Havoc',
  mastiff: 'Mastiff',
  car: 'Car SMG',
  shotgun: 'EVA8',
  dragon_lmg: 'Rampage',
  shotgun_pistol: 'Mozambique',
  shotgun_pistol_akimbo: 'Mozambique Akimbo',
  lmg: 'Spitfire',
  lstar: 'L Star',
  wingman: 'Wingman',
  autopistol: 'RE45',
  vinson: 'Flatline',
  alternator_smg: 'Alternator',
  hemlok: 'Hemlok',
  g2: 'G7 Scout',
  pdw: 'Prowler',
  nemesis: 'Nemesis',
  '3030': '30-30 Repeater',
  doubletake: 'Triple Take',
  dmr: 'Longbow',
  sentinel: 'Sentinel',
  defender: 'Charge Rifle',
  esaw: 'Devotion',
} as const;
