"""Generate delivery-sized WebP variants without changing original artwork.
Run with Python + Pillow only when jacket source images change.
"""
from pathlib import Path
from PIL import Image
import json

root = Path(__file__).resolve().parents[1] / 'src/assets/jackets'
out = root / 'responsive'
out.mkdir(exist_ok=True)
dimensions = {}
for source in sorted(root.glob('*.webp')):
    with Image.open(source) as image:
        dimensions[source.stem] = {'width': image.width, 'height': image.height}
        for width in (480, 960):
            height = round(image.height * width / image.width)
            variant = image.resize((width, height), Image.Resampling.LANCZOS)
            variant.save(out / f'{source.stem}-{width}.webp', 'WEBP', quality=80, method=6)
(out / 'dimensions.json').write_text(json.dumps(dimensions, indent=2) + '\n')
print('Original bytes:', sum(p.stat().st_size for p in root.glob('*.webp')))
for width in (480, 960):
    print(f'{width}px bytes:', sum(p.stat().st_size for p in out.glob(f'*-{width}.webp')))
