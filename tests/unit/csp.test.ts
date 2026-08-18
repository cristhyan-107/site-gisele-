import test from "node:test";
import assert from "node:assert/strict";
import nextConfig from "../../next.config";

test("Content Security Policy (CSP) security & Google platform domain coverage", async (t) => {
  await t.test("Validates CSP directives output from nextConfig.headers()", async () => {
    if (!nextConfig.headers) {
      assert.fail("nextConfig.headers is not defined");
    }

    const headersList = await nextConfig.headers();
    const globalHeader = headersList.find((h) => h.source === "/:path*");
    assert.ok(globalHeader, "Global path header should be configured");

    const cspHeader = globalHeader.headers.find(
      (h) => h.key === "Content-Security-Policy"
    );
    assert.ok(cspHeader, "Content-Security-Policy header should be present");
    const cspValue = cspHeader.value || "";

    // Security constraints
    assert.ok(!cspValue.includes("default-src *"), "Must not use wildcard default-src");
    assert.ok(!cspValue.includes("connect-src *"), "Must not use wildcard connect-src");
    assert.ok(!cspValue.includes("script-src *"), "Must not use wildcard script-src");

    // Google Tag Manager support
    assert.ok(cspValue.includes("https://www.googletagmanager.com"), "Must contain GTM domain");

    // Google Analytics 4 support
    assert.ok(cspValue.includes("https://www.google-analytics.com"), "Must contain www.google-analytics.com");
    assert.ok(cspValue.includes("https://*.google-analytics.com"), "Must contain *.google-analytics.com");
    assert.ok(cspValue.includes("https://analytics.google.com"), "Must contain analytics.google.com");

    // Google Ads & Conversion Linker support
    assert.ok(cspValue.includes("https://ad.doubleclick.net"), "Must contain ad.doubleclick.net");
    assert.ok(cspValue.includes("https://stats.g.doubleclick.net"), "Must contain stats.g.doubleclick.net");
    assert.ok(cspValue.includes("https://googleads.g.doubleclick.net"), "Must contain googleads.g.doubleclick.net");
    assert.ok(cspValue.includes("https://www.googleadservices.com"), "Must contain www.googleadservices.com");
    assert.ok(cspValue.includes("https://pagead2.googlesyndication.com"), "Must contain pagead2.googlesyndication.com");
    assert.ok(cspValue.includes("https://www.google.com"), "Must contain www.google.com");
    assert.ok(cspValue.includes("https://www.google.com.br"), "Must contain www.google.com.br");
  });
});
