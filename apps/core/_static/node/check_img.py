#!/usr/bin/env python
import os
import glob
from PIL import Image

PATH = os.path.dirname(os.path.abspath(__file__))

standard_sub_path = '../assets/img/sprite/standard'
hd_sub_path = '../assets/img/sprite/hd'

standard_path = os.path.join(PATH, standard_sub_path)
hd_path = os.path.join(PATH, hd_sub_path)

standard_glob = glob.glob(
    os.path.join(standard_path, '*.png')
)

hd_glob = glob.glob(
    os.path.join(hd_path, '*.png')
)

# check lengh
if len(standard_glob) != len(hd_glob):
    if len(standard_glob) < len(hd_glob):
        print 'Error: hd has %d more images' % (len(hd_glob) - len(standard_glob))
    else:
        print 'Error: standard has %d more images' % (len(standard_glob) - len(hd_glob))

for i in range(len(standard_glob)):
    standard_img_path = standard_glob[i]
    standard_img = Image.open(standard_img_path)
    hd_img_path = standard_img_path.replace(standard_sub_path, hd_sub_path)
    hd_img = Image.open(hd_img_path)

    if standard_img.size[0] * 2 != hd_img.size[0] or standard_img.size[1] * 2 != hd_img.size[1]:
        print 'Error: %s differs im width or height' % (
            standard_img_path.replace(standard_path, '')
        )

        print '     standard %sx%s\n     hd %sx%s' % (
            standard_img.size[0] * 2,
            standard_img.size[1] * 2,
            hd_img.size[0],
            hd_img.size[1]
        )
