---
name: Dr. Gonzalo Matovelle
description: The wall of framed titles in a Quito consulting room, rendered as a website.
colors:
  wall: "#eeede8"
  wall-deep: "#e4e3dc"
  mat: "#ffffff"
  frame: "#161616"
  ink: "#17181a"
  ink-soft: "#44474d"
  muted: "#64686f"
  ribbon: "#1273c2"
  ribbon-deep: "#0a5a9c"
  ribbon-tint: "#dcedf9"
  seal-gold: "#b8922e"
  night-wall: "#1b1c1f"
  night-ink: "#ececea"
  night-ribbon: "#6cb6f2"
  night-ribbon-ink: "#0b1320"
typography:
  wordmark:
    fontFamily: "'Grenze Gotisch Variable', 'UnifrakturMaguntia', serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.005em"
  display:
    fontFamily: "'Bodoni Moda Variable', 'Bodoni 72', 'Didot', Georgia, serif"
    fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "'Bodoni Moda Variable', 'Bodoni 72', 'Didot', Georgia, serif"
    fontSize: "clamp(1.9rem, 3.6vw, 2.75rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.005em"
  title:
    fontFamily: "'Bodoni Moda Variable', 'Bodoni 72', 'Didot', Georgia, serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.2
  lead:
    fontFamily: "'Schibsted Grotesk Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.65
  body:
    fontFamily: "'Schibsted Grotesk Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  body-small:
    fontFamily: "'Schibsted Grotesk Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.938rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Schibsted Grotesk Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.16em"
  plaque:
    fontFamily: "'Schibsted Grotesk Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.656rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.16em"
rounded:
  none: "0"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2.5rem"
  xl: "4rem"
  section: "clamp(4.5rem, 9vw, 8rem)"
components:
  button-primary:
    backgroundColor: "{colors.ribbon}"
    textColor: "{colors.mat}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "1rem 1.6rem"
  button-primary-hover:
    backgroundColor: "{colors.ribbon-deep}"
    textColor: "{colors.mat}"
  button-plate:
    backgroundColor: "{colors.mat}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "1rem 1.6rem"
  frame:
    backgroundColor: "{colors.mat}"
    rounded: "{rounded.none}"
    padding: "clamp(0.75rem, 2vw, 1.5rem)"
  plaque:
    backgroundColor: "{colors.frame}"
    textColor: "{colors.mat}"
    rounded: "{rounded.none}"
    padding: "clamp(2rem, 4vw, 3rem)"
---

# Design System: Dr. Gonzalo Matovelle

## Overview

**Creative North Star: "La pared de títulos"**

The site is the wall of photograph 4: white plaster, and on it, in thin black
frames with wide white mats, the things a forty-year career hangs up. The
doctor's name is lettered the way it is on his real Universidad Central
diploma. The one colour is the clear blue of the diploma ribbon. Everything
that matters is an object hung on that wall: the portrait, the photographs of
the consulting room, the credentials, the plaque with the phone number.

Density is museum-low: one object per moment, generous wall around it, text
set with the discipline of an engraved certificate. Motion is physical and
singular: frames settle onto the wall once, on arrival, and lift slightly
under the pointer. Nothing floats, glows or slides sideways.

Confirmed rejections: the previous navy-and-brass "trust" world (cream paper,
brass accent, navy bands) is the anti-reference; no cream grounds, no brass,
no gradients, no rounded cards, no icon tiles.

**Key Characteristics:**
- Plaster wall as the ground, white mats as the only raised surface.
- Frames: 1px to 2px near-black, square corners, a real offset shadow.
- One accent, the ribbon blue, used for the action and for nothing decorative.
- Bodoni display over a neutral grotesk; the blackletter wordmark is the mark.
- Photography of the real office, never stock.

## Colors

Plaster, black frame, white mat, and one ribbon blue; gold exists only inside
the seal device.

