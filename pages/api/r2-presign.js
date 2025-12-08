// pages/api/r2-presign.js
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

const ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const ACCESS_KEY = process.env.R2_ACCESS_KEY_ID;
const SECRET_KEY = process.env.R2_SECRET_ACCESS_KEY;
const BUCKET = process.env.R2_BUCKET;
const ENDPOINT = process.env.R2_ENDPOINT;

const s3 = new S3Client({
  region: "auto",
  endpoint: ENDPOINT,
  credentials: { accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_KEY },
  forcePathStyle: false,
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const { creatorId, postId, filename, contentType } = req.body || {};
    if (!creatorId || !postId || !filename) return res.status(400).json({ error: "Missing params" });

    const key = `creators/${creatorId}/posts/${postId}/${uuidv4()}_${filename}`;

    const putCmd = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      ContentType: contentType || "application/octet-stream",
    });
    const uploadUrl = await getSignedUrl(s3, putCmd, { expiresIn: 600 }); // 10 min

    const getCmd = new GetObjectCommand({ Bucket: BUCKET, Key: key });
    const downloadUrl = await getSignedUrl(s3, getCmd, { expiresIn: 3600 }); // 1 hour

    return res.status(200).json({ key, uploadUrl, downloadUrl });
  } catch (err) {
    console.error("r2-presign error", err);
    return res.status(500).json({ error: "Server error" });
  }
}
