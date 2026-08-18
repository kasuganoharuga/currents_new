import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { readFile } from "node:fs/promises";
import path from "node:path";

const ASSET_KEYS = {
  "community-conversation":
    "homepage/kenji-2026-08-17/web/community-conversation.jpg",
  "community-creators": "homepage/kenji-2026-08-17/web/community-creators.jpg",
  "community-men": "homepage/kenji-2026-08-17/web/community-men.jpg",
  "community-mixer": "homepage/kenji-2026-08-17/web/community-mixer.jpg",
  "community-network": "homepage/kenji-2026-08-17/web/community-network.jpg",
  "community-operators":
    "homepage/kenji-2026-08-17/web/community-operators.jpg",
  "community-portrait": "homepage/kenji-2026-08-17/web/community-portrait.jpg",
  "community-speakers": "homepage/kenji-2026-08-17/web/community-speakers.jpg",
  "community-table": "homepage/kenji-2026-08-17/web/community-table.jpg",
  "community-women": "homepage/kenji-2026-08-17/web/community-women.jpg",
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

async function loadLocalAsset(name: keyof typeof ASSET_KEYS) {
  const body = await readFile(
    path.join(process.cwd(), "public", "homepage-assets", `${name}.jpg`),
  );

  return new Response(body, {
    headers: {
      "Cache-Control":
        process.env.NODE_ENV === "development"
          ? "public, max-age=0, must-revalidate"
          : "public, max-age=31536000, immutable",
      "Content-Length": String(body.byteLength),
      "Content-Type": "image/jpeg",
    },
  });
}

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

  const assetName = name as keyof typeof ASSET_KEYS;

  // Local development should work without requiring every contributor to
  // configure AWS credentials. Production continues to use the S3 copies.
  if (process.env.NODE_ENV === "development") {
    try {
      return await loadLocalAsset(assetName);
    } catch (error) {
      console.error("Unable to load local homepage asset", error);
      return new Response("Asset unavailable", { status: 502 });
    }
  }

  try {
    const asset = await s3.send(
      new GetObjectCommand({
        Bucket:
          process.env.CURRENTS_ASSETS_BUCKET ??
          "currents-develop-assets-765332581489-ap-southeast-2",
        Key: ASSET_KEYS[assetName],
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

    try {
      return await loadLocalAsset(assetName);
    } catch (fallbackError) {
      console.error("Unable to load bundled homepage asset", fallbackError);
      return new Response("Asset unavailable", { status: 502 });
    }
  }
}
