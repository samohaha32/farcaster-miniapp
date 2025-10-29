export default async function handler(req, res) {
  return res.status(200).json({
    frame: {
      version: "vNext",
      image: "https://YOUR-PROJECT.vercel.app/cover.png",
      buttons: [{ label: "Yes" }, { label: "No" }]
    },
    note: "Thanks for interacting!"
  });
}
