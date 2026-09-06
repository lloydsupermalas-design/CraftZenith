export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { url } = req.body || {};

    if (!url) {
      return res.status(400).json({ error: "URL tidak ditemukan" });
    }

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(502).json({ error: "Gagal mengambil file" });
    }

    const contentType =
      response.headers.get("content-type") ||
      "application/octet-stream";

    const data = await response.arrayBuffer();

    res.setHeader("Content-Type", contentType);
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="craft-zenith-download"'
    );

    return res.status(200).send(Buffer.from(data));
  } catch (error) {
    return res.status(500).json({ error: "Download gagal" });
  }
}
