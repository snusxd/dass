# DASS

**D**eltarune **A**uto-**S**orting **S**prites — a utility for automatically sorting modified Deltarune sprites. :contentReference[oaicite:0]{index=0}

[Русская версия README](https://github.com/snusxd/dass/blob/main/README_RU.md)

[How it works](#how-it-works)  
[UNIQUE.TXT](#uniquetxt)  
[Installation](#installation)

## How it works

The underlying principle is laughably simple.

There is a folder `_sprites/original` that contains the game’s original sprites. Every time the `_sprites` folder changes *(except, as I’ve noticed, file deletions)*, an archive named `sorted` is created in the Actions tab. That archive contains sprites sorted relative to `_sprites/original`.

### Easier to show than to tell

Suppose there’s a sprite `IMAGE_LOGO.png` currently used in every chapter (i.e. it sits in `_sprites/original/chapter1`, `_sprites/original/chapter2`, etc.).  
Thanks to the utility, you only need to put **your** sprite `IMAGE_LOGO.png` into `_sprites/translation`. After the workflow finishes, that sprite will be replaced in every chapter inside the `sorted` archive!

That’s really all there is to it—no complicated logic.

> [!Warning]
> Animated sprites take their original frame count. If your modified sprite has fewer or more frames, a conflict occurs.  
> This behaviour is intended for sprites like `_sprites/original/spr_castle_shop`, where only one frame needs translating and the rest must stay intact.  
> If a sprite **needs** a different frame count, [see below](#setting-a-completely-unique-frame-count).

## UNIQUE.TXT

There are a few cases where automation isn’t enough, and you need to enter data manually. That’s what `_sprites/unique.txt` is for.  
With it you can add a completely unique sprite or set a unique frame count for an animated sprite.

### Adding unique sprites

To add your own sprite to the final `sorted` archive:

1. Place the unique sprite in `_sprites/translation`.  
2. Open `_sprites/unique.txt`.  
3. Under `UNIQUE FOR SORTING:` write the **final path** of the file (inside `sorted`).

Example:

```

UNIQUE FOR SORTING:
chapter4/sprite1

```

This entry adds `sprite1` to folder `chapter4` in the output. Format is simply `folder/filename`, no extra symbols or extensions.

### Setting a completely unique frame count

To set a unique frame count:

1. Add the sprite folder to `_sprites/translation` (include **all** required frames).  
2. Open `_sprites/unique.txt`.  
3. Under `UNIQUE FRAME COUNT:` just write the sprite’s name.

Example:

```

UNIQUE FRAME COUNT:
sprite3

```

This entry skips frame checking for `sprite3` and simply copies the entire sprite folder into `sorted` (wherever the sprite is used).

## Installation

To use DASS comfortably, fork this repository… and that’s it.  
The repo already contains a configured workflow that handles everything.

Fork created? You can start adding your files to `_sprites/translations` and get to work. Remember: the finished archive waits in the Actions tab!

# Enjoy!
