<div align="center">

# 🤝 Shebabondhu (সেবাবন্ধু)

**Create, join and track social service events in your community**

A community-driven platform where people create, join and track social service events in their own area, such as winter clothes distribution, blanket distribution, tree plantation and clean-up drives.

<p>
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</p>

[Live Site](https://shebabondhu-client.vercel.app) · [Client Repository](https://github.com/AkramMdkhan/shebabondhu-client) · [Server Repository](https://github.com/AkramMdkhan/shebabondhu-server)

<br/>

<img src="./public/screenshot.png" alt="Shebabondhu Screenshot" width="100%" />

</div>

---

## 📖 About the Project

Many people want to help their community but do not know where or when a social service event is happening. Organizers often depend on social media posts and word of mouth, which makes it hard to reach volunteers and to keep track of who is joining.

Shebabondhu (meaning "friend in service") solves this by putting everything in one place. Anyone can browse upcoming events near them, such as a winter clothes distribution in Mirpur 10 or a blanket distribution in Mohammadpur, and read the full details before deciding to take part.

**For volunteers:**
- Discover upcoming social service events and filter them by type or search by keyword.
- Join an event with one click and see all your joined events in one place, sorted by date.

**For organizers:**
- Create an event with a title, description, type, location, date and thumbnail.
- Update or delete your own events at any time from a single management page.

**For everyone:**
- Public pages (home, upcoming events and event details) need no login.
- Creating, joining and managing events require a secure account, using email and password or Google.

The goal is to make community service easier to find, easier to organize and easier to take part in.

---

## ✨ Features

- **Authentication:** Register and log in with email and password, or continue with Google. Passwords must contain an uppercase letter, a lowercase letter and at least 6 characters.
- **Create Events:** Logged-in users can create events with a title, description, type, thumbnail, location and a future date. Past dates are not allowed.
- **Upcoming Events:** Browse all upcoming events in a card grid with search and event-type filtering. Past events are never listed.
- **Event Details and Join:** Anyone can view event details, and logged-in users can join an event with one click.
- **Joined Events:** A private page lists every event you have joined, sorted by event date.
- **Manage Events:** Update or delete your own events, with a confirmation dialog before deletion.
- **Profile Management:** View your profile and update your name and profile picture.
- **Light and Dark Theme:** A theme toggle that applies across the whole application.
- **Protected Routes and APIs:** Private pages are guarded and server APIs are secured with JWT. Reloading a private page keeps the user signed in.
- **Responsive Design:** Fully responsive on mobile, tablet and desktop, with toast notifications and loading skeletons.

---

## 🧰 Tech Stack

| Category | Technologies |
| --- | --- |
| Framework | Next.js (App Router), React, TypeScript |
| Styling and UI | Tailwind CSS, shadcn/ui, Lucide Icons |
| Authentication | Better Auth (MongoDB adapter), JWT, Google OAuth |
| Forms and Validation | React Hook Form, Zod |
| Notifications | Sonner |
| Database | MongoDB |
| Deployment | Vercel (client), Render (server) |

---

## 📦 Dependencies

| Package | Purpose |
| --- | --- |
| `next`, `react`, `react-dom` | Core framework |
| `better-auth` | Authentication |
| `mongodb` | Database driver for Better Auth |
| `tailwindcss` | Styling |
| `lucide-react` | Icons |
| `react-hook-form`, `zod` | Form handling and validation |
| `sonner` | Toast notifications |

See [`package.json`](./package.json) for the complete list.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or later
- A MongoDB connection string
- Google OAuth credentials
- The [Shebabondhu server](https://github.com/AkramMdkhan/shebabondhu-server) running locally or deployed

### Installation

```bash
git clone https://github.com/AkramMdkhan/shebabondhu-client.git
cd shebabondhu-client
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Run Locally

```bash
npm run dev
```

The app will be available at http://localhost:3000.

### Production Build

```bash
npm run build
npm start
```

---

## 🔗 Links

- **Live Site:** https://shebabondhu-client.vercel.app
- **Client Repository:** https://github.com/AkramMdkhan/shebabondhu-client
- **Server Repository:** https://github.com/AkramMdkhan/shebabondhu-server

---

## 👤 Author

**Akram Mohammad Khan**, MERN Stack Developer

[GitHub](https://github.com/AkramMdkhan) · [LinkedIn](https://www.linkedin.com/in/akrammdkhan)
