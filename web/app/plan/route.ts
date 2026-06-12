import { makePlanSvg } from "@/lib/plan-layout";

export const dynamic = "force-static";

export async function GET() {
  return new Response(makePlanSvg(), {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
