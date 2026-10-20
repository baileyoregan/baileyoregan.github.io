# Bailey O'Regan — personal site

Live at https://baileyoregan.com (hosted free on GitHub Pages).

## What's in here

| File | What it does |
|------|--------------|
| `content.js` | **All the words on the site.** Edit this to change the text. |
| `index.html` | The page structure. |
| `style.css` | Colors, fonts, layout. |
| `CNAME` | Tells GitHub Pages to serve the site at baileyoregan.com. Don't delete it. |

There's no build step: what's in this folder is exactly what gets published.

## Changing the text

1. Open `content.js` in any text editor.
2. Change the text between the quotes, e.g. `tagline: "Designer & developer"`.
3. Save the file.

To preview before publishing, just double-click `index.html` to open it in your browser.

## Publishing your changes

In Terminal, from this folder:

```bash
git add -A
git commit -m "Describe what you changed"
git push
```

GitHub rebuilds the site automatically. Changes are usually live within a minute or two
(refresh with Cmd+Shift+R if you still see the old version).

## If something breaks

- Check the build status: `gh run list` or the **Actions** tab on GitHub.
- Undo the last change: `git revert HEAD` then `git push`.
