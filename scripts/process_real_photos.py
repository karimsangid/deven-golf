# Crop + clean the real DEVEN flat-lay photos into consistent 4:5 product shots.
# Maps strictly to the inventory: 4 colours x 2 logo styles = 8 SKUs (front+back).
import os
import numpy as np
from PIL import Image, ImageOps

SRC = os.path.join(os.path.dirname(__file__), "..", "_incoming", "hl")
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "images")

# index prefix -> file (downloaded as NN_<id>.jpg)
def find(idx):
    for f in os.listdir(SRC):
        if f.startswith(f"{idx:02d}_"):
            return os.path.join(SRC, f)
    raise FileNotFoundError(idx)

# (front_idx, back_idx) per SKU — chosen by colour + logo style after viewing all 23
MAP = {
    "yellow-shoulder":      (2, 1),
    "yellow-chest":         (13, 8),
    "gray-shoulder":        (3, 16),
    "gray-chest":           (20, 17),
    "light-blue-shoulder":  (12, 5),
    "light-blue-chest":     (9, 7),
    "navy-shoulder":        (11, 6),
    "navy-chest":           (19, 15),
}

def process(src, dst, ratio=4/5, max_dim=1300, thr=38):
    im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    arr = np.asarray(im).astype(int)
    h, w, _ = arr.shape
    cs = 40
    corners = np.concatenate([
        arr[:cs, :cs].reshape(-1, 3), arr[:cs, -cs:].reshape(-1, 3),
        arr[-cs:, :cs].reshape(-1, 3), arr[-cs:, -cs:].reshape(-1, 3)])
    bg = np.median(corners, axis=0)
    diff = np.abs(arr - bg).sum(axis=2)
    mask = diff > thr
    ys, xs = np.where(mask)
    if len(xs) < 0.02 * h * w:
        x0, y0, x1, y1 = 0, 0, w, h
    else:
        x0, x1 = int(np.percentile(xs, 1)), int(np.percentile(xs, 99))
        y0, y1 = int(np.percentile(ys, 1)), int(np.percentile(ys, 99))
    mx, my = int((x1 - x0) * 0.06), int((y1 - y0) * 0.06)
    x0, y0 = max(0, x0 - mx), max(0, y0 - my)
    x1, y1 = min(w, x1 + mx), min(h, y1 + my)
    crop = im.crop((x0, y0, x1, y1))
    cw, ch = crop.size
    bgc = tuple(int(v) for v in bg)
    if cw / ch > ratio:
        newh = int(round(cw / ratio))
        canvas = Image.new("RGB", (cw, newh), bgc)
        canvas.paste(crop, (0, (newh - ch) // 2))
    else:
        neww = int(round(ch * ratio))
        canvas = Image.new("RGB", (neww, ch), bgc)
        canvas.paste(crop, ((neww - cw) // 2, 0))
    canvas.thumbnail((max_dim, max_dim * 2), Image.LANCZOS)
    canvas.save(dst, "JPEG", quality=84, optimize=True)
    return canvas.size

for sku, (fi, bi) in MAP.items():
    fs = process(find(fi), os.path.join(OUT, f"p-{sku}.jpg"))
    bs = process(find(bi), os.path.join(OUT, f"p-{sku}-back.jpg"))
    print(f"{sku:22s} front={fs} back={bs}")
print("done")
