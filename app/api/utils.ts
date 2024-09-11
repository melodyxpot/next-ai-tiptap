import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export const withRateLimit =
  (handler: (req: Request, res: Response) => Promise<NextResponse>) =>
  async (req: Request, res: Response) => {
    if (
      process.env.NODE_ENV === "production" &&
      process.env.KV_REST_API_URL &&
      process.env.KV_REST_API_TOKEN
    ) {
      const ip = req.headers.get("x-forwarded-for");
      const ratelimit = new Ratelimit({
        redis: kv,
        limiter: Ratelimit.slidingWindow(5, "10s"),
      });

      const { success, limit, reset, remaining } = await ratelimit.limit(
        `ratelimit_${ip}`,
      );

      if (!success) {
        console.log("Rate limit exceeded, returning 429...");
        return new Response("Rate limit exceeded, please try again later.", {
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          },
        });
      }
    }

    return handler(req, res);
  };
