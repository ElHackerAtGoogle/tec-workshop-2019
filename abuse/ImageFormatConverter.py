import math
import sys
import time

from PIL import Image

# This file converts an input image colors into a the ids for an specified 16
# color palette.

# Computes euclidean distance between colors.
def distance(c1, c2):
    (r1, g1, b1) = c1
    (r2, g2, b2) = c2
    return math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2)

# Finds the closest color from a color palette to the given rgb_point.
def find_color_id_from_palette(rgb_point):
    rgb_color_palette = {
        (255, 255, 255): 0,
        (228, 228, 228): 1,
        (136, 136, 136): 2,
        (34, 34, 34): 3,
        (255, 167, 209): 4,
        (229, 0, 0): 5,
        (229, 149, 0): 6,
        (160, 106, 66): 7,
        (229, 217, 0): 8,
        (148, 224, 68): 9,
        (2, 190, 1): 10,
        (0, 211, 211): 11,
        (0, 131, 199): 12,
        (0, 0, 234): 13,
        (207, 110, 228): 14,
        (130, 0, 128): 15
    }
    colors = list(rgb_color_palette.keys())
    closest_colors = sorted(colors, key=lambda color: distance(color, rgb_point))
    closest_color = closest_colors[0]
    color_id = rgb_color_palette[closest_color]
    return color_id


img = Image.open(sys.argv[1])
converted_picture = []
for y in range(img.height):
    color_ids = []
    for x in range(img.width):
        pixel = img.getpixel((x, y))
        if (pixel[3] == 0):
            # If the pixel has a transparent pixel, set it to be white.
            color_ids.append(0)
            continue
        color_id = find_color_id_from_palette((pixel[0], pixel[1], pixel[2]))
        color_ids.append(color_id)
    converted_picture.append(color_ids)
print '[' + ',\n'.join(str(p) for p in converted_picture) + ']'
