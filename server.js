import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname));
app.use(express.json());

let players = [];
const ADMIN_KEY = "admin123"; // เปลี่ยนรหัสแอดมินได้

// ---------------- บันทึกคะแนน ----------------
app.post("/api/save", (req, res) => {
  const { name, time, gold } = req.body;
  if (!name) return res.status(400).json({ message: "❌ ไม่มีชื่อผู้เล่น" });
  players.push({ name, time, gold });
  res.json({ message: "✅ บันทึกข้อมูลสำเร็จ" });
});

// ---------------- ดูอันดับ ----------------
app.get("/api/rank", (req, res) => {
  const ranked = players.sort((a, b) => a.time - b.time);
  res.json(ranked);
});

// ---------------- รีอันดับ ----------------
app.post("/api/admin/reset", (req, res) => {
  const { key } = req.body;
  if (key !== ADMIN_KEY)
    return res.status(403).json({ message: "❌ รหัสแอดมินไม่ถูกต้อง" });
  players = [];
  res.json({ message: "🔁 รีอันดับสำเร็จ" });
});

// ---------------- เสกทอง ----------------
app.post("/api/admin/addgold", (req, res) => {
  const { key, name, amount } = req.body;
  if (key !== ADMIN_KEY)
    return res.status(403).json({ message: "❌ รหัสแอดมินไม่ถูกต้อง" });
  const p = players.find(x => x.name === name);
  if (!p) return res.status(404).json({ message: "❌ ไม่พบผู้เล่นนี้" });
  p.gold += Number(amount);
  res.json({ message: `🪙 เสกทองให้ ${name} ${amount} สำเร็จ` });
});

app.listen(PORT, () => {
  console.log(`✅ Server ทำงานที่พอร์ต ${PORT}`);
});
