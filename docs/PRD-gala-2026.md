# PRD — Mise à jour du site iscfund.com pour le Gala 2026

| Champ | Valeur |
|-------|--------|
| **Titre** | Mise à jour iscfund.com — Gala "Cathy Guetta for Sickle Cell" 2nd Edition |
| **Version** | 1.0 |
| **Date** | 23 mars 2026 |
| **Auteur** | Aurélien Brault |
| **Statut** | Draft — En attente de validation |
| **Deadline cible** | Avant le 1er mai 2026 (2,5 mois avant le gala du 16 juillet) |

---

## 1. Résumé Exécutif

Le site iscfund.com doit être mis à jour pour promouvoir la **2nde édition du Gala "Cathy Guetta for Sickle Cell"**, prévu le **16 juillet 2026 à Nikki Beach Saint-Tropez**. Les modifications incluent la mise à jour des dates et tarifs, l'ajout d'une prévente gala sur la page de dons, la valorisation des résultats de la 1ère édition (€250 000 levés), un nouvel angle éditorial centré sur les bébés atteints de drépanocytose (demande personnelle de Cathy Guetta), et l'ajout d'une section partenaires. Le site est actuellement figé sur l'événement de juillet 2025 (passé depuis 8 mois).

---

## 2. Contexte & Problème

### Situation actuelle

Le site iscfund.com a été développé pour la 1ère édition du gala en juillet 2025. Depuis, **aucune mise à jour n'a été effectuée** :

- **Dates obsolètes** : le site affiche "July 15th, 2025" alors que nous sommes en mars 2026
- **Tarifs obsolètes** : €1 000/siège et €10 000/table de 10, alors que les nouveaux prix sont €500/siège et €5 000/table VIP (8 guests)
- **Pas de prévente** : la page de dons ne propose pas d'option d'achat de places pour le gala 2026
- **Contenu éditorial incomplet** : aucune mention des résultats de la 1ère édition, aucun contenu ciblant les bébés/tout-petits

### Résultats de la 1ère édition (source : PDF partenaires V5)

- **€250 000** levés lors du gala 2025
- **95%** des fonds reversés à l'ONG Drep.Afrique
- **1 000 enfants** au Sénégal traités gratuitement pendant 3 ans
- **300 médecins africains** formés via une conférence universitaire sur la drépanocytose
- Lancement officiel du **DREPAF**, premier traitement contre la drépanocytose produit en Afrique au prix coûtant
- Partenariat historique avec **Teranga Pharma** : prix de l'hydroxyurea divisé par 3

### Objectif 2026

- Lever **€300 000** lors de la 2nde édition
- Étendre l'accès au DREPAF dans de **nouveaux pays africains** : Niger, Cameroun, Côte d'Ivoire, RDC, Guinée
- **200 invités** sélectionnés (philanthropes, entrepreneurs, artistes, leaders internationaux)

---

## 3. Objectifs

| # | Objectif | KPI | Cible | Échéance |
|---|----------|-----|-------|----------|
| O1 | Le site reflète les informations du gala 2026 | Toutes les dates et prix à jour | 100% des occurrences mises à jour | Avril 2026 |
| O2 | Permettre la prévente de places en ligne | Nombre de réservations via /donate | ≥ 30 réservations avant le 16 juillet | Mise en ligne → 16 juillet 2026 |
| O3 | Valoriser l'impact de la 1ère édition | Section visible sur la homepage | Taux de scroll > 60% sur la section | Avril 2026 |
| O4 | Mettre en avant les bébés/tout-petits | Contenu dédié visible sur la homepage | Section présente avec visuels | Avril 2026 |
| O5 | Renforcer la crédibilité avec les partenaires | Section partenaires visible | Logos affichés | Avril 2026 |

---

## 4. Personas

### Persona 1 : Le philanthrope / donateur potentiel

- **Profil** : Entrepreneur, cadre supérieur, personnalité publique, 35-65 ans
- **Motivation** : Contribuer à une cause impactante, accéder à un événement exclusif à Saint-Tropez
- **Comportement** : Découvre le site via recommandation ou réseau de Cathy Guetta, cherche à comprendre rapidement la cause et à réserver sa place
- **Besoin** : Processus de réservation simple et rapide, preuves d'impact réel

