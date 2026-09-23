# Forest Spots

A one-button map for tagging places in the woods you want to come back to.
Satellite view of Saratoga Springs / Greenfield Center, a **Tag this spot** button, done.

## Put it on GitHub Pages

1. Create a new **public** repository (for example `forest-spots`).
2. Upload `index.html`, `sw.js` and this `README.md` (Add file → Upload files → Commit changes).
3. Settings → Pages → Build and deployment → Source: **Deploy from a branch** → Branch `main`, folder `/ (root)` → Save.
4. After a minute or so the app is live at `https://<your-username>.github.io/forest-spots/`.
   Open it on your phone, allow location, and use **Add to Home Screen** for a full-screen app.

## Using it

- The pill at the top shows GPS quality. When it's green (under ~50 ft) you'll get a good tag.
- **Tag this spot** saves your position instantly and opens a popup where you can name it.
- Tap any pin (or the list button, bottom-left) to see distance and direction from where you are,
  get walking directions, **Move to me** (re-tag the pin to your current position), or delete it.
- The blue dot is you. The crosshair button re-centres the map on you and follows as you walk.
- The layers button (top-right) turns road names and labels on or off.

## Don't lose your spots

Spots are stored in the browser on your phone, and they're also written into the page's link
(the `#s=...` part). **Share link** in the list drawer sends that link anywhere — text it to
yourself or a friend and every spot comes back when the link is opened. **Export GPX** hands the
spots to AllTrails, Gaia GPS, Google Earth or anything else that reads GPX.

Note: on iPhone, a Home Screen copy of the app keeps its own saved spots separately from Safari.
If you tag spots in one and want them in the other, use Share link.

## Offline in the forest

Open the app once on Wi-Fi and zoom around the area you'll be walking. Every map tile you look at
is cached on the phone (that's what `sw.js` does), so the map still shows with no signal.
GPS itself doesn't need a signal.
