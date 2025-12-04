# JR Steel Welding Website - Agent Context

## Quick Reference
- **Live Site:** https://www.jrsteelwelding.com
- **GitHub Repo:** https://github.com/malvaezr/jrsteelwelding
- **Local Path:** /Users/rubenmalvaez/Documents/Projects/jrsteelwelding-redesign
- **Hosting:** GitHub Pages (FREE)
- **Domain Registrar:** Squarespace (DNS only, ~$15/year)

---

## Project Overview

**Client:** J & R Steel Welding LLC
**Business:** Professional steel erection, precast wall panels, and metal decking installation in Texas
**Experience:** 20+ years in business

### Design Style
- **Theme:** Industrial Minimal Hybrid
- **Primary Color (Green):** `#2e8b57` - Used for section tags, service icons, stat numbers, form focus states
- **Accent Color (Orange):** `#ff6b35` - Used for CTAs, buttons, filter buttons, hover states
- **Dark Background:** `#0a0a0a` to `#2d2d2d` gradient
- **Typography:**
  - Display: Bebas Neue (headings)
  - Body: Inter (text)

---

## File Structure

```
jrsteelwelding-redesign/
├── index.html          # Main HTML (all sections)
├── CNAME               # Custom domain config (www.jrsteelwelding.com)
├── css/
│   └── styles.css      # All styles (~1100 lines)
├── js/
│   └── main.js         # All interactivity (~300 lines)
├── images/
│   └── projects/       # Project photos go here
└── .claude/
    └── agent-context.md  # This file
```

---

## Website Sections

1. **Navigation** - Fixed navbar, mobile hamburger menu
2. **Hero** - Full-screen with animated stats counter (150+ projects, 20+ years, 100% safety)
3. **Services** - 3 cards: Steel Erection, Precast Wall Panels, Metal Decking
4. **Projects** - Filterable gallery (Commercial, Educational, Healthcare, Industrial)
5. **Safety** - Split layout with safety features and 100% safety badge
6. **Testimonials** - Carousel slider with 3 testimonials
7. **Quote Form** - Contact form with service type, timeline, project details
8. **Footer** - Links, social icons, contact info

---

## Interactive Features

| Feature | Location | How It Works |
|---------|----------|--------------|
| Scroll animations | All sections | IntersectionObserver adds `.visible` class |
| Counter animation | Hero stats | Counts up when in viewport |
| Project filters | Projects section | Filter buttons show/hide cards by `data-category` |
| Media slider | Project cards | Prev/next buttons cycle through images |
| Testimonial carousel | Testimonials | Auto-advances every 6s, swipe support |
| Mobile menu | Navbar | Hamburger toggle with slide-in menu |
| Form validation | Quote section | HTML5 validation + success state |

---

## How to Make Updates

### Change Colors
Edit CSS variables in `css/styles.css` (lines 16-23):
```css
--color-primary: #2e8b57;      /* Green */
--color-accent: #ff6b35;        /* Orange */
--color-orange: #ff6b35;
```

### Add/Edit Projects
In `index.html`, find `<!-- Projects Grid -->` (~line 176). Each project card:
```html
<div class="project-card animate-on-scroll" data-category="commercial">
    <div class="project-media">
        <div class="media-slider" data-project="projectname">
            <img src="images/projects/project-1.jpg" alt="Description">
            <img src="images/projects/project-2.jpg" alt="Description" class="hidden">
        </div>
        <!-- controls and overlay -->
    </div>
    <div class="project-info">
        <span class="project-category">Commercial</span>
        <h3 class="project-title">Project Name</h3>
        <p class="project-desc">Description here</p>
    </div>
</div>
```

Categories: `commercial`, `educational`, `healthcare`, `industrial`

### Add Project Images
1. Place images in `images/projects/`
2. Naming convention: `projectname-1.jpg`, `projectname-2.jpg`
3. Update `src` attributes in HTML

### Edit Testimonials
In `index.html`, find `<!-- Testimonials Section -->` (~line 323). Each testimonial:
```html
<div class="testimonial-card">
    <div class="testimonial-content">
        <p class="testimonial-text">"Quote here..."</p>
        <div class="testimonial-author">
            <h4>Name</h4>
            <span>Title, Company</span>
        </div>
    </div>
</div>
```

### Update Contact Info
Search for these in `index.html`:
- Phone: `(555) 123-4567`
- Email: `info@jrsteelwelding.com`
- Location: `Central Texas`

---

## Deployment Process

### To deploy changes:
```bash
cd /Users/rubenmalvaez/Documents/Projects/jrsteelwelding-redesign
git add -A
git commit -m "Description of changes"
git push
```

Changes go live within 1-2 minutes.

### To check deployment status:
```bash
gh api repos/malvaezr/jrsteelwelding/pages
```

---

## DNS Configuration

**Squarespace DNS Settings:**

| Host | Type | Value |
|------|------|-------|
| @ | A | 185.199.108.153 |
| @ | A | 185.199.109.153 |
| @ | A | 185.199.110.153 |
| @ | A | 185.199.111.153 |
| www | CNAME | malvaezr.github.io |
| app | CNAME | malvaezr.github.io |

---

## Image Requirements

### Project Images
- **Format:** JPG or PNG
- **Recommended size:** 800x600px (4:3 ratio)
- **Location:** `images/projects/`

### Expected Files (based on current HTML):
```
images/projects/
├── georgetown-1.jpg, georgetown-2.jpg
├── pflugerville-1.jpg, pflugerville-2.jpg
├── temple-isd-1.jpg, temple-isd-2.jpg
├── woodsboro-1.jpg, woodsboro-2.jpg, woodsboro-3.jpg
├── ward-burke-1.jpg, ward-burke-2.jpg
└── saint-austin-1.jpg, saint-austin-2.jpg, saint-austin-3.jpg
```

---

## Form Integration

Currently the form simulates submission. To make it functional:

### Option 1: Formspree (Recommended, Free)
1. Sign up at formspree.io
2. Get form endpoint
3. Update `<form>` action in index.html:
```html
<form action="https://formspree.io/f/YOUR_ID" method="POST">
```

### Option 2: Netlify Forms
If migrating to Netlify, add `netlify` attribute to form.

---

## Common Tasks Cheatsheet

| Task | Command/Action |
|------|----------------|
| View site locally | `open index.html` |
| Deploy changes | `git add -A && git commit -m "msg" && git push` |
| Check if site is up | `curl -I https://www.jrsteelwelding.com` |
| View GitHub repo | `gh repo view --web` |
| Check Pages status | `gh api repos/malvaezr/jrsteelwelding/pages` |

---

## History

- **Created:** December 2024
- **Original Platform:** Squarespace
- **Migrated to:** GitHub Pages
- **Design by:** Claude (AI Assistant)
- **Owner:** Ruben Malvaez (malvaezr)

---

## Cost Savings

| Item | Squarespace | GitHub Pages |
|------|-------------|--------------|
| Hosting | $192-600/year | $0 |
| Domain | ~$15/year | ~$15/year |
| **Total** | **$207-615/year** | **$15/year** |
