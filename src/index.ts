type TrackerSetFileContents = {
  assetName?: string;
  SAID?: string;
  loclKey?: string;
  loclKeyShort?: string;
  quality?: string;
  grxRef?: string;
  statRef?: string;
  color?: string;
};

const parseTrackerSetFile = (fileContents: string) => {
  const matchRegex = /\t(\S+)\s\"(.*)\"/gm;
  const keyValueRegex = /(\S+)\s\"(.*)\"/gm;
  const lines = fileContents.split('\n');
  const setFileContents: TrackerSetFileContents = {};
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
  return setFileContents;
};

const readTrackerSetFile = async (path: string) => {
  const fileContents = await Deno.readTextFile(path);
  const parsedInfo = parseTrackerSetFile(fileContents);
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
        const setFileContents = await readTrackerSetFile(`${baseDir}/${charName}/${dirEntry.name}`);
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
