# Dr. Shaik Imamvali — Academic Portfolio (starter)

This is a raw HTML, CSS and JavaScript front-end starter tailored to the uploaded CV.

## Files
- `index.html` — public portfolio page
- `style.css` — navy / ivory / gold responsive design
- `script.js` — mobile menu, publication search/filter and email-draft contact form
- `admin.html` — placeholder only; it does not authenticate users yet

## Run locally
1. Extract the ZIP to a folder.
2. Open the folder in Visual Studio Code.
3. Install the **Live Server** extension if you do not already have it.
4. Right-click `index.html` and select **Open with Live Server**.

You can also open `index.html` directly in a browser, but Live Server is recommended for development.

## Important before publishing
- This is a draft preview. Review all biography details, publication metadata, counts, links and wording with the professor.
- No Supabase credentials are included. Supabase has not been connected yet.
- Do not enter credentials into `admin.html`; its login form is intentionally inactive.
- The contact form opens a prepared email draft; it does not save messages to a database yet.
- Keep private residential addresses and referee contact details off the public website.
- Once the database is created, configure Row Level Security policies before exposing any tables to the browser.
