# 🚀 Setup Guide for Miguel

Hey Miguel! Here's everything you need to get started on the Oath project.

## ✅ Prerequisites (Install These First)

1. **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
   - This includes npm automatically
   - Verify: `node --version` (should show v18+)

2. **Git** - [Download here](https://git-scm.com/)
   - Verify: `git --version`

3. **Code Editor** - VS Code recommended

---

## 📁 Step 1: Get the Code

```bash
# Clone the repository (or download the zip Steven sends you)
git clone <repo-url>
cd Oath2
```

---

## 🔐 Step 2: Environment Variables

Steven will send you a `.env.local` file. Put it in the root folder (same directory as `package.json`).

**The file should contain:**
- Database credentials (Supabase PostgreSQL)
- Firebase auth credentials
- Supabase storage credentials
- OpenAI API key

**Important:** Keep this file private! Never commit it to git.

---

## 📦 Step 3: Install & Run

```bash
# 1. Install all dependencies
npm install

# 2. Generate Prisma database client
npm run db:generate

# 3. Start the development server
npm run dev
```

The app will be running at: **http://localhost:3000**

---

## ✅ Verify It Works

1. Open http://localhost:3000 in your browser
2. You should see the Oath landing page
3. Try signing up or signing in
4. Check the dashboard

If you can do all that, you're good to go! 🎉

---

## 🛠️ Useful Commands

```bash
# Start development server
npm run dev

# View database (opens GUI at localhost:5555)
npm run db:studio

# Lint code
npm run lint

# Build for production
npm run build
```

---

## 📊 Database Commands

```bash
# Generate Prisma Client (after schema changes)
npm run db:generate

# Push schema changes to database
npm run db:push

# View database in GUI
npm run db:studio
```

---

## 🔍 Project Structure

```
Oath2/
├── .env.local           # Environment variables (Steven will send you)
├── package.json         # Dependencies
├── prisma/
│   └── schema.prisma    # Database schema
├── src/
│   ├── app/            # Pages (Next.js App Router)
│   ├── components/     # React components
│   ├── actions/        # Server actions (database operations)
│   └── lib/            # Utilities
└── public/             # Static assets
```

---

## 💡 Important Notes

1. **Shared Resources**: We're sharing the same:
   - Database (Supabase)
   - Auth system (Firebase)
   - Storage bucket (Supabase)
   - OpenAI API key

2. **What This Means**:
   - Any data you create, Steven can see (and vice versa)
   - Be careful not to delete important data
   - We're all using the same user accounts

3. **Git Workflow**:
   - Create a new branch for your work: `git checkout -b feature/your-feature-name`
   - Commit often: `git commit -m "descriptive message"`
   - Push your branch: `git push origin your-branch-name`
   - Create a PR for Steven to review

---

## 🐛 Troubleshooting

### "Prisma Client not found"
```bash
npm run db:generate
```

### "Port 3000 already in use"
```bash
# Kill the process on port 3000
lsof -ti:3000 | xargs kill -9
npm run dev
```

### "Can't connect to database"
- Make sure `.env.local` exists in the root folder
- Check that `DATABASE_URL` is in the file
- Try restarting: stop the server and run `npm run dev` again

### "Module not found" errors
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### Build errors
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

---

## 📚 Tech Stack

- **Framework**: Next.js 16 (React 19)
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma
- **Auth**: Firebase
- **Storage**: Supabase Storage
- **Styling**: Tailwind CSS
- **AI**: OpenAI API

---

## 🎯 Ready to Code!

Once everything is installed and running:

1. Check out the existing code
2. Read the other `.md` files in the root for feature documentation
3. Ask Steven if you have questions
4. Start building! 🚀

**Quick Links to Documentation:**
- `QUICK_START.md` - Quick start guide
- `DATABASE_QUICK_REFERENCE.md` - Database queries cheat sheet
- `FRIENDS_FEATURE_COMPLETE.md` - Friends system docs
- `OATH_CREATION_IMPLEMENTATION.md` - Oath creation flow

---

Good luck! If you run into any issues, message Steven. 👍

