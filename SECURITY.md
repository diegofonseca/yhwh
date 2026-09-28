# Security Policy

## Supported versions

Only the latest published version receives security fixes.

## Reporting a vulnerability

Please **do not open a public issue**. Use GitHub's
[private vulnerability reporting](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability)
("Security" tab → "Report a vulnerability") on this repository.

You can expect an initial response within 7 days.

## Design guarantees

- No runtime or install-time dependencies, and no install scripts.
- The only network destination is `https://api.getbible.net`.
- Remote text is sanitized (control characters, bidi overrides, HTML tags) and length-limited.
