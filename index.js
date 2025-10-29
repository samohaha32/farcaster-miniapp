import express from "express";
import { ethers } from "ethers";

const app = express();
app.use(express.json());

// Основная страница — возвращает Frame для Farcaster
app.get("/", (req, res) => {
  res.json({
    frame: {
      version: "vNext",
      image: "https://your-domain.vercel.app/cover.png",
      buttons: [
        { label: "Yes", action: { type: "tx", target: "https://your-domain.vercel.app/api/yes" } },
        { label: "No",  action: { type: "tx", target: "https://your-domain.vercel.app/api/no" } }
      ]
    }
  });
});

// Обработка нажатия "Yes"
app.post("/api/yes", async (req, res) => {
  try {
    const provider = new ethers.JsonRpcProvider("https://mainnet.base.org");
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contract = new ethers.Contract(
      "0x44f1e8ee3aAd3E6c3Ce82b427C42a3221F0fEe1d",
      ["function respond(bool answer)"],
      wallet
    );
    await contract.respond(true);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

// Обработка нажатия "No"
app.post("/api/no", async (req, res) => {
  try {
    const provider = new ethers.JsonRpcProvider("https://mainnet.base.org");
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contract = new ethers.Contract(
      "0x44f1e8ee3aAd3E6c3Ce82b427C42a3221F0fEe1d",
      ["function respond(bool answer)"],
      wallet
    );
    await contract.respond(false);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.listen(3000, () => console.log("Miniapp is running on port 3000"));
