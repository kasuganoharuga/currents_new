import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

const ASSET_KEYS = {
  "hero-coast": "homepage/kenji-2026-08-17/web/hero-coast.jpg",
  "hero-left-community":
    "homepage/kenji-2026-08-17/web/hero-left-community.jpg",
  "hero-right-community":
    "homepage/kenji-2026-08-17/web/hero-right-community.jpg",
  "hero-shoreline": "homepage/kenji-2026-08-17/web/hero-shoreline.jpg",
  "persona-founders": "homepage/kenji-2026-08-17/web/persona-founders.jpg",
  "persona-investors": "homepage/kenji-2026-08-17/web/persona-investors.jpg",
  "persona-innovators": "homepage/kenji-2026-08-17/web/persona-innovators.jpg",
  "story-connection": "homepage/kenji-2026-08-17/web/story-connection.jpg",
  "story-conversation": "homepage/kenji-2026-08-17/web/story-conversation.jpg",
  "story-overview": "homepage/kenji-2026-08-17/web/story-overview.jpg",
} as const;

const s3 = new S3Client({
  region: process.env.AWS_REGION ?? "ap-southeast-2",
});

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ name: string }> },
) {
  const { name } = await context.params;

  if (!(name in ASSET_KEYS)) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const asset = await s3.send(
      new GetObjectCommand({
        Bucket:
          process.env.CURRENTS_ASSETS_BUCKET ??
          "currents-develop-assets-765332581489-ap-southeast-2",
        Key: ASSET_KEYS[name as keyof typeof ASSET_KEYS],
      }),
    );

    if (!asset.Body) {
      return new Response("Not found", { status: 404 });
    }

    const body = Buffer.from(await asset.Body.transformToByteArray());

    return new Response(body, {
      headers: {
        "Cache-Control":
          asset.CacheControl ?? "public, max-age=31536000, immutable",
        "Content-Length": String(body.byteLength),
        "Content-Type": asset.ContentType ?? "image/jpeg",
        ...(asset.ETag ? { ETag: asset.ETag } : {}),
      },
    });
  } catch (error) {
    console.error("Unable to load homepage asset from S3", error);
    return new Response("Asset unavailable", { status: 502 });
  }
}
