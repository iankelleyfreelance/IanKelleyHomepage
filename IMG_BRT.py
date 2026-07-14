#!/usr/bin/env python3
"""IMG_BRT — name, resolution, aspect ratio, avg brightness per image in a folder.
Usage: python IMG_BRT.py [folder]   (default: ./images)
Requires: pip install pillow
"""
import sys, math
from pathlib import Path
from PIL import Image, ImageStat

EXTS = {".jpg", ".jpeg", ".png", ".webp", ".bmp", ".gif", ".tiff"}

def brightness(img, sample=400):
    g = img.convert("L")
    g.thumbnail((sample, sample))
    return ImageStat.Stat(g).mean[0]

def main(folder):
    folder = Path(folder)
    print("name,width,height,ratio,aspect,avg_brightness")
    for f in sorted(folder.iterdir()):
        if f.suffix.lower() not in EXTS:
            continue
        try:
            with Image.open(f) as img:
                w, h = img.size
                b = brightness(img)
        except Exception as e:
            print(f"{f.name},ERROR,{e}", file=sys.stderr)
            continue
        d = math.gcd(w, h)
        print(f"{f.name},{w},{h},{w//d}:{h//d},{round(w/h,3)},{round(b,1)}")

if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "images")
