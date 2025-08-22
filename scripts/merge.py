import os
import sys
import shutil
from PIL import Image

in_dir = sys.argv[1]
out_dir = sys.argv[2]

os.makedirs(in_dir, exist_ok=True)
os.makedirs(out_dir, exist_ok=True)

sprs = {}

for item in os.listdir(in_dir):
    item_path = os.path.join(in_dir, item)
    
    if os.path.isfile(item_path) and item.lower().endswith('.png'):
        shutil.copy2(item_path, os.path.join(out_dir, item))
        continue
    
    if not os.path.isdir(item_path):
        continue
    
    frames = []
    for frame_file in os.listdir(item_path):
        if not frame_file.lower().endswith('.png'):
            continue
        
        try:
            frame_num = int(frame_file.split('_')[-1].split('.')[0])
            frames.append((frame_num, frame_file))
        except (IndexError, ValueError):
            continue
    
    frames.sort(key=lambda x: x[0])
    sprs[item] = []
    
    for _, frame_file in frames:
        try:
            img = Image.open(os.path.join(item_path, frame_file))
            sprs[item].append(img)
        except Exception as e:
            print(f"Ошибка загрузки {frame_file}: {e}")

for spr_name, images in sprs.items():
    if not images:
        continue
    
    width = images[0].width
    height = images[0].height
    total_width = width * len(images)
    
    sprite_sheet = Image.new('RGBA', (total_width, height))
    
    for i, img in enumerate(images):
        sprite_sheet.paste(img, (i * width, 0))
    
    output_path = os.path.join(out_dir, f"{spr_name}.png")
    sprite_sheet.save(output_path)
    print(f"Создан: {output_path} ({len(images)} кадров)")