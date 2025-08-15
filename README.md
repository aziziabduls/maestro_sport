# Maestro Sport - Toko Peralatan Taekwondo

Website toko peralatan taekwondo yang dibangun dengan Next.js 15, TypeScript, dan Tailwind CSS.

## Fitur

- 🛍️ Katalog produk peralatan taekwondo
- 🛒 Keranjang belanja
- 💳 Halaman checkout
- 📱 Responsive design
- ⚡ Static site generation untuk performa optimal

## Teknologi

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **UI Components**: Radix UI + shadcn/ui

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment ke GitHub Pages

Proyek ini sudah dikonfigurasi untuk deployment otomatis ke GitHub Pages menggunakan GitHub Actions.

### Setup Manual

1. **Fork atau clone repository ini**

2. **Aktifkan GitHub Pages di repository settings:**
   - Buka Settings > Pages
   - Source: Deploy from a branch
   - Branch: gh-pages (akan dibuat otomatis)
   - Folder: / (root)

3. **Push ke branch main:**
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```

4. **GitHub Actions akan otomatis:**
   - Build aplikasi
   - Generate static files
   - Deploy ke GitHub Pages

### Konfigurasi

- **Base Path**: `/maestro_sport` (sesuaikan dengan nama repository)
- **Output**: Static export untuk GitHub Pages
- **Images**: Unoptimized untuk static hosting

### URL Deployment

Setelah deployment berhasil, website akan tersedia di:
`https://[username].github.io/maestro_sport`

## Struktur Proyek

```
src/
├── app/                 # App Router (Next.js 13+)
│   ├── components/      # Layout components
│   ├── data/           # Static data (products.json)
│   ├── products/       # Product pages
│   └── ...
├── components/         # Reusable components
└── lib/               # Utilities dan store
```

## Kontribusi

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