### Primary
- **Ribbon Blue** (#1273c2): the single accent. Primary buttons, links in body
  copy, the active language, the focus ring, the thin rule under the hero
  credential line. Never a background for a whole section.
- **Ribbon Deep** (#0a5a9c): hover and pressed state of the accent.
- **Ribbon Tint** (#dcedf9): the one soft tint, used behind the FAQ item that
  is open and nothing else.

### Neutral
- **Plaster Wall** (#eeede8): page background. A plaster white, not cream.
- **Wall Shade** (#e4e3dc): alternate section ground when two wall sections
  must read as different rooms.
- **Mat White** (#ffffff): the inside of every frame, the face of plate
  buttons, the credential band.
- **Frame Black** (#161616): frames, the contact plaque ground, the footer
  rule.
- **Sill** (#161616 on the light wall, rgba(255,255,255,0.32) in the night
  gallery): the 4px rule under the publications shelf and atop the footer, so
  they stay visible when Frame Black darkens to #050505.
- **Ink** (#17181a), **Ink Soft** (#44474d), **Muted** (#64686f): text on the
  wall and on mats; Muted is the floor for captions (4.6:1 on the wall).
- **Seal Gold** (#b8922e): only inside the circular seal device.

### Night gallery (prefers-color-scheme: dark)
- **Night Wall** (#1b1c1f) replaces the plaster, **Night Ink** (#ececea)
  replaces Ink, **Night Ribbon** (#6cb6f2) replaces Ribbon Blue for text and
  focus, and **Night Ribbon Ink** (#0b1320) is the label colour on the
  lighter blue plates. Mats stay white: the photographs stay lit on a dark
  wall.

### Named Rules
**The One Ribbon Rule.** Blue appears on the thing you can act on, on the
active state, and on the single rule under the credential line. If a blue
element cannot be clicked or does not report state, it is wrong.

**The No-Cream Rule.** The wall is plaster (#eeede8); any warmer or yellower
ground reintroduces the retired world.

## Typography

**Wordmark Font:** Grenze Gotisch Variable (fallback UnifrakturMaguntia, serif)
**Display Font:** Bodoni Moda Variable, optical size axis (fallback Bodoni 72, Didot, Georgia)
**Body Font:** Schibsted Grotesk Variable (fallback Helvetica Neue, Arial)

**Character:** engraved certificate meets a quiet newspaper grotesk. Bodoni
carries the doctor's voice at display sizes; Schibsted carries everything a
visitor has to read quickly; the blackletter is reserved for his name.

### Hierarchy
- **Wordmark** (500, 1.5rem, 1): "Dr. Gonzalo Matovelle" in the header, the
  footer and the plaque under the portrait. Nowhere else.
- **Display** (500, clamp(2.4rem, 4.5vw, 3.6rem), 1.04): the hero headline
  only; three lines at desktop, never five.
- **Headline** (500, clamp(1.9rem, 3.6vw, 2.75rem), 1.1): section titles.
- **Title** (600, 1.375rem, 1.2): card, group and FAQ question titles; the
  five expertise plates step down to 1.125rem so five fit in a row.
- **Lead** (400, 1.125rem, 1.65): the sentence under a section title.
- **Body** (400, 1.0625rem, 1.65): prose, max 62ch.
- **Body small** (400, 0.938rem, 1.6): card bodies, notes, footer.
- **Label** (600, 0.75rem, 0.16em tracking, uppercase): engraved caps for the
  hero eyebrow, the credential band, buttons.
- **Plaque** (600, 0.656rem, 0.16em tracking, uppercase): the black plaques
  under frames and the role line under the wordmark.

### Named Rules
**The One Blackletter Rule.** The blackletter sets the doctor's name and
nothing else: never a headline, never a label.

**The Two Eyebrows Rule.** Tracked uppercase labels above a headline exist in
the hero and above the areas of expertise. Other sections open with the
headline itself.

## Layout

A single centred shell of 1200px with a fluid gutter (clamp(1.25rem, 5vw,
4rem)). Sections are rooms on the same wall, separated by a hairline rule and
clamp(4.5rem, 9vw, 8rem) of vertical space; more space above a heading than
below it. Objects hang in two-column compositions on desktop (text column
plus one framed object), stacking to one column under 900px with the frame
first when the frame is the subject and second when the text is. The hero
is a two-column wall: text left, the framed portrait right, the credential
band as an engraved strip beneath. Long lists (memberships) break into two
columns at 700px; the five areas of expertise hang as five plates in a row
that wraps to three over two (a 6-column grid, no empty cell), then one.

## Elevation & Depth

Depth is physical: the only shadow is the one a frame casts on a wall. It has
an offset and a soft blur and is tinted with the ink colour. Text, bands and
buttons are flat. Hover lifts a frame 2px and deepens its shadow; nothing
else moves.

### Shadow Vocabulary
- **Frame at rest** (`box-shadow: 0 1px 2px rgba(23,24,26,0.18), 0 10px 20px -8px rgba(23,24,26,0.30), 0 28px 48px -18px rgba(23,24,26,0.42)`): every framed object.
- **Frame lifted** (`box-shadow: 0 2px 4px rgba(23,24,26,0.20), 0 14px 26px -8px rgba(23,24,26,0.34), 0 36px 60px -18px rgba(23,24,26,0.50)`): hover.

### Named Rules
**The Only-Frames-Cast-Shadows Rule.** If an element has a shadow, it is a
frame holding something.

## Shapes

Square. Radius is 0 everywhere: frames, mats, buttons, plaques, the language
toggle. Borders are 1px hairlines in Frame Black at 14% on the wall and solid
on the frames (2px for the hero portrait, 1px elsewhere). The mat is the
recurring silhouette: a white rectangle with equal padding inside a thin
black rectangle.

## Components

### Buttons
- **Shape:** square plates (0 radius), 1px border, engraved caps label.
- **Primary (ribbon):** Ribbon Blue ground, white caps, border Ribbon Blue;
  padding 1rem 1.6rem. The header call button is the same plate, compact.
- **Hover / Focus:** ground to Ribbon Deep; focus ring 2px Ribbon Blue
  offset 3px. Active presses 1px down.
- **Plate (secondary):** Mat White ground, Ink caps, Frame Black border;
  hover inverts to Frame Black with white caps.
- **On plaque:** on the black plaque the secondary plate is transparent with
  a white 40% border and white caps; hover fills white with ink caps.

### Frames (signature component)
- A `figure.frame`: Frame Black border, Mat White padding (clamp(0.75rem,
  2vw, 1.5rem)), the image inside with no radius, the frame shadow. The hero
  portrait uses the 2px frame and a wider mat; section photos use the 1px
  frame. Each frame may carry a `.plaque-caption`: a small black plaque,
  engraved caps in white, hung directly under the frame.

### Plates (credential cards)
- Areas of expertise hang as white plates: Mat White ground, 1px Frame Black
  border plus an inner 1px mat outline (inset 7px), no shadow, title in Bodoni, body in the grotesk. No icons.

### Contact plaque
- Frame Black ground, white text, the phone number in Bodoni at display
  size, label in engraved caps; primary button on it is Ribbon Blue, the
  WhatsApp plate is the on-plaque secondary.

### Navigation
- White plaster header with a hairline bottom rule; wordmark left, links in
  the grotesk with a 1px underline on hover and a Ribbon Blue underline when
  active; the language toggle is two square cells; the call plate is last.
  Under 640px the header stops being sticky and the links wrap under the wordmark.

### FAQ
- Native details/summary rows separated by hairlines; the open item's row
  takes the Ribbon Tint; the marker is a plus that turns into a minus.

## Do's and Don'ts

### Do:
- **Do** hang every photograph in a mat and a frame with the frame shadow.
- **Do** keep the ground plaster (#eeede8) and the mats pure white.
- **Do** set section titles in Bodoni Moda and everything readable in Schibsted Grotesk.
- **Do** use the ribbon blue only on actions, active states and the hero rule.
- **Do** keep every corner square.

### Don't:
- **Don't** use cream, beige, brass or navy grounds.
- **Don't** add tracked uppercase eyebrows beyond the hero and the areas of expertise.
- **Don't** add icons, icon tiles or decorative dots.
- **Don't** use the blackletter for anything but the doctor's name.
- **Don't** animate anything except the frames' single settle and their hover lift.
