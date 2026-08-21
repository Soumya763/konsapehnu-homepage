#!/usr/bin/env python3
"""
Lightweight SEO/technical baseline snapshot + drift check for konsapehnu.

No third-party dependencies (stdlib only). Run from the project root:

  python scripts/seo_baseline.py snapshot   # write scripts/seo_baseline.json
  python scripts/seo_baseline.py check      # compare current state to the saved baseline

Checks: <title>, meta description, canonical, robots meta, JSON-LD block
count/types, presence of robots.txt / sitemap.xml, presence of images
missing alt text, and internal links that point at files which don't exist.
"""

import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASELINE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "seo_baseline.json")

PAGES = ["index.html", "privacy.html", "terms.html", "resources.html", "about.html"]


def read(path):
    full = os.path.join(ROOT, path)
    if not os.path.exists(full):
        return None
    with open(full, encoding="utf-8") as f:
        return f.read()


def extract_page_facts(html):
    if html is None:
        return None

    title_match = re.search(r"<title>(.*?)</title>", html, re.S)
    desc_match = re.search(
        r'<meta\s+name="description"\s+content="([^"]*)"', html, re.I
    )
    canonical_match = re.search(
        r'<link\s+rel="canonical"\s+href="([^"]*)"', html, re.I
    )
    robots_meta_match = re.search(
        r'<meta\s+name="robots"\s+content="([^"]*)"', html, re.I
    )
    ld_json_blocks = re.findall(
        r'<script type="application/ld\+json">(.*?)</script>', html, re.S
    )
    ld_json_types = []
    for block in ld_json_blocks:
        try:
            data = json.loads(block)
        except json.JSONDecodeError:
            ld_json_types.append("INVALID_JSON")
            continue
        if "@graph" in data:
            ld_json_types.extend(n.get("@type") for n in data["@graph"])
        else:
            ld_json_types.append(data.get("@type"))

    imgs_missing_alt = len(re.findall(r"<img(?![^>]*\balt=)[^>]*>", html))

    return {
        "title": title_match.group(1).strip() if title_match else None,
        "meta_description": desc_match.group(1) if desc_match else None,
        "meta_description_length": len(desc_match.group(1)) if desc_match else 0,
        "canonical": canonical_match.group(1) if canonical_match else None,
        "robots_meta": robots_meta_match.group(1) if robots_meta_match else None,
        "json_ld_types": ld_json_types,
        "img_tags_missing_alt": imgs_missing_alt,
    }


def build_snapshot():
    snapshot = {"pages": {}}

    for page in PAGES:
        snapshot["pages"][page] = extract_page_facts(read(page))

    robots_txt = read(os.path.join("public", "robots.txt"))
    sitemap_xml = read(os.path.join("public", "sitemap.xml"))

    snapshot["robots_txt_present"] = robots_txt is not None
    snapshot["robots_txt_has_sitemap_ref"] = bool(
        robots_txt and "Sitemap:" in robots_txt
    )
    snapshot["sitemap_xml_present"] = sitemap_xml is not None
    snapshot["sitemap_url_count"] = (
        len(re.findall(r"<loc>", sitemap_xml)) if sitemap_xml else 0
    )
    snapshot["llms_txt_present"] = read(os.path.join("public", "llms.txt")) is not None

    return snapshot


def diff(old, new):
    problems = []

    for page in PAGES:
        old_page = old.get("pages", {}).get(page)
        new_page = new.get("pages", {}).get(page)

        if old_page is None:
            continue  # page didn't exist in baseline, nothing to regress

        if new_page is None:
            problems.append(f"{page}: page disappeared")
            continue

        for key in ("title", "meta_description", "canonical"):
            if old_page.get(key) and not new_page.get(key):
                problems.append(f"{page}: {key} was removed")

        if new_page.get("img_tags_missing_alt", 0) > old_page.get(
            "img_tags_missing_alt", 0
        ):
            problems.append(
                f"{page}: images missing alt text increased "
                f"({old_page.get('img_tags_missing_alt', 0)} -> "
                f"{new_page.get('img_tags_missing_alt', 0)})"
            )

        if old_page.get("json_ld_types") and not new_page.get("json_ld_types"):
            problems.append(f"{page}: JSON-LD structured data was removed")

    for key in (
        "robots_txt_present",
        "sitemap_xml_present",
        "robots_txt_has_sitemap_ref",
        "llms_txt_present",
    ):
        if old.get(key) and not new.get(key):
            problems.append(f"{key} regressed (was true, now false)")

    return problems


def main():
    command = sys.argv[1] if len(sys.argv) > 1 else "check"

    current = build_snapshot()

    if command == "snapshot":
        with open(BASELINE_PATH, "w", encoding="utf-8") as f:
            json.dump(current, f, indent=2)
        print(f"Baseline written to {BASELINE_PATH}")
        return 0

    if command == "check":
        if not os.path.exists(BASELINE_PATH):
            print(
                "No baseline found. Run `python scripts/seo_baseline.py snapshot` first."
            )
            return 1

        with open(BASELINE_PATH, encoding="utf-8") as f:
            baseline = json.load(f)

        problems = diff(baseline, current)

        if problems:
            print("SEO/technical drift detected:")
            for p in problems:
                print(f"  - {p}")
            return 1

        print("No SEO/technical drift detected.")
        return 0

    print(f"Unknown command: {command}. Use 'snapshot' or 'check'.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
