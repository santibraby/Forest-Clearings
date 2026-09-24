# Forest Spots

A one-button map for the woods. Tap **Tag my location** and the phone's GPS position is saved as a pin -
a patch of boletes, a sunny clearing worth sketching in, anything you want to find again.
Satellite view of Saratoga Springs / Greenfield Center. Styled to the FRC tool design language (`frc-tool-style`).

Live at https://santibraby.github.io/Forest-Clearings/ (capital F and C - the address is case-sensitive).

## Using it

- Open it on your phone, allow location, and add it to your Home Screen.
- The top-right readout shows GPS accuracy in feet. Peach means a good fix (under ~50 ft); dim means rough;
  pulsing means it is still searching. Under tree cover, standing still for 15-20 seconds usually tightens it up.
- **Tag my location** saves where you are standing right now. You never need to find yourself on the map.
  A popup opens so you can name the spot.
- Tap any pin to see distance and direction from where you are now, get walking directions, **Move to me**
  (re-tag it to your current position), or delete it.
- The vivid dot is you. The rail on the right, top to bottom:
  - list - saved spots (nearest first) and slime trails, plus Share link and Export GPX
  - crosshair - center on me and follow as you walk
  - route - **slime trail**: tap to start recording your path as a line on the map, tap again to stop
  - layers - roads and place names on or off

## Property outline

The peach outline is the boundary of 175 Wilton Rd, walked from the survey's bearings and distances
(one strip length hidden on the photo was solved from loop closure; the sheet says 6.00 acres, the outline
computes to 6.1) and placed on the imagery by fitting the three houses on the survey to the houses in the
satellite view, with the road frontage held parallel to the pavement. Expect it to be within a few metres
near the houses and the road; the far south end is extrapolated from the survey calls, so treat it as
approximate there. The coordinates live in `PROPERTY` at the top of the script in `index.html`.

## Slime trail

While a trail is recording, the route icon pulses and the readout shows `REC` with the distance so far.
The trail is saved as you go, survives a reload, and the app keeps the screen awake for you - the phone
cannot record GPS with the screen locked, so leave the app open while you walk. If the phone does sleep
for more than ten minutes, the next stretch starts as a new trail instead of a straight line across the gap.
Tap a trail line for its length and duration, or to delete it.

## Don't lose your spots

Spots are stored in the browser on your phone, and they are also written into the page's link
(the `#s=...` part). **Share link** sends that link anywhere - text it to yourself or a friend and every
spot comes back when the link is opened. **Export GPX** hands spots and trails to AllTrails, Gaia GPS,
Google Earth or anything else that reads GPX.

Note: on iPhone, a Home Screen copy of the app keeps its own saved spots separately from Safari.
If you tag spots in one and want them in the other, use Share link.

## Offline in the forest

Open the app once on Wi-Fi and zoom around the area you will be walking. Every map tile you look at
is cached on the phone (that is what `sw.js` does), so the map still shows with no signal.
GPS itself does not need a signal.

## Files

- `index.html` - the whole app
- `sw.js` - offline cache for the app and map tiles
