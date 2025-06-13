# HAM Radio Exam Prep Web App

## 1. General Description
This is a lightweight, mobile-first, single-page application to help aspiring Polish HAM Radio amateurs prepare for the national licensing exam.

- Read-only repository of official exam questions (4 categories, ~520 Qs)
- Three learning modes:
    1. **Knowledge Base** – browse questions & answers by category
    2. **Flashcards** – flip-card review of individual questions
    3. **Random Test** – 20-question mock exam (5 from each category), with instant grading
- No user accounts, no backend logic—everything runs in the browser
- Static hosting on any HTTP server (GitHub Pages, Netlify, VPS + Nginx)

## 2. Architecture

```
/
├─ .gitignore
├─ README.md
├─ package.json
├─ vite.config.js
├─ tailwind.config.js
├─ public/
│   ├─ index.html
│   ├─ manifest.json
│   └─ favicon.ico
├─ src/
│   ├─ main.js
│   ├─ App.vue
│   ├─ router.js
│   ├─ assets/
│   │   └─ (static images, logos)
│   ├─ data/
│   │   └─ questions_by_category.json
│   ├─ pages/
│   │   ├─ Home.vue
│   │   ├─ Knowledge.vue
│   │   ├─ Flashcards.vue
│   │   └─ Quiz.vue
│   └─ components/
│       ├─ NavBar.vue
│       ├─ QuestionCard.vue
│       └─ QuizQuestion.vue
└─ dist/               ← build output (for deployment)
```

- **Vite** for fast dev & build
- **Vue 3** + **Vue Router** for a small SPA
- **Tailwind CSS** for utility-first, mobile-first styling
- JSON data loaded via `fetch()`
- No database or server-side code

## 3. Tech Stack

| Layer              | Technology                   | Notes                                         |
|--------------------|-----------------------------|-----------------------------------------------|
| Project Scaffolding| Vite                        | `npm init vite@latest`                        |
| Framework          | Vue 3                       | Composition API, Single-File Components       |
| Routing            | Vue Router                  | Hash or history mode                          |
| State (minimal)    | Reactive Vue or inject/provide | Local state in components                  |
| Styling            | Tailwind CSS                | Dark mode via `class` strategy                |
| Data               | Static JSON                 | `/src/data/questions_by_category.json`        |
| Build Tool         | Vite + ESBuild              | Bundles JS/CSS, handles imports               |
| Hosting            | Static HTTP server          | GitHub Pages, Netlify, or VPS + Nginx         |
| Version Control    | Git + GitHub                | Public repo                                   |

## 4. Theming and UI

- **Mobile-First**: Design breakpoints at sm/md/lg/xl
- **Layout**:
    - `<NavBar>` at top with links to Home / Knowledge / Flashcards / Quiz
    - `<router-view>` for page content
- **Dark & Light Themes**:
    - Tailwind config (`tailwind.config.js`):

      ```js
      module.exports = {
        darkMode: 'class',
        theme: { /* … */ },
        plugins: [],
      }
      ```
    - Toggling: add/remove `class="dark"` on `<html>` or root `<div>`
    - Example button in NavBar:

      ```vue
      <button @click="toggleTheme">
        {{ isDark ? '☀️ Light' : '🌙 Dark' }}
      </button>
      ```
    - Use Tailwind utilities:
        - Light: `bg-white text-gray-900`
        - Dark: `dark:bg-gray-900 dark:text-gray-100`
        - Cards: `bg-gray-50 dark:bg-gray-800 p-4 rounded shadow`

## 5. Development Plan

1. **Project Initialization (Day 1)**
    - `npm init vite@latest ham-exam --template vue`
    - Install Tailwind CSS (`npm install -D tailwindcss postcss autoprefixer`)
    - Configure `tailwind.config.js`, import in `main.js`
    - Set up basic Vue Router with empty routes

2. **Home & Layout (Day 1)**
    - Build `<NavBar>` with links + theme toggle
    - Create `Home.vue` with project description & “Start learning” buttons

3. **Knowledge Base (Day 2)**
    - Load JSON via `fetch('/src/data/questions_by_category.json')`
    - Render categories list + collapsible Q&A (`<QuestionCard>`)
    - Style for mobile: accordions or list items

4. **Flashcards Module (Day 3)**
    - Shuffle all Qs (or filter by category)
    - Show one card at a time, “Flip” and “Next/Prev” buttons
    - Persist current index in component state or `localStorage`

5. **Quiz Module (Day 4)**
    - Build test generator: pick 5 Qs per category, shuffle
    - Render 20 questions with radio groups
    - On submit: grade, highlight answers, show score popup

6. **Theming & Polishing (Day 5)**
    - Refine light/dark color palette
    - Add transitions (e.g. card flips, button hovers)
    - Test on multiple devices / viewport sizes

7. **Documentation & Deployment (Day 6)**
    - Fill out README, CONTRIBUTING.md, LICENSE
    - Build for production: `npm run build` → `dist/`
    - Deploy to GitHub Pages or VPS
        - For VPS + Nginx: serve `dist/` and proxy `index.html` fallback
    - Verify caching headers for JSON & assets

8. **Future Extensions**
    - Add spelling alphabet page (`/spelling`, static JSON/table)
    - Q-codes learning module
    - Leaderboard or statistics via optional backend (later)