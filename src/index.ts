import { TrackerKeyType, trackerData, trackerKeys } from './data/global.ts';
import { modes } from './data/mode.ts';
import { SeasonData, seasons } from './data/season.ts';
import { weapons, WeaponData, weaponCategories, WeaponCategoryNames } from './data/weapon.ts';

const CURRENT_SEASON_NUM = 21;

type TrackerSetFileContents = {
  assetName?: string;
  SAID?: string;
  loclKey?: string;
  loclKeyShort?: string;
  quality?: string;
  grxRef?: string;
  statRef?: string;
  color?: string;
  character?: string;
  weaponData?: WeaponData;
  seasonData?: SeasonData;
  displayName?: string;
  trackable?: TrackableType;
};

const generateDisplayName = (statRef?: string, character?: string) => {
  if (!statRef) return;
  let displayName = '';
  const stats = statRef.replace('stats.', '').split('.');
  if (stats[0] === 'kills') {
    return 'Apex Kills';
  } else if (stats[0] === 'revived_ally') {
    return 'Apex Revives';
  } else if (stats[0] === 'placements_win') {
    return 'Apex Wins';
  } else if (stats.length === 1) {
    const names = stats[0].split('_');
    names.forEach((n) => {
      if (displayName !== '') displayName += ' ';
      displayName += n.charAt(0).toUpperCase() + n.slice(1);
    });
    return displayName;
  }
  stats.forEach((s) => {
    if (displayName !== '') displayName += ' ';
    // variable included
    if (s.match(/weapons\[SAID\d+\]/)) {
      const weaponSAIDResult = s.match(/SAID\d+/);
      if (weaponSAIDResult) {
        const weaponSAID = weaponSAIDResult[0];
        const weaponData = weapons.find((weapon) => weapon.SAID === weaponSAID);
        displayName += weaponData?.displayName;
      }
    } else if (s.match(/seasons\[SAID\d+\]/)) {
      const seasonSAIDResult = s.match(/SAID\d+/);
      if (seasonSAIDResult) {
        const seasonSAID = seasonSAIDResult[0];
        const seasonData = seasons.find((season) => season.SAID === seasonSAID);
        displayName += `S${seasonData?.seasonNum}`;
      }
    } else if (s === 'characters[%char%]') {
      if (character) displayName += character?.charAt(0).toUpperCase() + character?.slice(1);
    } else if (s.startsWith('mode')) {
      modes.forEach((m) => {
        if (s.includes(m.internalName)) displayName += m.displayName;
      });
    } else if (s.startsWith('weaponcategories')) {
      const weaponCategory = s.replace('weaponcategories[', '').replace(']', '') as WeaponCategoryNames;
      if (weaponCategory in weaponCategories) {
        displayName += weaponCategories[weaponCategory];
      }
    }
    // global
    else if ((trackerKeys as readonly string[]).includes(s)) {
      displayName += trackerData[s as TrackerKeyType];
    }
  });
  return displayName;
};

type TrackableType = 'kills' | 'revives' | 'wins' | 'damage' | 'none';

const checkTrackable = (statRef?: string): TrackableType => {
  if (!statRef) return 'none';
  const currentSeasonSAID = seasons.find((s) => s.seasonNum === CURRENT_SEASON_NUM)?.SAID;
  const stats = statRef.replace('stats.', '').split('.');
  if (stats.length === 1) {
    // career stats
    if (stats[0] === 'kills') {
      return 'kills';
    } else if (stats[0] === 'revived_ally') {
      return 'revives';
    } else if (stats[0] === 'placements_win') {
      return 'wins';
    } else {
      return 'none';
    }
  } else if (stats.length === 2 && stats[0] === 'characters[%char%]') {
    // character stats
    if (stats[1] === 'kills') {
      return 'kills';
    } else if (stats[1] === 'revived_ally') {
      return 'revives';
    } else if (stats[1] === 'placements_win') {
      return 'wins';
    } else if (stats[1] === 'damage_done') {
      return 'damage';
    } else {
      return 'none';
    }
  } else if (stats.length === 3 && stats[0] === `seasons[${currentSeasonSAID}]` && stats[1] === 'characters[%char%]') {
    // season character stats
    if (stats[2] === 'kills') {
      return 'kills';
    } else if (stats[2] === 'revived_ally') {
      return 'revives';
    } else if (stats[2] === 'placements_win') {
      return 'wins';
    } else if (stats[2] === 'damage_done') {
      return 'damage';
    } else {
      return 'none';
    }
  }
  return 'none';
};

const parseTrackerSetFile = (fileContents: string, character?: string) => {
  const matchRegex = /\t(\S+)\s\"(.*)\"/gm;
  const keyValueRegex = /(\S+)\s\"(.*)\"/gm;
  const lines = fileContents.split('\n');
  const setFileContents: TrackerSetFileContents = {};
  setFileContents.character = character;
  lines.forEach((line, index) => {
    if (index === 0) return;
    if (!matchRegex.test(line)) return;
    const result = keyValueRegex.exec(line.replace('\t', ''));
    if (!result) return;
    if (!result[1] || !result[2]) return;
    const key = result[1],
      value = result[2];
    if (key === 'assetName') setFileContents.assetName = value;
    else if (key === 'settingsAssetID') {
      const SAID = parseInt(value.replace('SAID', '')).toString();
      setFileContents.SAID = SAID;
    } else if (key === 'localizationKey_NAME') setFileContents.loclKey = value;
    else if (key === 'localizationKey_NAME_SHORT') setFileContents.loclKeyShort = value;
    else if (key === 'quality') setFileContents.quality = value;
    else if (key === 'grxRef') setFileContents.grxRef = value;
    else if (key === 'statRef') setFileContents.statRef = value;
    else if (key === 'color0') setFileContents.color = value;
    keyValueRegex.exec(''); // bad practice :(
  });

  if (!setFileContents.statRef) {
    if (setFileContents.SAID === '1905735931') {
      // empty
      setFileContents.displayName = '';
    }
  } else {
    setFileContents.displayName = generateDisplayName(setFileContents.statRef, character);
    setFileContents.trackable = checkTrackable(setFileContents.statRef);
  }

  return setFileContents;
};

const readTrackerSetFile = async (path: string, character?: string) => {
  const fileContents = await Deno.readTextFile(path);
  const parsedInfo = parseTrackerSetFile(fileContents, character);
  return parsedInfo;
};

const generateTrackerInfo = async () => {
  const baseDir = '../exported_files/stgs/settings/itemflav/gcard_tracker';
  const charDirs: string[] = [];
  const setFileInfo: TrackerSetFileContents[] = [];
  for await (const dirEntry of Deno.readDir(baseDir)) {
    if (dirEntry.isDirectory) charDirs.push(dirEntry.name);
    else {
      const setFileContents = await readTrackerSetFile(`${baseDir}/${dirEntry.name}`);
      setFileInfo.push(setFileContents);
    }
  }
  for await (const charName of charDirs) {
    for await (const dirEntry of Deno.readDir(`${baseDir}/${charName}`)) {
      if (dirEntry.isFile) {
        const setFileContents = await readTrackerSetFile(`${baseDir}/${charName}/${dirEntry.name}`, charName);
        setFileInfo.push(setFileContents);
      }
    }
  }
  const fileContents = {
    lastUpdated: Date.now(),
    data: setFileInfo,
  };
  Deno.writeTextFile('./dist/trackers.json', JSON.stringify(fileContents, null, 4));
};

await generateTrackerInfo();
