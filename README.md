# Portfolio — GitHub Pages deployment

This repository contains a static portfolio website (HTML/CSS/JS). The repository includes a GitHub Actions workflow that will automatically deploy the site to GitHub Pages whenever you push to the `main` branch.

Quick steps to publish (PowerShell):

1. If you haven't already initialized git in this folder and created a GitHub repo, run:

```powershell
# from the repository root
git init
git add .
git commit -m "Initial site"

# create a new repo on GitHub (you can do this on github.com), then add the remote:
git remote add origin https://github.com/<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
```

2. After pushing `main`, GitHub Actions will run the workflow `.github/workflows/deploy.yml` to publish the site to GitHub Pages. The workflow uploads the repository root as the pages artifact and deploys it.

3. Expected site URL:

```
https://<your-username>.github.io/<your-repo>/
```

4. Verification and troubleshooting:

- Check the Actions tab on GitHub for the workflow run and logs.
- Visit Settings → Pages on GitHub to confirm the site was published and view the site URL.
- If your site requires files with underscores or other file names Jekyll might process, the `.nojekyll` file is included to prevent Jekyll from running.

Notes / optional:

- If you want a custom domain, add a `CNAME` file containing your domain at the repository root, or set it in Settings → Pages.
- If you prefer to publish to the `gh-pages` branch instead, we can replace the workflow with a different action that pushes to `gh-pages`.

If you want, I can also:

- create a `CNAME` file for a custom domain,
- switch the workflow to publish only the `public/` directory if you move site files there,
- or create a simple script to build and minify assets before publishing.
