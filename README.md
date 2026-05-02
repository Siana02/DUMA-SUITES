# Duma Suites

**Luxury Coastal Living in Watamu** — Nestled in the heart of Watamu within the prestigious Ghepard Towers, Duma Suites offers an exceptional blend of modern elegance, comfort, and prime coastal living. Located just 50 metres from the white sands and turquoise waters of the Indian Ocean.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Animations | GSAP · Framer Motion · React Spring |
| Icons | Lucide React |
| Motion Graphics | Lottie React |
| Parallax | React Parallax Tilt |
| PWA | Vite Plugin PWA |
| SEO | React Helmet Async |
| Scroll Triggers | React Intersection Observer |

## Typography

| Role | Font |
|---|---|
| Eyebrow / accent titles | Playfair Display |
| General Manager's message | Parisienne |
| Navigation · CTAs | Cinzel |
| Main section headings | Cormorant Garamond |
| Guest review text | Caveat |

## Colour Palette

| Token | Hex | Usage |
|---|---|---|
| Soft Nude | `#f7f1e5` | Primary background |
| Light Stone | `#eeebe7` | Alternating sections |
| Muted Beige | `#e9e6d8` | Tertiary sections |
| Champagne Beige | `#d4c2a8` | Premium / highlight sections |
| Refined Teal | `#58b0c4` | Primary CTA · accent |
| Espresso Brown | `#563311` | Secondary CTA · headings |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx           # Sticky nav with mobile drawer (Framer Motion)
│   ├── HeroSection.jsx      # Full-screen hero (GSAP + React Parallax Tilt)
│   ├── GMMessageSection.jsx # GM quote (Framer Motion + Intersection Observer)
│   ├── SuitesSection.jsx    # Suite cards (React Spring)
│   ├── AmenitiesSection.jsx # Amenity grid (Framer Motion stagger)
│   ├── ReviewsSection.jsx   # Guest reviews (Caveat font)
│   ├── CTASection.jsx       # Reservation CTA (GSAP)
│   └── Footer.jsx           # Multi-column footer
├── App.jsx                  # Root layout
├── index.css                # Global design system (CSS custom properties)
└── main.jsx                 # Entry point with HelmetProvider
```

