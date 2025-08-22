import fs from "node:fs";
import { spawn } from "child_process";

const SPECIALS = ["sp", "spm"];
const DATA = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
const chapters = fs.readdirSync("../_sprites/original");

const UNIQUES = fs
  .readFileSync("../_sprites/unique.txt", "utf-8")
  .split("UNIQUE FOR SORTING:")
  .at(-1)
  ?.split("UNIQUE FRAME COUNT:");

const UNIQUES_NAMES = UNIQUES != undefined ? UNIQUES[0].split("\n") : [];
UNIQUES_NAMES?.shift();

const UNIQUES_FRAMES = UNIQUES != undefined ? UNIQUES[1].split("\n") : [];
UNIQUES_FRAMES?.shift();

while (UNIQUES_NAMES?.at(-1) == "") UNIQUES_NAMES?.pop();
while (UNIQUES_FRAMES?.at(-1) == "") UNIQUES_FRAMES?.pop();

function add_singles(chapter, sprite_name) {
  const img_name = `${sprite_name}.png`;
  if (!fs.existsSync(`../_sprites/translation/${img_name}`)) return;

  fs.copyFileSync(
    `../_sprites/translation/${img_name}`,
    `../_sprites/sorted/${chapter}/${img_name}`
  );

  for (const special of SPECIALS) {
    if (fs.existsSync(`../_sprites/translation/${special}_${img_name}`)) {
      fs.copyFileSync(
        `../_sprites/translation/${special}_${img_name}`,
        `../_sprites/sorted/${chapter}/${special}_${img_name}`
      );
    }
  }
}

function add_animations(chapter, sprite_name) {
  if (
    fs.existsSync(`../_sprites/translation/${sprite_name}`) &&
    !fs.existsSync(`../_sprites/sorted/${chapter}/${sprite_name}`)
  ) {
    if (UNIQUES_FRAMES.includes(sprite_name))
      fs.cpSync(
        `../_sprites/translation/${sprite_name}`,
        `../_sprites/sorted/${chapter}/${sprite_name}`,
        { recursive: true, force: true }
      );
    else
      fs.cpSync(
        `../_sprites/original/${chapter}/${sprite_name}`,
        `../_sprites/sorted/${chapter}/${sprite_name}`,
        { recursive: true, force: true }
      );
  } else return;

  for (const special of SPECIALS) {
    if (fs.existsSync(`../_sprites/translation/${special}_${sprite_name}`)) {
      fs.cpSync(
        `../_sprites/original/${chapter}/${sprite_name}`,
        `../_sprites/sorted/${chapter}/${special}_${sprite_name}`,
        { recursive: true, force: true }
      );

      for (const file of fs.readdirSync(
        `../_sprites/sorted/${chapter}/${special}_${sprite_name}`
      )) {
        const oldPath = `../_sprites/sorted/${chapter}/${special}_${sprite_name}/${file}`;
        const newPath = `../_sprites/sorted/${chapter}/${special}_${sprite_name}/${special}_${file}`;

        fs.renameSync(oldPath, newPath);
      }
    }
  }

  if (UNIQUES_FRAMES.includes(sprite_name)) return;

  const sprite_frames = DATA[chapter][sprite_name];
  for (let frame of sprite_frames) {
    const img_name = `${sprite_name}_${frame}.png`;
    if (!fs.existsSync(`../_sprites/translation/${sprite_name}/${img_name}`))
      continue;

    for (const special of SPECIALS) {
      if (
        fs.existsSync(
          `../_sprites/translation/${special}_${sprite_name}/${special}_${img_name}`
        )
      ) {
        fs.copyFileSync(
          `../_sprites/translation/${special}_${sprite_name}/${special}_${img_name}`,
          `../_sprites/sorted/${chapter}/${special}_${sprite_name}/${special}_${img_name}`
        );
      }
    }

    fs.copyFileSync(
      `../_sprites/translation/${sprite_name}/${img_name}`,
      `../_sprites/sorted/${chapter}/${sprite_name}/${img_name}`
    );
  }
}

for (const chapter of chapters) {
  if (!chapter.endsWith(".DS_Store")) {
    if (!fs.existsSync(`../_sprites/sorted`))
      fs.mkdirSync(`../_sprites/sorted`);
    if (!fs.existsSync(`../_sprites/sorted/${chapter}`))
      fs.mkdirSync(`../_sprites/sorted/${chapter}`);

    for (const sprite of Object.keys(DATA[chapter])) {
      const frames: any[] = DATA[chapter][sprite];

      if (frames.length == 1) add_singles(chapter, sprite);
      else add_animations(chapter, sprite);
    }
  }
}

if (UNIQUES_NAMES != undefined) {
  for (const unique of UNIQUES_NAMES) {
    const uniqueChapter = unique.split("/")[0];
    const uniqueName = unique.split("/")[1];

    if (fs.existsSync(`../_sprites/translation/${uniqueName}.png`))
      fs.copyFileSync(
        `../_sprites/translation/${uniqueName}.png`,
        `../_sprites/sorted/${uniqueChapter}/${uniqueName}.png`
      );

    if (fs.existsSync(`../_sprites/translation/${uniqueName}`))
      fs.cpSync(
        `../_sprites/translation/${uniqueName}`,
        `../_sprites/sorted/${uniqueChapter}/${uniqueName}`,
        { recursive: true, force: true }
      );
  }
}

for (const chapter of chapters) {
  spawn("python3", [
    "merge.py",
    `../_sprites/sorted/${chapter}`,
    `../_sprites/sorted-merged/${chapter}`,
  ]);
}
