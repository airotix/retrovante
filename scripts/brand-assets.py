"""Rebuild vector-style brand icons and the share card. Requires Pillow."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parents[1] / 'public'
INK, PAPER = '#161513', '#e7e4db'

def mark(size):
    im = Image.new('RGB', (size, size), INK)
    d = ImageDraw.Draw(im)
    def box(coords):
        return tuple(round(n * size / 64) for n in coords)
    d.rectangle(box((18, 17, 25, 47)), fill=PAPER)
    d.rounded_rectangle(box((21, 17, 44, 37)), radius=round(size * 10/64), fill=PAPER)
    d.rounded_rectangle(box((25, 23, 37, 31)), radius=round(size * 4/64), fill=INK)
    d.polygon([tuple(round(n * size / 64) for n in pt) for pt in [(29,34),(37,34),(47,47),(38,47)]], fill=PAPER)
    return im

master = mark(1024)
for name, size in [('favicon-96.png',96),('apple-touch-icon.png',180),('icon-192.png',192),('icon-512.png',512)]:
    master.resize((size,size), Image.Resampling.LANCZOS).save(OUT/name)
master.save(OUT/'favicon.ico', sizes=[(16,16),(32,32),(48,48)])

im = Image.new('RGB', (1200,630), PAPER)
d = ImageDraw.Draw(im)
fonts = Path('C:/Windows/Fonts')
def font(name, size):
    return ImageFont.truetype(str(fonts/name),size)
d.rectangle((36,36,1164,594), outline='#b8b4a8', width=2)
d.text((76,72), 'RETROVANTE', font=font('arialbd.ttf',32), fill=INK)
d.text((76,190), 'Leather that', font=font('arialbd.ttf',78), fill=INK)
d.text((76,277), 'remembers.', font=font('georgiai.ttf',86), fill=INK)
d.text((80,416), 'FULL-GRAIN LEATHER JACKETS', font=font('arial.ttf',22), fill='#58554c')
d.text((80,520), 'retrovante.com', font=font('arial.ttf',22), fill=INK)
im.paste(master.resize((200,200),Image.Resampling.LANCZOS),(910,215))
im.save(OUT/'social-card.png', optimize=True)
print('Generated favicon, touch icons and 1200 x 630 sharing card.')
