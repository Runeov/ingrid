# Inger Helene Nettbutikk — Brukerveiledning

## Innhold

1. [Kom i gang](#kom-i-gang)
2. [Aktivere GitHub Pages](#aktivere-github-pages)
3. [Administrasjonspanel](#administrasjonspanel)
4. [Legge til produkter](#legge-til-produkter)
5. [Anbefalte produkter (Forsiden)](#anbefalte-produkter-forsiden)
6. [Redigere og slette produkter](#redigere-og-slette-produkter)
7. [Handlekurv og bestilling](#handlekurv-og-bestilling)
8. [Aktivere Vipps-betaling](#aktivere-vipps-betaling)
9. [Fargeprofil](#fargeprofil)
10. [Teknisk oversikt](#teknisk-oversikt)

---

## Kom i gang

Nettbutikken er bygget med Next.js og er klar til å kjøres både lokalt og på GitHub Pages.

### Kjøre lokalt

1. Åpne terminalen og naviger til prosjektmappen:
   ```
   cd inger-helene-shop
   ```

2. Installer avhengigheter:
   ```
   npm install
   ```

3. Start utviklingsserveren:
   ```
   npm run dev
   ```

4. Åpne nettleseren og gå til **http://localhost:3000**

---

## Aktivere GitHub Pages

For å publisere butikken slik at den er tilgjengelig på nett:

1. Gå til repositoriet på GitHub (f.eks. https://github.com/Runeov/ingrid)

2. Klikk på **Settings** (tannhjulikonet øverst)

3. I sidemenyen, klikk på **Pages**

4. Under **"Build and deployment"**, finn **Source**

5. Endre fra "Deploy from a branch" til **GitHub Actions**

6. Klikk **Save**

7. Gå til **Actions**-fanen i repositoriet — en ny utrulling starter automatisk

8. Når den er ferdig (grønt merke), er butikken live på:
   ```
   https://DITT-BRUKERNAVN.github.io/REPO-NAVN/
   ```
   For eksempel: **https://runeov.github.io/ingrid/**

### Oppdatere butikken

Hver gang du pusher endringer til `main`-branchen, vil GitHub Actions automatisk bygge og publisere en ny versjon.

---

## Administrasjonspanel

Administrasjonspanelet finner du på adressen **/admin/** (f.eks. https://runeov.github.io/ingrid/admin/).

Her kan du:
- Se oversikt over antall produkter, anbefalte produkter og gjennomsnittspris
- Legge til nye produkter
- Redigere eksisterende produkter
- Slette produkter
- Markere produkter som "Anbefalt" (vises på forsiden)

> **Merk:** I GitHub Pages-versjonen lagres alle produktdata i nettleserens localStorage. Det betyr at endringer du gjør kun er synlige i din egen nettleser. For en produksjonsversjon med delt database, se [Teknisk oversikt](#teknisk-oversikt).

---

## Legge til produkter

1. Gå til **/admin/**

2. Klikk på knappen **"+ Legg til nytt produkt"**

3. Fyll inn feltene:
   - **Produktnavn** — Navnet som vises i butikken (f.eks. "Myk Merinoull Garn")
   - **Beskrivelse** — En detaljert beskrivelse av produktet
   - **Pris (kr)** — Prisen i norske kroner
   - **Kategori** — Velg mellom:
     - **Garn** — Garn og tråd
     - **Utstyr** — Strikkepinner, maskemarkører osv.
     - **Oppskrifter** — Strikkeoppskrifter
   - **Produktbilde** — Klikk på opplastingsfeltet for å velge et bilde fra datamaskinen
   - **Anbefalt produkt** — Huk av for å vise produktet på forsiden

4. Klikk **"Legg til produkt"**

### Tips for gode produktbilder
- Bruk bilder med god belysning
- Kvadratiske eller liggende bilder fungerer best
- Bildet vises i 240px høyde i produktlisten og 450px på produktsiden

---

## Anbefalte produkter (Forsiden)

Forsiden viser produkter som er markert som "Anbefalt". Slik administrerer du dette:

### Fra produktlisten i admin:
- Finn produktet i tabellen
- Klikk på knappen **"Ikke anbefalt"** for å gjøre det til anbefalt (knappen blir gul med teksten "Anbefalt")
- Klikk på **"Anbefalt"** for å fjerne det fra forsiden

### Når du oppretter/redigerer et produkt:
- Huk av for **"Vis som anbefalt produkt (forsiden)"** i produktskjemaet

Anbefalte produkter vises under overskriften **"Inger Helenes Favoritter"** på forsiden.

---

## Redigere og slette produkter

### Redigere
1. Gå til **/admin/**
2. Finn produktet i tabellen
3. Klikk **"Rediger"**
4. Gjør endringene i skjemaet
5. Klikk **"Lagre endringer"**

### Slette
1. Gå til **/admin/**
2. Finn produktet i tabellen
3. Klikk **"Slett"**
4. Bekreft slettingen i dialogboksen

---

## Handlekurv og bestilling

### For kunder:

1. **Bla gjennom produkter** — Gå til "Produkter" i menyen og filtrer etter kategori (Alle, Garn, Utstyr, Oppskrifter)

2. **Se produktdetaljer** — Klikk på et produkt for å se full beskrivelse og bilde

3. **Legg i handlekurv** — Klikk "Legg i handlekurv" på produktsiden

4. **Se handlekurven** — Klikk "Handlekurv" i menyen
   - Endre antall med **+** og **-** knappene
   - Fjern produkter med **"Fjern"**-knappen

5. **Betal** — Klikk **"Betal med Vipps"**
   - I demo-modus sendes du direkte til en bekreftelsesside
   - Med Vipps aktivert sendes du til Vipps for betaling

---

## Aktivere Vipps-betaling

Butikken har innebygd støtte for Vipps MobilePay. I preview-modus (GitHub Pages) kjører betalingen i demo-modus. For å aktivere ekte betalinger i en fullversjon:

### Steg 1: Opprett Vipps-konto
1. Gå til **https://portal.vippsmobilepay.com**
2. Registrer deg som bedrift
3. Søk om tilgang til eCommerce API

### Steg 2: Hent API-nøkler
Etter godkjenning finner du disse i Vipps-portalen:
- **Client ID**
- **Client Secret**
- **Subscription Key**
- **Merchant Serial Number**

### Steg 3: Konfigurer miljøvariabler
Opprett eller rediger filen `.env.local` i prosjektmappen:

```
VIPPS_CLIENT_ID=din-client-id
VIPPS_CLIENT_SECRET=din-client-secret
VIPPS_SUBSCRIPTION_KEY=din-subscription-key
VIPPS_MERCHANT_SERIAL=ditt-merchant-serial-number

# Test-miljø (bytt til https://api.vipps.no for produksjon)
VIPPS_API_URL=https://apitest.vipps.no

# Din butikks adresse
NEXT_PUBLIC_BASE_URL=https://din-butikk.no
```

### Steg 4: Bytt til serverversjon
Vipps-betaling krever en server (API-nøkler kan ikke eksponeres i nettleseren). For produksjon bør du:
- Kjøre butikken på en server (f.eks. Vercel, Railway eller egen server)
- Bruke de serverbaserte API-rutene (se kildekoden i `src/lib/vipps.js`)

> **Viktig:** Del aldri API-nøklene dine offentlig. Filen `.env.local` er allerede lagt til i `.gitignore`.

---

## Fargeprofil

Butikkens farger er valgt av Inger Helene og tilpasset en varm, innbydende stil for strikke- og interiørprodukter:

| Farge | Kode | Bruksområde |
|-------|------|-------------|
| **Knallrosa** | `#E91E8C` | Hovedfarge — knapper, priser, lenker |
| **Lilla** | `#7B2D8E` | Sekundærfarge — navigasjon, overskrifter |
| **Gul** | `#F5C518` | Høydepunkter — anbefalte merker, merkevarenavn |
| Myk rosa | `#FDE8F0` | Bakgrunner |
| Lys lavendel | `#F0E6F6` | Kortbakgrunner |
| Krem | `#FFFDF5` | Sidebakgrunn |
| Mørk lilla | `#3D1A47` | Tekst |

For å endre fargene, rediger CSS-variablene øverst i filen `src/app/globals.css`:

```css
:root {
  --pink: #E91E8C;
  --purple: #7B2D8E;
  --yellow: #F5C518;
  /* ... flere farger */
}
```

---

## Teknisk oversikt

### Prosjektstruktur

```
inger-helene-shop/
├── .github/workflows/deploy.yml  ← GitHub Actions utrulling
├── src/
│   ├── app/
│   │   ├── page.js               ← Forsiden
│   │   ├── products/page.js      ← Produktliste + produktdetaljer
│   │   ├── cart/page.js           ← Handlekurv
│   │   ├── checkout/success/      ← Bekreftelsesside
│   │   ├── admin/page.js          ← Administrasjonspanel
│   │   ├── globals.css            ← Alle stiler og farger
│   │   └── layout.js              ← Hovedlayout
│   ├── components/
│   │   ├── Navbar.js              ← Navigasjonsmeny
│   │   ├── Footer.js              ← Bunntekst
│   │   ├── ProductCard.js         ← Produktkort
│   │   └── Notification.js        ← Varselmeldinger
│   └── lib/
│       └── store.js               ← Datalagring (localStorage)
├── next.config.js                 ← Next.js-konfigurasjon
└── package.json                   ← Prosjektinfo og avhengigheter
```

### Teknologi
- **Next.js 16** — React-rammeverk med Turbopack og statisk eksport
- **React 19** — Brukergrensesnittbibliotek
- **Node.js 24 LTS** — JavaScript-kjøretidsmiljø
- **localStorage** — Klientsidelagring for produkter og handlekurv
- **GitHub Pages** — Gratis hosting av statisk side
- **GitHub Actions** — Automatisk bygging og publisering

### For produksjonsbruk
GitHub Pages-versjonen er en forhåndsvisning. For en fullverdig nettbutikk anbefales det å:
1. Sette opp en database (f.eks. PostgreSQL eller MongoDB)
2. Kjøre på en server som støtter API-ruter (f.eks. Vercel)
3. Aktivere Vipps med ekte API-nøkler
4. Legge til brukerautentisering for admin-panelet
5. Legge til ordrehåndtering og e-postvarsler
