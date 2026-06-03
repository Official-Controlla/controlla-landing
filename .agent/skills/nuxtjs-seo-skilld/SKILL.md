---
name: nuxtjs-seo-skilld
description: "ALWAYS use when writing code importing \"@nuxtjs/seo\". Consult for debugging, best practices, or modifying @nuxtjs/seo, nuxtjs/seo, nuxtjs seo, nuxt-seo, nuxt seo."
metadata:
  version: 5.1.3
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-06-03
---

# harlan-zw/nuxt-seo `@nuxtjs/seo@5.1.3`
**Tags:** latest: 5.1.3

**References:** [package.json](./.skilld/pkg/package.json) • [Docs](./.skilld/docs/_INDEX.md) • [Issues](./.skilld/issues/_INDEX.md) • [Discussions](./.skilld/discussions/_INDEX.md) • [Releases](./.skilld/releases/_INDEX.md)

## Search

Use `skilld search "query" -p @nuxtjs/seo` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @nuxtjs/seo` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes — prioritize recent major/minor releases.

## Breaking Changes (v4 → v5)

- BREAKING: `useSiteConfig()` — server-side composable removed in v5 Site Config v4. Replace with `getSiteConfig(event)` which takes the Nuxt event object [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L64)

- BREAKING: `SiteConfig` type renamed to `SiteConfigResolved` in v5 Site Config v4 [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L66)

- BREAKING: Legacy runtime config keys removed in v5 — `siteUrl`, `siteName`, `siteDescription` no longer supported. Migrate to `site` object with `url`, `name`, `description` properties [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L45:L60)

- BREAKING: Site name no longer auto-inferred from `package.json` or directory name in v5 Site Config v4. Must set `site.name` explicitly in `nuxt.config` [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L31:L41)

- BREAKING: `getSiteIndexable()` removed in v5 Site Config v4. Access via `getSiteConfig(event).indexable` instead [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L65)

- BREAKING: `asSeoCollection()` wrapper deprecated in v5 (Content v3 integration). Replace with composing individual `defineRobotsSchema()`, `defineSitemapSchema()`, `defineOgImageSchema()`, `defineSchemaOrgSchema()` in your content.config.ts schema [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L73:L105)

- BREAKING: Individual Content v3 collection wrappers renamed — `asRobotsCollection()` → `defineRobotsSchema()`, `asSitemapCollection()` → `defineSitemapSchema()`, `asOgImageCollection()` → `defineOgImageSchema()`, `asSchemaOrgCollection()` → `defineSchemaOrgSchema()` [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L129:L139)

- BREAKING: `#internal/nuxt-site-config` import path removed in v5 Site Config v4. Use named imports from `nuxt-site-config` package directly [source](./.skilld/docs/content/6.migration-guide/5.v4-to-v5.md:L67)

## New APIs (v5.0.0)

- NEW: `useShareLinks()` — new composable in SEO Utils v8 for generating social sharing URLs (Twitter, Facebook, LinkedIn, WhatsApp, Telegram, Reddit, Pinterest, Email) with built-in UTM tracking [source](./.skilld/releases/v5.0.0.md:L57:L76)

- NEW: `definePageMeta` sitemap options — Sitemap v8 supports configuring sitemap properties (changefreq, priority) directly in `definePageMeta()` instead of route rules [source](./.skilld/releases/v5.0.0.md:L129:L141)

- NEW: ESLint integration for Link Checker v5 — `link-checker/valid-route` (error) and `link-checker/valid-sitemap-link` (warn) rules validate route links in Vue templates, TS/JS code, and Markdown with zero-config `@nuxt/eslint` support [source](./.skilld/releases/v5.0.0.md:L32:L54)

- NEW: Inline minification — SEO Utils v8 automatically minifies inline scripts and styles injected via `useHead()` [source](./.skilld/releases/v5.0.0.md:L88:L125)

## Features (v5.0.0)

- `nuxt-seo-utils icons` CLI — new command generates favicon.ico and PNG icon variants (16, 32, 192, 512px, apple-touch-icon) from source image [source](./.skilld/releases/v5.0.0.md:L78:L86)

- Debug production endpoints — Robots, Sitemap, and SEO Utils expose debug endpoints in production (`/__robots__/debug-production.json`, `/__sitemap__/debug-production.json`, `/__nuxt-seo-utils`) [source](./.skilld/releases/v5.0.0.md:L149:L153)

