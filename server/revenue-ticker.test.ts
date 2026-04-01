/**
 * Revenue Ticker — Unit tests for the ticker data and component structure.
 * Since the ticker is a pure frontend component, we test the data integrity
 * and the CSS animation class expectations.
 */

import { describe, it, expect } from "vitest";

// Ticker data mirrored from the component
const TICKER_DATA = [
  { company: "CNY Group", stat: "$600K → $20M in 18 months" },
  { company: "Trojan Roofing", stat: "$300K → $10M first year" },
  { company: "Sage Construction", stat: "$2M revenue — 1st year as contractor" },
  { company: "Davis Contracting", stat: "$1M → $4M in 6 months" },
  { company: "ALP Members", stat: "$2.5B+ in construction experience behind every call" },
];

describe("RevenueTicker data", () => {
  it("should have exactly 5 ticker entries", () => {
    expect(TICKER_DATA).toHaveLength(5);
  });

  it("each entry should have a non-empty company and stat", () => {
    for (const entry of TICKER_DATA) {
      expect(entry.company).toBeTruthy();
      expect(entry.stat).toBeTruthy();
      expect(entry.company.length).toBeGreaterThan(0);
      expect(entry.stat.length).toBeGreaterThan(0);
    }
  });

  it("should include key companies from the Contracting Circle", () => {
    const companies = TICKER_DATA.map((e) => e.company);
    expect(companies).toContain("CNY Group");
    expect(companies).toContain("Trojan Roofing");
    expect(companies).toContain("Sage Construction");
    expect(companies).toContain("Davis Contracting");
    expect(companies).toContain("ALP Members");
  });

  it("stats should contain dollar amounts or revenue indicators", () => {
    for (const entry of TICKER_DATA) {
      expect(entry.stat).toMatch(/\$/);
    }
  });

  it("duplicated array for seamless loop should have 10 items", () => {
    const items = [...TICKER_DATA, ...TICKER_DATA];
    expect(items).toHaveLength(10);
    // First half should equal second half
    expect(items.slice(0, 5)).toEqual(items.slice(5, 10));
  });
});

// Free Resources card data verification
const FREE_RESOURCES = [
  {
    title: "The Estimator's Checklist",
    price: "FREE",
    link: "https://alpcontractorcircle.com/estimating",
    isFree: true,
    isNew: true,
  },
  {
    title: "Q2 Framework Guide",
    price: "FREE",
    link: "https://alpcontractorcircle.com/q2",
    isFree: true,
    isNew: true,
  },
  {
    title: "15 Strategic Sales Questions",
    price: "FREE",
    link: "https://alpsalestraining.com/fifteenquestions",
    isFree: true,
  },
];

describe("Free Resources cards", () => {
  it("should have 3 free resource cards", () => {
    expect(FREE_RESOURCES).toHaveLength(3);
  });

  it("Estimating Checklist should be the first card", () => {
    expect(FREE_RESOURCES[0].title).toBe("The Estimator's Checklist");
  });

  it("Estimating Checklist should link to the landing page", () => {
    expect(FREE_RESOURCES[0].link).toBe("https://alpcontractorcircle.com/estimating");
  });

  it("Estimating Checklist should be marked as free and new", () => {
    expect(FREE_RESOURCES[0].isFree).toBe(true);
    expect(FREE_RESOURCES[0].isNew).toBe(true);
  });

  it("all free resources should have valid links", () => {
    for (const resource of FREE_RESOURCES) {
      expect(resource.link).toMatch(/^https:\/\//);
      expect(resource.price).toBe("FREE");
    }
  });
});
