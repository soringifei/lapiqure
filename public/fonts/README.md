# Fonts Directory

Place your licensed Copperplate webfont files here.

## Required Files

- `copperplate.woff2` - Copperplate regular (WOFF2 format)
- `copperplate.woff` - Copperplate regular (WOFF format)
- `copperplate-bold.woff2` - Copperplate bold (WOFF2 format)
- `copperplate-bold.woff` - Copperplate bold (WOFF format)

## Font Sources

You can obtain licensed Copperplate webfonts from:
- [Adobe Fonts](https://fonts.adobe.com/) (with Creative Cloud subscription)
- [MyFonts](https://www.myfonts.com/)
- [Fonts.com](https://www.fonts.com/)

## Converting Fonts

If you have TTF/OTF files, convert them to WOFF/WOFF2:
- Online: [Transfonter](https://transfonter.org/)
- CLI: [fonttools](https://github.com/fonttools/fonttools)

## Usage

Once fonts are added, they will be loaded via the `@font-face` declarations in `app/globals.css` and used throughout the site with the `font-display` class.

## Fallback

Until licensed fonts are added, the site will use system serif fonts as fallbacks defined in `tailwind.config.ts`.
