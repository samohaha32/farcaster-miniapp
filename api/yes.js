import { ethers } from "ethers";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");
  try {
    const provider = new ethers.JsonRpcProvider("https://mainnet.base.org");
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const contractAddr = "0x44f1e8ee3aAd3E6c3Ce82b427C42a3221F0fEe1d";
    const abi = ["function respond(bool answer)"];

    const c = new ethers.Contract(contractAddr, abi, wallet);
    const tx = await c.respond(true);
    // Можно не ждать подтверждения, чтобы UI откликался быстрее:
    // await tx.wait(1);

    // Вернём новый кадр (картинка та же, но добавим подпись об успехе)
    return res.status(200).json({
      frame: {
        version: "vNext",
        image: "https://farcaster-miniapp-rho.vercel.app/cover.png",
        buttons: [
          { label: "Yes" },
          { label: "No" }
        ],
        post_url: "https://farcaster-miniapp-rho.vercel.app/api/status"
      },
      message: "Yes recorded",
      txHash: tx.hash
    });
  } catch (e) {
    console.error(e);
    return res.status(500).send("Error");
  }
}