- i18n multi-sitemap auto-expansion — custom sitemaps with `includeAppSources: true` now automatically expand per locale, removing need to manually define per-locale sitemaps [source](./.skilld/releases/v5.0.0.md#i18n-multi-sitemap-improvements)

- `SiteConfigPriority` constants — named priority constants now available via `SiteConfigPriority.runtime`, etc. [source](./.skilld/releases/v5.0.0.md:L155)

**Also changed:** DevTools Unity (shared layer foundation across modules) · SSR memory leaks fixed in Schema.org and Site Config · i18n sitemap base URL fixes · Schema.org `@id` URL resolution respects `app.baseURL` · route rules nullish guard in Robots
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices: @nuxtjs/seo v5.1.3

## Best Practices

- Configure Site Config before other modules — all SEO modules depend on `site.url`, `site.name`, and `site.description` being set explicitly in `nuxt.config.ts`. These values are no longer inferred from package.json [source](./references/@nuxtjs/seo@5.1.3/docs/content/6.migration-guide/5.v4-to-v5.md:L27:L41)

- Use `useSeoMeta()` for per-page titles and descriptions — call this composable in page components to set reactive metadata; use `useServerSeoMeta()` when the content doesn't need reactivity for better performance [source](./repos/harlan-zw/nuxt-seo/discussions/discussion-322.md#accepted-answer)

- Set global OG images via `routeRules` instead of `app.vue` — this prevents redundant image regeneration on every route during static generation and reduces build time [source](./repos/harlan-zw/nuxt-seo/discussions/discussion-232.md)

- Use environment variables for environment-specific Site Config — set `NUXT_SITE_URL` and `NUXT_SITE_ENV` in `.env.staging` and `.env.production` so non-production environments are automatically blocked from indexing [source](./references/@nuxtjs/seo@5.1.3/docs/content/2.guides/5.site-config.md:L43:L63)

- Load `@nuxtjs/seo` before `@nuxt/content` — module order is critical for Content v3 integration; Nuxt SEO must be loaded first [source](./references/@nuxtjs/seo@5.1.3/docs/content/2.guides/2.nuxt-content.md:L100:L110)

- Replace deprecated `asSeoCollection()` with composed `defineXxxSchema()` — use individual functions like `defineRobotsSchema()`, `defineSitemapSchema()`, `defineOgImageSchema()`, and `defineSchemaOrgSchema()` composed in the collection schema for Content v3 [source](./references/@nuxtjs/seo@5.1.3/docs/content/6.migration-guide/5.v4-to-v5.md:L69:L127)

- Configure per-page sitemap options via `definePageMeta()` — in v5+, you can set `changefreq` and `priority` directly in each page's `definePageMeta` instead of using route rules [source](./references/@nuxtjs/seo@5.1.3/docs/content/6.migration-guide/5.v4-to-v5.md:L154:L169)

- Let i18n custom sitemaps auto-expand per locale — sitemaps with `includeAppSources: true` are automatically expanded for each locale; you no longer need to manually define one sitemap per language [source](./references/@nuxtjs/seo@5.1.3/docs/content/6.migration-guide/5.v4-to-v5.md:L171:L184)

- Leverage DevTools setup checklist to validate configuration — the unified DevTools layer provides a setup checklist across all modules with flagged required and recommended actions [source](./references/@nuxtjs/seo@5.1.3/docs/content/7.releases/1.v5.md:L18:L30)

- Use ESLint link checking for relative route validation — enable the ESLint integration with zero-config `@nuxt/eslint` support; the `link-checker/valid-route` rule validates relative URLs with "did you mean?" suggestions [source](./references/@nuxtjs/seo@5.1.3/docs/content/7.releases/1.v5.md:L32:L54)

- Generate social share URLs with `useShareLinks()` — this composable creates platform-specific sharing URLs (Twitter, LinkedIn, Facebook, etc.) with automatic UTM tracking; pass `utm: false` to disable tracking [source](./references/@nuxtjs/seo@5.1.3/docs/content/7.releases/1.v5.md:L56:L78)

- Use the favicon generation CLI for icon variants — run `npx nuxt-seo-utils icons --source logo.svg` to generate all favicon and icon sizes (16, 32, 192, 512px) and apple-touch-icon from a single source image [source](./references/@nuxtjs/seo@5.1.3/docs/content/7.releases/1.v5.md:L80:L88)

- Inline scripts and styles are automatically minified — `useHead()` inline scripts and styles are minified in production without manual configuration, reducing payload size [source](./references/@nuxtjs/seo@5.1.3/docs/content/7.releases/1.v5.md:L90:L127)

- Mark dynamic i18n sitemap URLs with the `_sitemap` field — when using dynamic URLs with `_sitemap-urls.ts`, assign each URL entry a `_sitemap` field with the locale code to control which language-specific sitemap it appears in [source](./repos/harlan-zw/nuxt-seo/discussions/discussion-167.md#accepted-answer)
<!-- /skilld:best-practices -->
