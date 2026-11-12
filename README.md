🇫🇷 [Version française](README.fr.md)

# SecureHealth – Cybersecurity Awareness Platform

A web platform that trains the staff of a fictional hospital ("SecureHealth") in basic cybersecurity. It was built for a cybersecurity awareness campaign (SAE project) in the first year of the EPITA Cybersecurity Bachelor.

The site is fully static: there is no backend and no database, and nothing typed into it is sent anywhere.

## Features

| Page | Route | What it does |
|---|---|---|
| Home | `/` | Introduces the campaign and links to the four modules |
| Phishing Detection | `/phishing` | A simulated inbox with 3 emails. For each one, the user decides whether it is phishing or safe, and gets immediate feedback that explains the warning signs. |
| Password Strength | `/password` | A live strength meter (score 0–5 based on length ≥ 8, length ≥ 12, mixed case, digits and symbols), a rough crack-time estimate, a requirements checklist and best practices |
| Data Classification | `/data-classification` | A quiz where each document has to be classified as *Public*, *Internal* or *Confidential*. Points are awarded with a streak bonus. |
| Knowledge Hub | `/awareness` | Short sheets on phishing, ransomware, social engineering, data breaches and malware |

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) with React 19 and TypeScript
- Tailwind CSS 4
- framer-motion for animations and lucide-react for icons

## Requirements

- Node.js 20 or later
- npm

## Getting started

```bash
git clone https://github.com/MrChr0ma/SAE-campagne-d-information-sur-la-cybers-curit-.git
cd SAE-campagne-d-information-sur-la-cybers-curit-
npm install
npm run dev
```

Then open <http://localhost:3000>.

Other scripts:

```bash
npm run lint    # ESLint
npm run build   # production build
npm run start   # serve the production build
```

## Project structure

```
src/
├── app/
│   ├── page.tsx                  # home page
│   ├── phishing/page.tsx
│   ├── password/page.tsx
│   ├── data-classification/page.tsx
│   ├── awareness/page.tsx
│   ├── layout.tsx                # navbar + footer
│   └── globals.css
├── components/
│   ├── layout/                   # Navbar, Footer
│   └── ui/                       # Button, Card, Input
└── lib/utils.ts                  # cn() helper (clsx + tailwind-merge)
```

## Status

All four modules work, and `npm run lint` and `npm run build` both pass. Possible improvements:

### TODO
- [ ] Add more emails to the phishing simulation (there are 3 for now).
- [ ] Add tests.

## Team

A group SAE project at EPITA. The project team is listed in the site footer.
