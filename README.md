# 📚 Educase – School Locator API

A simple, human-friendly REST API built with **Node.js**, **Express**, and **PostgreSQL** that helps you:

1. **Add** new schools with geographic coordinates.
2. **Query** the list of schools ordered by distance from any latitude/longitude point.

It is perfect for prototypes, technical assessments, or as a starting point for a location-aware service.

---

## ✨ Quick demo

```bash
# 1️⃣ Start the server (after setup)
npm start

# 2️⃣ Add a school
curl -X POST http://localhost:5000/api/addSchool \
  -H "Content-Type: application/json" \
  -d '{
        "name": "DELHI PUBLIC SCHOOL",
        "address": "JHAJJAR",
        "latitude": 29.9505,
        "longitude": 76.2389
      }'

# 3️⃣ Ask for the nearest schools to DELHI
curl "http://localhost:5000/api/listSchools?latitude=51.5074&longitude=-0.1278"
```

---

## 🗺️ Endpoints

| Method | Path | Query / Body | Description |
| ------ | ---- | ------------ | ----------- |
| **POST** | `/api/addSchool` | JSON body with `name`, `address`, `latitude`, `longitude` | Inserts a new record and returns its `id`. |
| **GET** | `/api/listSchools` | `latitude`, `longitude` as query params | Returns **all** schools sorted by haversine distance from the supplied point. |

> All responses are JSON. Failed validations or DB errors return an `error` field.

---

## 🏗️ Project structure

```
Educase/
├── app.js                # Entry point – sets up Express
├── controllers/
│   └── schoolController.js  # Business logic
├── routes/
│   └── schoolRoutes.js      # API routes
├── db.js                  # PostgreSQL connection pool
├── .env                   # Environment variables (not committed)
└── package.json           # Dependencies & scripts
```

---

## ⚙️ Setup & Running locally

1. **Clone & install**
   ```bash
   git clone https://github.com/manjeet13804/educase_school_api.git
   cd Educase
   npm install
   ```

2. **Provision PostgreSQL**
   Create a database (e.g. `educase`) and run:

   ```sql
   CREATE TABLE schools (
     id SERIAL PRIMARY KEY,
     name TEXT NOT NULL,
     address TEXT NOT NULL,
     latitude DOUBLE PRECISION NOT NULL,
     longitude DOUBLE PRECISION NOT NULL
   );
   ```

3. **Create `.env`** (copy & edit):
   ```env
   PORT=5000
   PG_HOST=localhost
   PG_PORT=5437
   PG_USER=postgres
   PG_PASSWORD=secret
   PG_DATABASE=educase
   ```

4. **Run**
   ```bash
   npm start
   # Server running on http://localhost:5000
   ```

---

## 🧪 Testing with Postman

A Postman collection is included in the `docs/` folder (*coming soon*). For now, use the **Quick demo** curl commands above or import the endpoints manually.

---

## 🤝 Contributing
