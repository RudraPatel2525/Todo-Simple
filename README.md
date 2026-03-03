# NoteVote — Collaborative Notes with Voting (Full-Stack JavaScript)

NoteVote is a lightweight “sticky notes + voting” web app where users can post short notes and vote on other people’s ideas. It’s built as a full-stack JavaScript project using a Node/Express server (routing + auth gate) and a Bootstrap/jQuery front end (UI + interactions).

> Status: MVP working locally. Notes are currently stored in-memory on the client; authentication is file-based for now.

---

## Why NoteVote?
I wanted a small project that demonstrates end-to-end web fundamentals:
- Front-end UI + dynamic DOM updates
- A back-end server that serves pages/assets
- Form handling and route-based login flow
- A clean path to scale into a real database-backed app

---

## Features (Current)
### App experience
- **Create notes** instantly from the UI
- **Upvote / downvote** other users’ notes (can’t vote on your own)
- **Vote toggling** (click again to remove vote; switching up↔down updates score)
- **Score visibility rules**
  - Your own notes always show score
  - Other notes show score after you vote
- **Multi-user simulation** with a “Switch User” dropdown (User A / B / C)

### Server & routing
- **Express server** serves HTML pages + static assets (CSS/JS)
- **Login gate**
  - `POST /app` checks credentials against `users.json`
  - Success → redirects to the app page
  - Failure → redirects back to login

> Security note: credentials are stored in plain JSON for development only. See “Roadmap”.

---

## Tech Stack
**Front End**
- HTML + CSS (Bootstrap 5 + custom styling)
- JavaScript + jQuery (DOM rendering + event handling)

**Back End**
- Node.js + Express
- JSON file for credentials (`users.json`)

---

## Project Structure
