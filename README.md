# aaronYTDev's Corner

Welcome to my corner of the internet. Find it here:
https://aaronytdevs-corner.netlify.app/

A small, build-free static site — just HTML, CSS and vanilla JavaScript, served
straight from this repo by Netlify (no build step required).

## Structure

```
index.html            Home page
TPOAF.html            "The Plaster Of All Files" — shared files
example.html          Example page
fileremoved.html      "File removed" error page
404.html              Not-found page (used automatically by Netlify)
articles/             The articles section
  index.html            Article index
  template.html         Template for new articles
  *.html                Individual articles
assets/
  css/style.css       The shared theme (dark-first, with a light mode)
  js/main.js          Theme toggle, mobile nav, active links, reading progress
```

## Theme

The site ships a modern dark theme with a light mode toggle. The choice is saved
to `localStorage` and, until a visitor picks a theme, it follows their operating
system's `prefers-color-scheme`.

## Adding an article

1. Copy `articles/template.html` to a new file in `articles/`.
2. Replace the `(placeholders)` — title, date, writer/editor and body.
3. Add a card linking to it in `articles/index.html`.

## License

See [LICENSE](LICENSE).
