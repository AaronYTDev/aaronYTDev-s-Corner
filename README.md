# aaronYTDev's Corner

Source for my site: https://aaronytdevs-corner.netlify.app/

Plain HTML, CSS, and vanilla JavaScript. No build step, no npm, no bundler.
Netlify serves the files in this repo as they are.

## Structure

```
index.html            Home page
TPOAF.html            "The Plaster Of All Files", shared files
example.html          Example page
fileremoved.html      File removed page
404.html              Not found page, used automatically by Netlify
articles/             The writing section
  index.html            Post index
  template.html         Template for new posts
  *.html                Individual posts
assets/
  css/style.css       Shared theme, paper by default with a dark mode
  js/main.js          Theme toggle, mobile nav, active links, reading progress
```

## Theme

Paper coloured by default, warm dark mode behind the toggle in the header. The
choice goes into `localStorage`. If a visitor has never picked one, the page
follows their `prefers-color-scheme` instead.

## Adding a post

1. Copy `articles/template.html` to a new file in `articles/`.
2. Fill in the title, date, writer, and body.
3. Link it from `articles/index.html`, and from the Writing block on
   `index.html` if it belongs in the top three.

The post count on the writing index is counted from the page at load time, so
only the static fallback number in the HTML needs a bump.

## License

See [LICENSE](LICENSE).
