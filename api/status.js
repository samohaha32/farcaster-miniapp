export default async function handler(req, res) {
  // Можно дописать логику чтения событий из BaseScan/индекса, чтобы показать счётчик
  return res.status(200).json({
    frame: {
      version: "vNext",
      image: "https://farcaster-miniapp-rho.vercel.app/cover.png",
      buttons: [
        { label: "Yes" },
        { label: "No" }
      ]
    },
    note: "Thanks for interacting!"
  });
}
