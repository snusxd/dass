import fs from "node:fs";

const PATHS = {
  ORIGINAL: "../_sprites/original",
  TRANSLATE: "../_sprites/translation",
};

let DATA = {};

// Сбор списка глав
for (const chapter of fs.readdirSync(PATHS.ORIGINAL)) {
  if (chapter != ".DS_Store") DATA[chapter] = {};
}

// Внос всех одно-кадровых спрайтов
function add_singles(path) {
  const chapter_dir = fs.readdirSync(path, "utf-8");
  let temp = {};

  for (const sprite of chapter_dir)
    if (sprite.includes(".png")) temp[sprite.slice(0, -4)] = [0];

  return temp;
}

// Внос всех много-кадровых спрайтов
function add_animations(path) {
  const chapter_dir = fs.readdirSync(path, "utf-8");
  let temp = {};

  for (const sprite of chapter_dir) {
    if (!(sprite.endsWith(".png") || sprite.endsWith(".DS_Store"))) {
      let frames = new Array();

      const animation_dir = fs.readdirSync(`${path}/${sprite}`, "utf-8");
      for (let frame of animation_dir) {
        let frame_number = frame.split("_").at(-1) ?? "fuck";
        if (frame.endsWith(".png"))
          frames.push(Number(frame_number.slice(0, -4)));
      }

      temp[sprite] = frames.sort();
    }
  }
  return temp;
}

for (const chapter of Object.keys(DATA)) {
  const chapter_path = `${PATHS.ORIGINAL}/${chapter}`;
  DATA[chapter] = {
    ...add_animations(chapter_path),
    ...add_singles(chapter_path),
  };
}

fs.writeFileSync("./data.json", JSON.stringify(DATA));