### Persona 2 : Le partenaire / sponsor potentiel

- **Profil** : Directeur marketing ou CEO d'une marque de luxe
- **Motivation** : Associer sa marque à une cause noble dans un cadre prestigieux (Saint-Tropez, Nikki Beach)
- **Comportement** : Reçoit le PDF partenaires puis visite le site pour validation
- **Besoin** : Site crédible, résultats passés prouvés, logos partenaires existants comme preuve sociale

### Persona 3 : L'entourage de Cathy Guetta

- **Profil** : Ami(e), connaissance, contact professionnel de Cathy
- **Motivation** : Soutenir Cathy personnellement dans son engagement
- **Comportement** : Partage le lien du site, fait un don ou réserve une place directement
- **Besoin** : Parcours simple, pas besoin de long argumentaire médical

---

## 5. User Stories

### US-1 : Prévente Gala — Réserver une place individuelle

> **En tant que** visiteur du site, **je veux** pouvoir acheter une place individuelle (€500) pour le gala du 16 juillet 2026, **afin de** participer à l'événement.

**Critères d'acceptation :**
- [ ] L'option "Individual Seat – €500" est visible sur la page /donate
- [ ] Le paiement Stripe fonctionne pour ce montant
- [ ] Un email de confirmation est envoyé (via Stripe receipt)
- [ ] Le paiement apparaît dans le dashboard admin avec le type "Gala – Individual Seat"

### US-2 : Prévente Gala — Réserver une table VIP

