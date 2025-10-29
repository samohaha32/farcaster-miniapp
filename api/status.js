// /api/status.js
import { ethers } from "ethers";

const DOMAIN = 'https://farcaster-miniapp-rho.vercel.app';
const CONTRACT = '0x44f1e8ee3aAd3E6c3Ce82b427C42a3221F0fEe1d';
const ABI = ["function respond(bool answer)"];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    // Первичный GET — можно отдать простой JSON/ok
    return res.status(200).json({ ok: true });
  }

  try {
    // в body приходит информация о нажатой кнопке
    const idx = Number(req.body?.untrustedData?.buttonIndex || req.body?.buttonIndex || 0);

    if (idx === 1 || idx === 2) {
      const provider = new ethers.JsonRpcProvider("https://mainnet.base.org");
      const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
      const c = new ethers.Contract(CONTRACT, ABI, wallet);
      const ans = (idx === 1);
      const tx = await c.respond(ans);
      // можно await tx.wait(1) — но не обязательно

      return res.status(200).json({
        frame: {
          version: "vNext",
          image: `${DOMAIN}/cover.png`,
          buttons: [{ label: "Yes" }, { label: "No" }],
          post_url: `${DOMAIN}/api/status`
        },
        message: `Recorded: ${ans ? 'YES' : 'NO'}`,
        txHash: tx.hash
      });
    }

    // если пришло что-то ещё — просто вернуть тот же кадр
    return res.status(200).json({
      frame: {
        version: "vNext",
        image: `${DOMAIN}/cover.png`,
        buttons: [{ label: "Yes" }, { label: "No" }],
        post_url: `${DOMAIN}/api/status`
      }
    });
  } catch (e) {
    console.error(e);
    return res.status(500).send("Error");
  }
}
