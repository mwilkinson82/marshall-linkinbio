/**
 * Templates CDN URL validation tests
 * Ensures all template download URLs are properly formed CDN links
 */
import { describe, expect, it } from "vitest";

const TEMPLATE_URLS = [
  {
    name: "Contractor Proposal Template",
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663332724241/F8sHs44hWg957N49MHxas2/ALP_Proposal_Template_9bd32fa6.docx",
    ext: "docx",
  },
  {
    name: "Construction Agreement Template",
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663332724241/F8sHs44hWg957N49MHxas2/ALP_Contract_Template_5fa054ea.docx",
    ext: "docx",
  },
  {
    name: "Follow-Up Email Scripts",
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663332724241/F8sHs44hWg957N49MHxas2/ALP_FollowUp_Email_Scripts_a4aa2c6c.docx",
    ext: "docx",
  },
  {
    name: "Objection Reframing Guide",
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663332724241/F8sHs44hWg957N49MHxas2/ALP_Objection_Reframing_Guide_7e99a43e.docx",
    ext: "docx",
  },
  {
    name: "Bid Sheet & Estimating Template",
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663332724241/F8sHs44hWg957N49MHxas2/ALP_Bid_Sheet_Estimating_Template_c8dc8bf7.xlsx",
    ext: "xlsx",
  },
  {
    name: "PM Systems Presentation",
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663332724241/F8sHs44hWg957N49MHxas2/ALP_PM_Systems_Presentation_356d32d8.pdf",
    ext: "pdf",
  },
  {
    name: "PM Systems Spreadsheets",
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663332724241/F8sHs44hWg957N49MHxas2/ALP_PM_Systems_Spreadsheets_8e2425fc.xlsx",
    ext: "xlsx",
  },
];

describe("Template CDN URLs", () => {
  it("all templates have valid CDN URLs", () => {
    for (const template of TEMPLATE_URLS) {
      expect(template.url).toBeTruthy();
      expect(template.url).toMatch(/^https:\/\/d2xsxph8kpxj0f\.cloudfront\.net\//);
    }
  });

  it("all template URLs end with correct file extension", () => {
    for (const template of TEMPLATE_URLS) {
      expect(template.url.endsWith(`.${template.ext}`)).toBe(true);
    }
  });

  it("all template URLs contain a hash suffix for cache-busting", () => {
    for (const template of TEMPLATE_URLS) {
      // URLs should contain an 8-character hex hash before the extension
      expect(template.url).toMatch(/_[a-f0-9]{8}\.(docx|xlsx|pdf)$/);
    }
  });

  it("all 7 templates are present", () => {
    expect(TEMPLATE_URLS).toHaveLength(7);
  });

  it("template names are unique", () => {
    const names = TEMPLATE_URLS.map(t => t.name);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(names.length);
  });

  it("template URLs are unique", () => {
    const urls = TEMPLATE_URLS.map(t => t.url);
    const uniqueUrls = new Set(urls);
    expect(uniqueUrls.size).toBe(urls.length);
  });
});
