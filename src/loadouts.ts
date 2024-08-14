import { mpWeapons } from './data/weapon.ts';

const normalFilename = '0xB9850D684E981F45.csv';
const goldFilename = '0xDBBD07F43A1E6463.csv';

const convertWeaponName = (rawName: string) => {
  const isBlue = rawName.endsWith('_blueset');
  const isPurple = rawName.endsWith('_purpleset');
  const isGold = rawName.endsWith('_gold');
  if (isBlue) {
    const weaponName = mpWeapons[rawName.replace('mp_weapon_', '').replace('_blueset', '')];
    return `Blue ${weaponName}`;
  } else if (isPurple) {
    const weaponName = mpWeapons[rawName.replace('mp_weapon_', '').replace('_purpleset', '')];
    return `Purple ${weaponName}`;
  } else if (isGold) {
    const weaponName = mpWeapons[rawName.replace('mp_weapon_', '').replace('_gold', '')];
    return `Gold ${weaponName}`;
  } else {
    const weaponName = mpWeapons[rawName.replace('mp_weapon_', '')];
    return `${weaponName}`;
  }
};

const parseLoadouts = (fileContents: string) => {
  const lines = fileContents.split('\n');
  const loadouts: Record<string, { firstWeapon: string; secondWeapon: string }[]> = {};
  lines.forEach((line, i) => {
    if (i < 3) return;
    const fragments = line.split(',').map((l) => l.replaceAll('"', ''));
    if (fragments[0] !== '' && fragments[0] !== 'asset') {
      // title
      const className = fragments[1].replace('#CONTROL_', '').replace('_LOADOUT', '');
      // weapons
      const firstWeapon = convertWeaponName(lines[i + 1].split(',').map((l) => l.replaceAll('"', ''))[2]);
      const secondWeapon = convertWeaponName(lines[i + 2].split(',').map((l) => l.replaceAll('"', ''))[2]);
      if (className in loadouts) {
        loadouts[className].push({ firstWeapon, secondWeapon });
      } else {
        loadouts[className] = [{ firstWeapon, secondWeapon }];
      }
    }
  });
  return loadouts;
};

const generateLoadouts = async () => {
  const normalFile = await Deno.readTextFile(`./exported_files/dtbl/dtbl/${normalFilename}`);
  const goldFile = await Deno.readTextFile(`./exported_files/dtbl/dtbl/${goldFilename}`);
  const normalLoadouts = parseLoadouts(normalFile);
  const goldLoadouts = parseLoadouts(goldFile);
  Deno.writeTextFile('./dist/control_blue_loadouts.json', JSON.stringify(normalLoadouts, null, 4));
  Deno.writeTextFile('./dist/control_gold_loadouts.json', JSON.stringify(goldLoadouts, null, 4));
};

await generateLoadouts();