> **En tant que** visiteur du site, **je veux** pouvoir réserver une table VIP (€5 000, jusqu'à 8 invités) pour le gala, **afin de** venir avec mon groupe.

**Critères d'acceptation :**
- [ ] L'option "VIP Table – €5,000 (up to 8 guests)" est visible sur la page /donate
- [ ] Le paiement Stripe fonctionne pour ce montant
- [ ] Le paiement apparaît dans l'admin avec le type "Gala – VIP Table"

### US-3 : Faire un don pour le traitement

> **En tant que** visiteur, **je veux** continuer à pouvoir faire un don libre ou prédéfini (60€, 600€, 6 000€), **afin de** soutenir le traitement des enfants sans participer au gala.

**Critères d'acceptation :**
- [ ] Les options de dons existantes restent fonctionnelles
- [ ] La section dons est visuellement séparée de la section prévente gala
- [ ] L'option montant libre est toujours disponible

### US-4 : Découvrir l'impact de la 1ère édition

> **En tant que** visiteur, **je veux** voir les résultats concrets de la 1ère édition du gala, **afin de** comprendre l'impact réel de ma contribution potentielle.

**Critères d'acceptation :**
- [ ] Les chiffres clés de 2025 sont visibles sur la homepage (€250k levés, 1 000 enfants traités, 300 médecins formés)
- [ ] L'objectif 2026 (€300k) est mentionné
- [ ] Le lien entre les fonds levés et l'expansion dans de nouveaux pays est clair

### US-5 : Comprendre l'enjeu pour les bébés

> **En tant que** visiteur, **je veux** comprendre que la drépanocytose touche aussi les bébés dès la naissance et qu'un traitement existe dès 9 mois, **afin de** être sensibilisé à cet angle spécifique.

**Critères d'acceptation :**
- [ ] Une section dédiée aux bébés/tout-petits est visible sur la homepage
- [ ] Au moins un visuel de bébé est présent (images à fournir par l'équipe)
- [ ] Le message clé est clair : traitement possible dès 9 mois, 300 000 à 400 000 naissances/an
- [ ] Le positionnement différenciant est perceptible (focus bébés vs autres organisations qui ciblent "les enfants")

### US-6 : Voir les partenaires de la 1ère édition

> **En tant que** visiteur ou partenaire potentiel, **je veux** voir les marques qui ont soutenu la 1ère édition, **afin de** mesurer la crédibilité et le prestige de l'événement.

**Critères d'acceptation :**
- [ ] Les logos des partenaires 2025 sont affichés dans une section dédiée
- [ ] Les marques incluent au minimum : Petrus, Chopard, Audemars Piguet, Christian Louboutin, Amiri, Pucci, APM Monaco, Cincoro, Kujten, Sentara, Solo
- [ ] La section est titrée de manière claire (ex: "They supported the 1st Edition")

---

## 6. Scope

### In-Scope (cette version)

| # | Fonctionnalité | Priorité |
|---|---------------|----------|
| 1 | Mise à jour de toutes les dates : "July 15th, 2025" → "Thursday, July 16th, 2026" | **P0 — Must** |
| 2 | Mise à jour des prix : siège €500, table VIP €5 000 (8 guests) | **P0 — Must** |
| 3 | Mention "2nd Edition" sur la homepage et la section événement | **P0 — Must** |
| 4 | Ajout des options prévente gala sur /donate (VIP Table + Individual Seat) | **P0 — Must** |
| 5 | Séparation visuelle sur /donate : "Gala Pre-sale" vs "Donate for treatment" | **P0 — Must** |
| 6 | Mise à jour slug événement en base (nikki-beach-july-25 → nikki-beach-july-26) | **P0 — Must** |
| 7 | Mise à jour textes EventPresentationSection : "2nd edition", résultats 2025 | **P1 — Should** |
| 8 | Nouvelle section ou sous-section "Bébés & tout-petits" sur la homepage | **P1 — Should** |
| 9 | Ajout statistique : 300k-400k bébés naissent avec la drépanocytose chaque année | **P1 — Should** |
| 10 | Section partenaires 2025 (logos) sur la homepage | **P1 — Should** |
| 11 | Résultats chiffrés de la 1ère édition affichés sur la homepage | **P1 — Should** |
| 12 | Objectif 2026 (€300k, expansion pays africains) affiché | **P1 — Should** |
| 13 | Optimisation de l'image cathy-guetta.jpg (15.2MB → < 500KB) | **P2 — Could** |
| 14 | Ajout de photos de bébés (à fournir par l'équipe de Cathy) | **P2 — Could** |

### Out-of-Scope (cette version)

| # | Exclusion | Raison |
|---|-----------|--------|
| 1 | Système d'enchères/auction (actuellement désactivé) | Non demandé, fonctionnalité gelée |
| 2 | Internationalisation (FR/EN) | Non demandé, site anglais uniquement |
| 3 | Refonte graphique complète | Hors budget, seules des mises à jour de contenu sont demandées |
| 4 | Système d'emailing / CRM | Non demandé, hors périmètre technique actuel |
| 5 | Gestion des invités nominatifs pour les tables VIP | La prévente ne gère pas la liste des invités, seulement le paiement |
| 6 | Application mobile | Non demandé |
| 7 | Migration des credentials hors du .env | Recommandé mais hors scope de cette mise à jour |
| 8 | Refonte du système de booking /events/[slug]/book-table | On utilise la page /donate pour la prévente, pas le système de booking existant |

---

## 7. Requirements Fonctionnels

### RF-1 : Mise à jour des dates et de l'événement (P0)

**Description :** Remplacer toutes les occurrences de la date et des prix de l'édition 2025 par ceux de l'édition 2026.

**Détail des changements :**

| Composant | Champ | Ancien | Nouveau |
|-----------|-------|--------|---------|
| `HeroSection.tsx` | Date (desktop) | "July 15th, 2025" | "July 16th, 2026" |
| `HeroSection.tsx` | Date (mobile) | "July 15th, 2025" | "July 16th, 2026" |
| `HeroSection.tsx` | Libellé | "Cathy Guetta for Sickle Cell" | "Cathy Guetta for Sickle Cell — 2nd Edition" |
| `EventPresentationSection.tsx` | Date | "Tuesday, July 15th, 2025" | "Thursday, July 16th, 2026" |
| `EventPresentationSection.tsx` | Prix siège | €1,000 | €500 |
| `EventPresentationSection.tsx` | Prix table | €10,000 (table of 10) | €5,000 (VIP table, up to 8 guests) |
| `EventPresentationSection.tsx` | Mention édition | "first Gala" | "second edition" |
| `EventPresentationSection.tsx` | CTA booking | Lien vers `/events/nikki-beach-july-25/book-table` | Lien vers `/donate` (section prévente) |
| Base de données `Event` | slug | nikki-beach-july-25 | nikki-beach-july-26 |
| Base de données `Event` | date | 2025-07-15 | 2026-07-16 |
| Base de données `Event` | seatPrice | 1000 | 500 |
| Base de données `Event` | totalSeats | (inchangé ou 200) | 200 |

### RF-2 : Page /donate — Prévente Gala (P0)

**Description :** Ajouter deux options de prévente pour le gala 2026 sur la page de dons, visuellement séparées des dons classiques.

**Structure proposée de la page /donate :**

```
┌─────────────────────────────────────────┐
│           ISC Fund Logo                 │
├─────────────────────────────────────────┤
│                                         │
│   🎪 GALA DINNER — JULY 16TH, 2026     │
│   "Cathy Guetta for Sickle Cell"        │
│   Nikki Beach Saint-Tropez              │
│                                         │
│   ○ VIP Table — €5,000                  │
│     Up to 8 guests, dinner & wines      │
│                                         │
│   ○ Individual Seat — €500              │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│   💛 DONATE FOR TREATMENT               │
│   Help children access life-saving care │
│                                         │
│   ○ €60 — Help 1 child                 │
│   ○ €600 — Help 10 children            │
│   ○ €6,000 — Help 100 children         │
│   ○ Custom amount                       │
│                                         │
├─────────────────────────────────────────┤
│   [Donor Information Form]              │
│   Full Name / Email / Phone             │
│                                         │
│   [Continue to Payment]                 │
└─────────────────────────────────────────┘
```

**Comportement attendu :**
- Les options de prévente gala et les options de don sont mutuellement exclusives (un seul choix possible)
- Le formulaire de contact et le flux de paiement Stripe restent identiques
- Les paiements de prévente doivent avoir un `description` Stripe distinct (ex: "Gala 2026 – VIP Table" ou "Gala 2026 – Individual Seat") pour le suivi admin
- Les préventes apparaissent dans le dashboard admin `/admin/payments`

### RF-3 : Textes 2nd Edition & Résultats 2025 (P1)

**Description :** Mettre à jour le contenu textuel de la homepage pour refléter la 2nde édition et valoriser les résultats de la 1ère.

**Section `EventPresentationSection` — Changements :**
- Remplacer "first Gala" par "second edition"
- Ajouter un bloc "Impact 2025" avec les résultats clés :
  - €250,000 levés
  - 95% reversés à Drep.Afrique
  - 1 000 enfants traités au Sénégal (3 ans de traitement gratuit)
  - 300 médecins africains formés
  - Lancement officiel du DREPAF
- Ajouter l'objectif 2026 : €300,000 pour étendre l'accès au DREPAF dans 5 nouveaux pays (Niger, Cameroun, Côte d'Ivoire, RDC, Guinée)
- Mentionner : 200 invités soigneusement sélectionnés, soirée la plus exclusive de l'été

### RF-4 : Section Bébés / Tout-petits (P1)

**Description :** Ajouter du contenu spécifiquement dédié aux bébés et tout-petits atteints de drépanocytose, conformément à la demande de Cathy Guetta.

**Contenu clé à intégrer :**
- 300 000 à 400 000 bébés naissent chaque année avec la drépanocytose (source OMS / PDF)
- Le traitement (hydroxyurea / DREPAF) peut être administré dès l'âge de **9 mois**
- Angle différenciant : la plupart des organisations parlent de "children" — ISC Fund et Cathy Guetta mettent en lumière les **bébés et tout-petits** (1, 2, 3 ans) dont le diagnostic précoce et le traitement rapide peuvent changer le cours de leur vie
- Emplacements possibles : enrichir la section `WhatIsSickleSection` existante OU créer une nouvelle section dédiée entre WhatIsSickle et DonateSection

**Assets nécessaires (à fournir par l'équipe) :**
- 1 à 3 photos de bébés/tout-petits (droits validés pour le web)
- Format recommandé : JPG/WebP, < 500KB, ratio 4:3 ou 1:1

### RF-5 : Section Partenaires 2025 (P1)

**Description :** Ajouter une section sur la homepage affichant les logos des partenaires et sponsors de la 1ère édition.

**Logos à afficher :**
- Petrus
- Chopard
- Audemars Piguet (Le Brassus)
- Christian Louboutin
- Amiri
- Pucci
- APM Monaco
- Cincoro
- Kujten
- Sentara
- Solo
- Jack-e (Presented by)

**Assets nécessaires :**
- Logos en format PNG/SVG sur fond transparent
- Possibilité d'extraire depuis le PDF partenaires (page 8)

**Emplacement proposé :** Nouvelle section entre la `DrepafSection` et la `DonateSection`, ou après la `DonateSection` avant le footer.

---

## 8. Requirements Non-Fonctionnels

| # | Catégorie | Requirement | Critère |
|---|-----------|-------------|---------|
| RNF-1 | Performance | Optimiser l'image cathy-guetta.jpg | Passer de 15.2MB à < 500KB (compression + WebP) |
| RNF-2 | Performance | Temps de chargement homepage | LCP < 2.5s sur mobile 4G |
| RNF-3 | Compatibilité | Mobile responsive | Toutes les nouvelles sections s'adaptent aux écrans < 768px |
| RNF-4 | Paiement | Stripe en production | Les nouvelles options de paiement fonctionnent avec les clés live |
| RNF-5 | Admin | Suivi des préventes | Les paiements de prévente gala sont identifiables dans l'admin |
| RNF-6 | SEO | Metadata à jour | Title et description OG reflètent le gala 2026 |

---

## 9. Risques & Hypothèses

### Risques

| # | Risque | Probabilité | Impact | Mitigation |
|---|--------|-------------|--------|------------|
| R1 | Photos de bébés non fournies à temps | Moyenne | Moyen | Utiliser des photos placeholder ou stock en attendant ; livrer la section texte d'abord |
| R2 | Logos partenaires non disponibles en haute qualité | Faible | Faible | Extraire depuis le PDF, les nettoyer si besoin |
| R3 | L'ancien slug d'événement (nikki-beach-july-25) a des réservations en base | Faible | Moyen | Créer un nouvel enregistrement Event plutôt que de modifier l'existant |
| R4 | Confusion utilisateur entre prévente gala et don classique | Moyenne | Moyen | Séparation visuelle forte sur la page /donate, titres explicites |

### Hypothèses

> **Hypothèse 1 :** La page /donate sera le point d'entrée unique pour la prévente gala (pas de système de booking séparé comme en 2025). Le flux existant de booking `/events/[slug]/book-table` ne sera pas utilisé pour 2026.

> **Hypothèse 2 :** Les préventes gala (table VIP et siège individuel) ne nécessitent pas de collecte d'informations supplémentaires sur les invités au moment du paiement. La gestion des noms d'invités se fera hors-site.

> **Hypothèse 3 :** Le site reste en anglais uniquement. Les textes issus du PDF (en anglais) peuvent être utilisés ou adaptés.

> **Hypothèse 4 :** L'enchère live et la loterie seront gérées sur place le jour du gala, pas en ligne. Le système d'auction existant (désactivé) n'est pas réactivé.

---

## 10. Timeline

| Phase | Contenu | Durée estimée |
|-------|---------|---------------|
| **Phase 1 — Critique** | Mise à jour dates/prix + prévente gala sur /donate | 1-2 jours |
| **Phase 2 — Contenu** | Textes 2nd edition, résultats 2025, section bébés | 1 jour |
| **Phase 3 — Partenaires** | Section logos partenaires, optimisation image | 0,5 jour |
| **Phase 4 — QA & Go Live** | Tests Stripe, vérification mobile, mise en production | 0,5 jour |

**Total estimé : 3-4 jours de développement**

---

## 11. Dépendances externes

| Dépendance | Responsable | Statut | Impact si absent |
|------------|------------|--------|-----------------|
| Photos de bébés/tout-petits | Équipe Cathy Guetta | En attente | Section bébés livrée sans visuels (texte only) |
| Logos partenaires HD | Équipe ISC Fund | Disponible (PDF) | Extraction depuis le PDF possible |
| Validation des prix définitifs (€500/€5000) | Client (email) | Confirmé | — |
| Confirmation date 16 juillet 2026 | Client (PDF + email) | Confirmé | — |

---

*Ce document est un document vivant. Il sera mis à jour au fur et à mesure de l'avancement du projet et des retours des stakeholders.*
