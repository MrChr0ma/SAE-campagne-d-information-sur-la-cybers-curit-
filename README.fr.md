🇬🇧 [English version](README.md)

# SecureHealth – Plateforme de sensibilisation à la cybersécurité

Une plateforme web qui forme le personnel d'un hôpital fictif (« SecureHealth ») aux bases de la cybersécurité. Elle a été réalisée pour une campagne de sensibilisation (projet de SAE) en première année du Bachelor Cybersécurité de l'EPITA.

Le site est entièrement statique : il n'y a ni backend ni base de données, et rien de ce qu'on y tape n'est envoyé ailleurs.

## Fonctionnalités

| Page | Route | Ce qu'elle fait |
|---|---|---|
| Accueil | `/` | Présente la campagne et renvoie vers les quatre modules |
| Détection de phishing | `/phishing` | Une boîte mail simulée avec 3 e-mails. Pour chacun, l'utilisateur décide s'il s'agit de phishing ou non, et il obtient tout de suite une explication des signaux d'alerte. |
| Robustesse des mots de passe | `/password` | Une jauge de force en direct (score de 0 à 5 selon longueur ≥ 8, longueur ≥ 12, majuscules et minuscules, chiffres, symboles), une estimation grossière du temps de cassage, une liste de critères et des bonnes pratiques |
| Classification des données | `/data-classification` | Un quiz où chaque document doit être classé *Public*, *Interne* ou *Confidentiel*. Les points sont attribués avec un bonus de série. |
| Base de connaissances | `/awareness` | Des fiches courtes sur le phishing, les rançongiciels, l'ingénierie sociale, les fuites de données et les malwares |

Le contenu du site est en anglais.

## Technologies

- [Next.js 16](https://nextjs.org) (App Router) avec React 19 et TypeScript
- Tailwind CSS 4
- framer-motion pour les animations et lucide-react pour les icônes

## Prérequis

- Node.js 20 ou plus récent
- npm

## Lancement

```bash
git clone https://github.com/MrChr0ma/SAE-campagne-d-information-sur-la-cybers-curit-.git
cd SAE-campagne-d-information-sur-la-cybers-curit-
npm install
npm run dev
```

Ouvre ensuite <http://localhost:3000>.

Autres scripts :

```bash
npm run lint    # ESLint
npm run build   # build de production
npm run start   # sert le build de production
```

## Structure du projet

```
src/
├── app/
│   ├── page.tsx                  # page d'accueil
│   ├── phishing/page.tsx
│   ├── password/page.tsx
│   ├── data-classification/page.tsx
│   ├── awareness/page.tsx
│   ├── layout.tsx                # barre de navigation + pied de page
│   └── globals.css
├── components/
│   ├── layout/                   # Navbar, Footer
│   └── ui/                       # Button, Card, Input
└── lib/utils.ts                  # fonction cn() (clsx + tailwind-merge)
```

## État d'avancement

Les quatre modules fonctionnent, et `npm run lint` et `npm run build` passent. Pistes d'amélioration :

### TODO
- [ ] Ajouter des e-mails à la simulation de phishing (il y en a 3 pour l'instant).
- [ ] Sur l'accueil, aligner la description de la carte « Data Classification » (*Public, Private, High Security*) sur les catégories réellement utilisées dans le quiz (*Public, Internal, Confidential*).
- [ ] Ajouter des tests.

## Équipe

Projet de SAE réalisé en groupe à l'EPITA. L'équipe du projet est indiquée dans le pied de page du site.
