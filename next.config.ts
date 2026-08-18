import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.googleadservices.com https://www.google.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data: https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://*.g.doubleclick.net https://googleads.g.doubleclick.net https://www.google.com https://www.google.com.br https://*.google.com https://pagead2.googlesyndication.com https://www.googleadservices.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://stats.g.doubleclick.net https://ad.doubleclick.net https://www.googletagmanager.com https://*.g.doubleclick.net https://googleads.g.doubleclick.net https://www.google.com https://www.google.com.br https://*.google.com https://pagead2.googlesyndication.com https://www.googleadservices.com",
  "frame-src https://www.googletagmanager.com",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(!isDevelopment ? ["upgrade-insecure-requests"] : []),
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), browsing-topics=()",
          },
          ...(isDevelopment
            ? []
            : [
                {
                  key: "Strict-Transport-Security",
                  value: "max-age=63072000; includeSubDomains; preload",
                },
              ]),
        ],
      },
    ];
  },
};

export default nextConfig;
