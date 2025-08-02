# Vapi Workflow Backend

This backend triggers a Vapi workflow securely (hides private API key) and is designed to work with any frontend (WordPress, static sites, etc.).

---

## 🚀 Deploy to Vercel
1. Fork this repo or upload it to GitHub
2. Go to [Vercel](https://vercel.com/) → New Project → Import this repo
3. Add environment variables:
   - `VAPI_API_KEY`
   - `ASSISTANT_ID`
   - `WORKFLOW_ID`
4. Deploy! 🎉

Your API endpoint will look like:

https://your-vercel-app.vercel.app/start-workflow

---

## 🔗 Usage in Frontend

In your frontend HTML/WordPress code, call:

```js
await fetch("https://your-vercel-app.vercel.app/start-workflow", {
  method: "POST",
});
```

This triggers the workflow + assistant call.

---

### ✅ What You Do Now

1️⃣ Create a new **GitHub repo** → Upload these files.  
2️⃣ Deploy to **Vercel (1 click)** → Add env variables.  
3️⃣ In WordPress → Add a **Custom HTML block**, paste my updated assistant HTML, and replace this line:

```js
await fetch("https://your-backend.com/start-workflow", {
```

➡ with:

```js
await fetch("https://your-vercel-app.vercel.app/start-workflow", {
``` 