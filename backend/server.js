const express = require("express");

const app = express();

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/ping", (req, res) => {
  res.json({ ok: true });
});

app.get("/api/activities", (req, res) => {
  res.json([]);
});

// Exported for tests; only listen when run directly.
module.exports = { app };

if (require.main === module) {
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  app.listen(port, () => console.log(`VitalSync API on :${port}`));
}
