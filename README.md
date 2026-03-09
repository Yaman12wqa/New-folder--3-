# Akademik Görev Takipçisi

Akademik Görev Takipçisi, ders odaklı görevlerinizi tek yerden yönetmek için geliştirilmiş bir full-stack uygulamadır.
Ön yüz React + Vite, arka yüz ise Node.js + Express + MongoDB (Mongoose) ile geliştirilmiştir.

## Özellikler

- Görev ekleme, güncelleme ve silme (CRUD)
- Durum takibi: `pending`, `in-progress`, `done`
- Öncelik takibi: `low`, `medium`, `high`, `urgent`
- Görev tipi: `Assignment`, `Project`, `Quiz`, `Exam`
- Filtreleme: durum, öncelik, ders, görev tipi
- Arama: başlık, açıklama veya ders adına göre
- Sıralama: oluşturma tarihi, teslim tarihi, öncelik
- Dashboard özet kartları (toplam, bugün teslim, gecikmiş vb.)
- Yaklaşan teslim tarihleri paneli
- Tarayıcı `localStorage` üzerinde hızlı çalışma notları

## Teknoloji Yığını

### Frontend

- React 19
- Vite
- Axios
- Lucide React

### Backend

- Node.js
- Express 5
- MongoDB + Mongoose
- dotenv
- cors

## Proje Yapısı

```text
academic-task-tracker/
  client/   # React + Vite arayüzü
  server/   # Express API ve MongoDB bağlantısı
```

## Gereksinimler

- Node.js (18+ önerilir)
- npm
- MongoDB (lokal veya Atlas)

## Kurulum

```bash
# 1) Proje klasörüne girin
cd academic-task-tracker

# 2) Backend bağımlılıkları
cd server
npm install

# 3) Frontend bağımlılıkları
cd ../client
npm install
```

## Ortam Değişkenleri

### Backend (`server/.env`)

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/academic-task-tracker
NODE_ENV=development
```

### Frontend (opsiyonel, `client/.env`)

Varsayılan API adresi: `http://localhost:3000/api`

Farklı bir adres kullanacaksanız:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## Uygulamayı Çalıştırma

İki ayrı terminal açın:

```bash
# Terminal 1 - Backend
cd academic-task-tracker/server
npm run dev
```

```bash
# Terminal 2 - Frontend
cd academic-task-tracker/client
npm run dev
```

Varsayılan adresler:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000/api`

## API Uçları

- `GET /api/health` -> Servis sağlık kontrolü
- `GET /api/tasks` -> Görevleri listele (filtre/sıralama destekler)
- `POST /api/tasks` -> Yeni görev oluştur
- `PUT /api/tasks/:id` -> Görev güncelle
- `DELETE /api/tasks/:id` -> Görev sil

`GET /api/tasks` için desteklenen query parametreleri:

- `status`
- `priority`
- `type`
- `course`
- `search`
- `sort` (`-createdAt`, `createdAt`, `dueDate`, `-dueDate`, `priority_desc`, `priority_asc`)

## Veri Modeli (Task)

- `title` (zorunlu, 3-100 karakter)
- `description` (opsiyonel)
- `course` (zorunlu)
- `type` (`Assignment`, `Project`, `Quiz`, `Exam`)
- `status` (`pending`, `in-progress`, `done`)
- `priority` (`low`, `medium`, `high`, `urgent`)
- `dueDate` (opsiyonel, geçmiş tarih olamaz)

## Build ve Production

```bash
# Frontend build
cd client
npm run build

# Frontend preview
npm run preview

# Backend production start
cd ../server
npm start
```

## Not

Bu repository'de şu anda ayrı bir lisans dosyası bulunmamaktadır. GitHub'a eklemeden önce uygun bir `LICENSE` dosyası eklemeniz önerilir.
