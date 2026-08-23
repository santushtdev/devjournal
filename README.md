# 📓 DevJournal

> A personal developer workspace to organize projects, notes, and code snippets in one place.

DevJournal is a full-stack developer productivity application built with **Next.js, TypeScript, Prisma, and PostgreSQL**. It provides a centralized workspace where developers can manage their projects, technical notes, and reusable code snippets.


## ✨ Features

### 📊 Dashboard

A central dashboard showing recently added developer resources.

### 📁 Projects

Store and manage development projects with information such as:

* Project title
* Description
* GitHub repository
* Creation date
* Last updated date

### 📝 Notes

Keep technical notes, explanations, and important development concepts organized in one place.

### 💻 Code Snippets

Save frequently used or useful pieces of code for future reference.

### 🔐 Authentication

Authentication will allow each user to have their own private DevJournal workspace.

---

## 🛠️ Tech Stack

### Frontend

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui**
* **Lucide React**
* **next-themes**

### Backend

* **Next.js API Routes**
* **Prisma ORM**
* **PostgreSQL**
* **Neon**

### Development Tools

* Git
* GitHub
* Prisma Studio
* VS Code

---



## 🗄️ Database

DevJournal currently uses **PostgreSQL hosted on Neon** with **Prisma** as the ORM.


Each user will eventually have their own projects, notes, and snippets.

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd devjournal
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file:

```env
DATABASE_URL="your-postgresql-connection-string"
```

### 4. Run Prisma migrations

```bash
npx prisma migrate dev
```

### 5. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🧑‍💻 Development Journey

DevJournal is being built as a learning-focused full-stack project.

The development process covers:

1. Designing the dashboard
2. Building the UI with Tailwind CSS and shadcn/ui
3. Creating the database schema
4. Connecting PostgreSQL through Neon
5. Learning Prisma
6. Building REST APIs with Next.js
7. Connecting APIs to the React frontend
8. Implementing CRUD functionality
9. Adding authentication
10. Making the application production-ready

---

## 🗺️ Roadmap

### Phase 1 — UI

* [x] Dashboard
* [x] Sidebar
* [x] Project cards
* [x] Notes section
* [x] Snippets section
* [x] Responsive layout
* [x] Theme support

### Phase 2 — Backend

* [x] PostgreSQL setup
* [x] Neon setup
* [x] Prisma setup
* [x] Project schema
* [x] Projects API
* [x] Database integration
* [ ] Complete Project CRUD

### Phase 3 — Authentication

* [ ] Login
* [ ] Signup
* [ ] Session management
* [ ] Protected dashboard
* [ ] User-specific projects
* [ ] User-specific notes
* [ ] User-specific snippets

### Phase 4 — Notes & Snippets

* [ ] Notes API
* [ ] Notes CRUD
* [ ] Snippets API
* [ ] Snippets CRUD
* [ ] Edit/delete functionality
* [ ] Search and filtering

### Phase 5 — Polish

* [ ] Loading states
* [ ] Empty states
* [ ] Error handling
* [ ] Form validation
* [ ] Better mobile experience
* [ ] Deployment
* [ ] Production optimization

---

## 🎯 Goal

The goal of DevJournal is to create a simple but powerful **developer workspace** where developers can keep their projects, learning notes, and useful code snippets organized instead of having them scattered across different applications.

---

## 📌 Status

**DevJournal is currently under active development.**

---

## 👨‍💻 Author

**Santusht Nimbalkar**

Computer Science Engineering Student

Built while learning and implementing full-stack development with Next.js, Prisma, PostgreSQL, and modern React technologies.
