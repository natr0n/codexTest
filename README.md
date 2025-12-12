# Sacrament Meeting Planner

A lightweight, mobile-friendly planner for building and sharing LDS sacrament meeting agendas. The tool lets leaders capture announcements, hymns, speakers, and prayers, and export a print-ready PDF program.

## Getting started
Open `index.html` in your browser. No build tools are required.

### Run a local server (recommended for testing)
If you want to exercise the app in a realistic browser environment or access it from a phone on your network, start a quick static server from the project root:

```bash
# Option 1: use Python's built-in server
python3 -m http.server 8000

# Option 2: use the provided Make target
make serve
```

Then visit http://localhost:8000 in your browser. Stop the server with `Ctrl+C`.

## Features
- Capture meeting metadata, hymns, and prayers
- Quickly add or remove announcements and speakers
- Live agenda preview formatted like a handout
- One-click PDF export via the browser print dialog (print-specific styles hide editing controls)
- Responsive layout tailored for phones and tablets

## Tips
- Use the agenda preview card as the single source of truth while conducting a meeting; it mirrors the printable handout.
- For the cleanest PDF, use your browser's "Save as PDF" option and choose "Background graphics" when available so hymn numbers and dividers render crisply.
- On mobile, rotate to landscape before printing to avoid squashing the program layout.
