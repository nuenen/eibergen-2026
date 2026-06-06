# 🏫 Klas Reunie - Eind jaren '60 / Begin jaren '70

Een nostalgische website voor de reunie van onze lagere school klas (1967-1972).

## ✨ Functies

- **Retro 1970's Design**: Pastel kleuren, vintage fonts, en een nostalgische uitstraling
- **Automatische Foto Upload**: Upload foto's via Telegram bot - ze worden automatisch toegevoegd aan de galerij
- **Responsive Layout**: Werkt op alle apparaten (desktop, tablet, mobiel)
- **Gallerij Grid**: Mooie grid-layout voor foto's met hover-effecten en tooltips

## 🚀 Hoe dit project gebruiken

### Stap 1: Host de website
```bash
git clone https://github.com/jouw-repo/eibergen-2026.git
```

### Stap 2: Configureer Telegram Bot
```bash
# Gebruik @BotFather om een bot te maken
# Kopieer de token in uploads/auto-upload.js
```

### Stap 3: Upload foto's via Telegram
```bash
type /upload <foto_id>
```

## 📸 Foto uploaden (Handmatig)

Upload handmatig foto's naar je hosting:
```bash
cp foto.jpg uploads/
# of gebruik een FTP/SFTP client
```

## 🔧 Technische details

- **Frontend**: HTML5 + CSS3 (geen frameworks nodig)
- **Hosting**: Statische hosting (GitHub Pages, Netlify, Vercel) of server met Node.js/Python
- **Database**: Nee - alle data opslag in JSON-bestanden of direct in de database

## 📝 Licentie

MIT License
