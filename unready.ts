import fs from "node:fs";

const CHAPTERS = JSON.parse(fs.readFileSync("./data.json", "utf-8"));

const UNIQUES = fs
  .readFileSync("../_sprites/unique.txt", "utf-8")
  .split("UNIQUE FOR SORTING:")
  .at(-1)
  ?.split("UNIQUE FRAME COUNT:");
const UNIQUES_FRAMES = UNIQUES != undefined ? UNIQUES[1].split("\n") : [];
UNIQUES_FRAMES?.shift();
while (UNIQUES_FRAMES?.at(-1) == "") UNIQUES_FRAMES?.pop();

if (!fs.existsSync("../_sprites/unready")) fs.mkdirSync("../_sprites/unready");

for (const chapter of Object.keys(CHAPTERS)) {
  const OriginalPath = `../_sprites/original/${chapter}`;
  const UnreadyPath = `../_sprites/unready`;

  if (!fs.existsSync(UnreadyPath)) fs.mkdirSync(UnreadyPath);

  fs.cpSync(OriginalPath, UnreadyPath, { recursive: true, force: true });
}

const TRANSLATED = fs.readdirSync("../_sprites/translation");
const UNREADY = fs.readdirSync("../_sprites/unready");

for (const sprite of TRANSLATED) {
  if (sprite.endsWith(".png")) {
    if (UNREADY.includes(sprite)) fs.rmSync(`../_sprites/unready/${sprite}`);
  } else {
    if (
      fs.existsSync(`../_sprites/unready/${sprite}`) &&
      (UNIQUES_FRAMES.includes(sprite) ||
        fs.readdirSync(`../_sprites/unready/${sprite}`).length ==
          fs.readdirSync(`../_sprites/translation/${sprite}`).length)
    )
      fs.rmSync(`../_sprites/unready/${sprite}`, {
        recursive: true,
        force: true,
      });
  }
}
