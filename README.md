# Cat Tracker — CS 319 Sprint 1

**Author:** Fahamida Hena

## Purpose
A beginner-friendly web app for storing and managing cat profiles. Sprint 1 supports adding, viewing, editing, and deleting cat profiles. GPS tracking is planned for a later sprint and is not included yet.

## Technologies
HTML5, CSS3, JavaScript (no external packages), browser localStorage.

## Prerequisites
A modern desktop or mobile web browser (for example, Google Chrome). No software installation or account is required to run the app.

## Installation and running
1. Download or clone the project repository.
2. Open the `SourceCode` folder (or the repository root if these files are at its root).
3. Double-click `index.html` to open it in a web browser.
4. If the browser blocks localStorage on local files, use a simple local web server instead: open a terminal in the folder containing `index.html`, run `python -m http.server 8000` (Python 3 required for this optional method), and open `http://localhost:8000`.

## Trying Sprint 1 functionality
1. Enter a name, age, and breed, then click **Save cat**.
2. Confirm the cat appears under **My cats**.
3. Refresh the page and confirm the cat remains visible.
4. Click **Edit**, change the information, and click **Update cat**.
5. Click **Delete**, then confirm the deletion.
6. Try saving with an empty name, and try an age outside 0–40. Both should show validation messages.

## Storage and configuration
Profiles are stored in the current browser's `localStorage`, under `cs319-cat-tracker-cats-v1`. No API keys, account, configuration files, or backend are needed. Data is local to the browser and device; clearing site data removes it.

## Known limitations
- No GPS location, maps, alerts, accounts, or synchronization between devices yet.
- No cloud backup or database; profiles remain only in the browser used to create them.
- No automated tests in Sprint 1; acceptance criteria are checked manually.
- This is a classroom prototype, not a production pet-safety tracker.
