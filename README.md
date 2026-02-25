# Chambo Wave Website

Minimal, mobile-compatible static site for Chambo Wave using:

- `index.html`
- `styles.css`
- `script.js`
- local 4K SVG assets in `assets/`

## Run locally

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy on GitHub Pages

1. Push this repository to GitHub.
2. In GitHub, open `Settings` > `Pages`.
3. Under `Build and deployment`, choose:
   - `Source`: `Deploy from a branch`
   - `Branch`: `main` (or your default branch), folder `/ (root)`
4. Save and wait for Pages to publish.
5. Your site will be available at:
   - `https://<your-username>.github.io/<repo-name>/`

