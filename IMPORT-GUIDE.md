# 🚀 Otomatik Şehir Verisi İçe Aktarma Kılavuzu

## Adım 1: Dokümanı Hazırlayın

1. **Tüm şehir içeriğinizi kopyalayın** (bana gönderdiğiniz 32 şehirlik doküman)
2. **Yeni bir metin dosyası oluşturun:**
   - Masaüstünde sağ tık → Yeni → Metin Belgesi
   - Adını şu şekilde değiştirin: `cities-content.txt`
3. **İçeriği yapıştırın ve kaydedin**

**Dosya yolu:** `C:\Users\vnrnesia\Desktop\cities-content.txt`

---

## Adım 2: Parser Script'ini Çalıştırın

Terminal'de şu komutu çalıştırın:

```bash
cd studs-life-test
npx tsx scripts/parse-cities.ts
```

**Ne olacak:**
- Script `cities-content.txt` dosyasını okuyacak
- Otomatik olarak parse edecek
- `scripts/data/cities-data.ts` dosyasını oluşturacak

**Çıktı örneği:**
```
🔍 Reading input file: C:\Users\vnrnesia\Desktop\cities-content.txt
✅ File loaded, parsing...

✅ Parsed 6 countries
   📍 Россия: 13 cities
   📍 Кипр: 1 cities
   📍 Китай: 7 cities
   📍 Турция: 6 cities
   📍 Беларусь: 4 cities
   📍 Болгария: 1 cities

✅ Output written to: scripts/data/cities-data.ts

🎉 Done! You can now run: npx tsx scripts/import-cities.ts
```

---

## Adım 3: Strapi'ye İçe Aktarın

Veriler hazır olduğunda, Strapi'ye yükleyin:

```bash
npx tsx scripts/import-cities.ts
```

**Ne olacak:**
- Tüm ülkeler oluşturulacak
- Tüm şehirler oluşturulacak
- İlişkiler kurulacak

**Çıktı örneği:**
```
🚀 Starting city data import...

✓ Connected to Strapi

📍 Processing country: Россия
✓ Created country: Россия
  ✓ Created city: Москва
  ✓ Created city: Санкт-Петербург
  ...

✅ Import completed!
   Countries: 6
   Cities: 32
```

---

## Adım 4: Kontrol Edin

1. **Strapi Admin'e gidin:** http://localhost:1337/admin
2. **Content Manager → Countries** → Ülkeleri görün
3. **Content Manager → Cities** → Şehirleri görün
4. **Next.js'te test edin:** http://localhost:3000/ru/russia/moscow

---

## 🆘 Sorun Giderme

### "File not found" hatası
- `cities-content.txt` dosyasının tam olarak `C:\Users\vnrnesia\Desktop\` konumunda olduğundan emin olun
- Dosya adının tam olarak `cities-content.txt` olduğunu kontrol edin

### Parser hata veriyor
- Dokümanın formatının doğru olduğundan emin olun
- Şehir başlıklarının `—` (em dash) içerdiğinden emin olun

### Import başarısız
- Strapi'nin çalıştığından emin olun: http://localhost:1337/admin
- API izinlerinin açık olduğunu kontrol edin

---

## 📝 Notlar

- Parser otomatik olarak:
  - Ülke ve şehir slug'larını oluşturur
  - HTML formatına çevirir
  - Bölümleri ayırır (ekonomi, konaklama, ulaşım, iklim)
  - Meta açıklamaları oluşturur

- Eğer bir şehir zaten varsa, import script onu atlar
- Tüm veriler Rusça (ru) locale ile eklenir
