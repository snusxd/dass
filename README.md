# DASS

**D**eltarune **A**uto-**S**orting **S**prites — a utility for automating the sorting of modified Deltarune sprites.

[Русская версия README](https://github.com/snusxd/dass/blob/main/README_RU.md)

[How it works](#how-it-works)\
[UNIQUE.TXT](#uniquetxt)\
[What's SORTED-MERGED?](#whats-sorted-merged)\
[Installation](#installation)

## How it works

The basic idea is laughably simple.

The folder `_sprites/original` contains the original game sprites. Whenever the `_sprites` folder is changed (deletions don’t seem to trigger it), two archives are built in the Actions tab: `sorted` and `sorted-merged`. These archives hold sprites sorted relative to `_sprites/original`.

### It’s easier to show than to tell!

Right now the sprite `IMAGE_LOGO.png` is used in every chapter (i.e. it lives in `_sprites/original/chapter1`, `_sprites/original/chapter2`, and so on).  
Thanks to DASS you only need to drop the modified `IMAGE_LOGO.png` into `_sprites/translation`, and when the workflow finishes, that sprite will be replaced in every chapter inside both `sorted` and `sorted-merged`!

That’s all. Nothing complicated.

> [!Warning]  
> Animated sprites are compared frame-by-frame. If the modified sprite has fewer or more frames, you’ll get a conflict. This is intentional for sprites like `_sprites/original/spr_castle_shop`, where only one frame needs translation and the rest must stay put.  
> If the sprite is _supposed_ to have a different number of frames, [read on](#installing-a-completely-unique-frame-count).

## UNIQUE.TXT file

Sometimes automation gets in the way and you have to specify something manually — that’s what `_sprites/unique.txt` is for.  
With it you can: add a completely unique sprite or set a completely unique frame count for an animated sprite.

### Adding unique sprites

To add your own sprite to the final `sorted` and `sorted-merged` archives:

1. Put the unique sprite into `_sprites/translation`.
2. Open `_sprites/unique.txt`.
3. Under `UNIQUE FOR SORTING:` write the **final path** of the file (as it should appear in `sorted` and `sorted-merged`).

Example:

```

UNIQUE FOR SORTING:
chapter4/sprite1

```

DASS will place `sprite1` into the `chapter4` folder in the output. Just `folder/name` — no extra symbols or `.png`!

### Setting a completely unique frame count

To set a completely unique frame count:

1. Put a folder with the sprite into `_sprites/translation` (the folder must contain **all** required frames).
2. Open `_sprites/unique.txt`.
3. Under `UNIQUE FRAME COUNT:` write only the sprite’s name.

Example:

```

UNIQUE FRAME COUNT:
sprite3

```

DASS won’t check the frame count of `sprite3`; instead, it will simply copy the entire sprite folder into `sorted` and its combined version `sorted-merged` (everywhere the sprite is used).

## What's SORTED-MERGED?

This archive was added for easier use with [Deltranslate](https://neprim.itch.io/deltranslate-project). All animated sprites are concatenated into a single strip, letting Deltranslate import them effortlessly!

## Installation

To start using DASS comfortably, fork this repository… and that’s it! The repo already has a workflow that builds `sorted` and `sorted-merged`.

Forked it? Add your sprites to `_sprites/translations` and get to work! The resulting archives will be waiting for you in the Actions tab.

# Happy translating!
