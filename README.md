# MovieApp

Web platform allowing the viewing of films, series, anime and manga, with an AI‑based personalized recommendation system.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Configuration](#configuration)
- [AI Recommendation System](#ai-recommendation-system)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview

**MovieApp** is a web platform that lets users discover and watch:

- Movies
- TV series
- Anime
- Manga (adaptations / related media)

The app integrates an AI‑powered recommendation engine that personalizes content suggestions based on user preferences, history, and behavior.

Typical use cases:

- Browse and search a large catalog of movies, TV series, anime and manga
- View detailed information (synopsis, genres, rating, cast, release year, etc.)
- Create an account and manage watchlists / favorites
- Receive personalized recommendations driven by AI
- Continue watching where you left off

> Note: This README is generic. Adapt endpoints/commands/structure to match the actual codebase.

---

## Features

- 🔍 **Search & Filtering**
  - Search by title, genre, year, language, type (movie/series/anime/manga)
  - Filter and sort by rating, popularity, release date, etc.

- 🎬 **Content Browsing**
  - Detail pages with description, trailers (if available), cast and crew
  - Category pages (e.g. Trending, Top Rated, New Releases, Popular Anime)

- 🧠 **AI‑Based Recommendations**
  - Personalized lists per user (e.g. “Because you watched…”, “Recommended for you”)
  - Uses viewing history, ratings, and interactions as signals

- 👤 **User Accounts**
  - User registration & authentication (login/logout)
  - Profile management
  - Watchlist / favorites
  - Continue watching and viewing history

- 💻 **Responsive UI**
  - Modern front‑end (JavaScript + HTML + CSS)
  - Responsive design for desktop, tablet, and mobile

- 🔐 **Secure Backend (Java)**
  - REST APIs to manage users, content catalog, and recommendations
  - Secure handling of authentication and protected resources

---

## Tech Stack

Based on the language composition:

- **Frontend**
  - **JavaScript** (≈ 46.4%)
  - **HTML** (≈ 2.9%)
  - **CSS** (≈ 11.2%)
  - Using React Native

- **Backend**
  - **Java** (≈ 39.5%)
  - Using Spring Boot

- **Other Dependencies**
  - Build tools (Maven for Java, npm/yarn for JS)
  - Database MySQL
  - AI/ML libraries or external recommendation service


```text
Frontend: React
Backend: Spring Boot
Database: MySQL
AI/ML: Gemini Api
```

---

## Architecture



```text
[Client (Browser)]
        |
        v
[Frontend (JavaScript, HTML, CSS)]
        |
        v
[Backend API (Java)]
        |
        +--> [Database]
        |
        +--> [AI Recommendation Engine / Service]
```

- **Frontend**: Renders the UI, calls backend REST APIs, handles routing and state.
- **Backend**: Exposes REST endpoints, handles business logic, connects to database and recommendation engine.
- **AI Engine**: Generates personalized recommendations based on user data and content metadata.

---

## Getting Started

### Prerequisites

Adjust versions as needed:

- **Java**: JDK 17+ (or project‑specific version)
- **Node.js**: v18+ (if there is a JS build/tooling step)
- **Package Manager**: `npm` or `yarn`
- **Build Tool**: `Maven` (for Java backend)
- **Database**: Running instance of the chosen DB (MySQL)

### Installation

Clone the repository:

```bash
git clone https://github.com/Ismail-Hidara/MovieApp.git
cd MovieApp
```

Install dependencies:

- If there is a **frontend** directory:

```bash
cd frontend        # or the actual frontend folder name
npm install        # or: yarn install
```

- For the **backend** (Java):

```bash
cd backend         # or the actual backend folder name / root if applicable
mvn clean install
```

Update the paths and commands above to match your actual project layout.

---

## Running the App

### 1. Start the Backend

Example with Spring Boot + Maven:

```bash
cd backend
mvn spring-boot:run
```


```

By default, the backend might run on something like `http://localhost:8080`. Adjust according to your configuration.

### 2. Start the Frontend

If you have a dedicated frontend project:

```bash
cd frontend
npm run dev        # or: npm start / yarn dev / yarn start
```

The frontend might be available at `http://localhost:3000` (or another port).

---

## Configuration

Create and configure an environment file for both backend and frontend.

### Backend Configuration

Typical config (example using Spring Boot):

`application.properties` or `application.yml`:

```properties
server.port=8080

spring.datasource.url=jdbc:postgresql://localhost:5432/movieapp
spring.datasource.username=your_username
spring.datasource.password=your_password

# JWT or other auth secrets
security.jwt.secret=your_jwt_secret

# AI recommendation service settings
recommendation.engine.url=http://localhost:5000
recommendation.engine.apikey=your_api_key
```

### Frontend Configuration

For example, a `.env` file:

```bash
VITE_API_BASE_URL=http://localhost:8080/api   # or REACT_APP_API_BASE_URL=...
```

Adapt to your bundler (Vite, Create React App, etc.) and real variables.

---

## AI Recommendation System

The AI recommendation system can be implemented in different styles. This section should be adapted to describe the actual approach:

Possible approaches:

1. **Content‑based filtering**
   - Uses metadata (genres, cast, synopsis, tags) to recommend similar content.

2. **Collaborative filtering**
   - Learns from user ratings, watch history, and behavior of similar users.

3. **Hybrid system**
   - Combines content‑based and collaborative filtering.

Example workflow:

1. Collect:
   - User profile (favorite genres, explicit ratings)
   - Watch history and interactions (views, likes, bookmarks)
2. Extract:
   - Features for each item (genres, keywords, embeddings)
3. Train / Update:
   - Model or algorithm that scores relevance between user and content
4. Serve:
   - Backend endpoint (e.g. `GET /api/recommendations`) returns ranked items per user

Document here:

- Where the recommendation code lives (folder / module)
- How the model is trained / updated
- How to run or retrain the model (scripts / commands)

---

## Project Structure

Adapt this example to your actual folders and files:

```text
MovieApp/
├─ backend/
│  ├─ src/
│  │  ├─ main/java/...        # Java source (controllers, services, models)
│  │  └─ main/resources/      # Configuration (application.properties/yml)
│  ├─ pom.xml or build.gradle
│
├─ frontend/
│  ├─ src/                    # JavaScript/TypeScript components and pages
│  ├─ public/                 # Static assets
│  ├─ package.json
│
├─ docs/                      # Optional documentation
├─ README.md
└─ LICENSE                    # If present
```

Update this section once the exact structure is known.

---

## Available Scripts

### Frontend (example)

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run tests (if configured)
npm test
```

### Backend (example)

```bash
# Run app (Maven)
mvn spring-boot:run

# Run tests
mvn test

# Build JAR
mvn package
```

Adjust for your actual tooling (Gradle, other scripts, etc.).

---

## Testing

Describe how to run tests for both backend and frontend.

### Backend Tests

```bash
cd backend
mvn test   # or: ./gradlew test
```

### Frontend Tests

```bash
cd frontend
npm test   # or equivalent for your framework
```

Add information about integration tests, API tests, or E2E tests if available.

---

## Roadmap

Potential future enhancements:

- User reviews and rating system
- Advanced search (by actors, studios, countries, etc.)
- Multi‑language support (i18n)
- Offline / PWA features
- Better AI models (e.g. deep learning, embeddings, large language model integration)
- Social features (friends, shared lists, comments)

Use GitHub Issues and Projects to track and prioritize these items.

---

## Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch:  
   `git checkout -b feature/my-new-feature`
3. Commit your changes:  
   `git commit -m "Add some feature"`
4. Push to the branch:  
   `git push origin feature/my-new-feature`
5. Open a Pull Request

Please:

- Follow existing code style and conventions
- Add/update tests when appropriate
- Update documentation where needed

---

## Contact

**Author**: [Ismail Hidara](https://github.com/Ismail-Hidara)

For questions, suggestions, or collaboration:

- Open an issue on the GitHub repository: [MovieApp](https://github.com/Ismail-Hidara/MovieApp/issues)