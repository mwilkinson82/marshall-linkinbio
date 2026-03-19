/**
 * Templates Page — Downloadable resources for Contracting Circle members.
 * All templates are real, battle-tested resources built through the ALP framework.
 */
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileDown,
  FileText,
  FileSpreadsheet,
  Presentation,
  Search,
  Download,
  Star,
  FolderOpen,
  BookOpen,
  Target,
  Shield,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

type TemplateCategory = "all" | "proposals" | "contracts" | "sales" | "operations" | "finance";

interface Template {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: Exclude<TemplateCategory, "all">;
  fileType: "pdf" | "docx" | "xlsx";
  downloadUrl: string;
  featured?: boolean;
  badge?: string;
  highlights: string[];
}

const TEMPLATES: Template[] = [
  {
    id: "1",
    title: "Contractor Proposal Template",
    description: "10-section professional proposal with 3-tier pricing, scope of work, timeline, and built-in ALP authority positioning.",
    longDescription: "A complete 10-section proposal template built on the ALP framework. Includes cover page, personal note, project vision, scope of work, 3-tier investment options (Essential / Signature / Estate), payment schedule, project timeline, credentials, guarantee, and signature page. Every section includes coaching notes on how to fill it in.",
    category: "proposals",
    fileType: "docx",
    downloadUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663332724241/F8sHs44hWg957N49MHxas2/ALP_Proposal_Template_9bd32fa6.docx",
    featured: true,
    badge: "Most Used",
    highlights: [
      "3-tier pricing structure (Essential / Signature / Estate)",
      "ALP authority positioning notes throughout",
      "Complete payment schedule with milestone triggers",
      "Built-in project timeline by phase",
      "Professional signature/agreement page",
    ],
  },
  {
    id: "2",
    title: "Construction Agreement Template",
    description: "10-article contractor agreement covering scope, payments, change orders, warranty, and dispute resolution.",
    longDescription: "A comprehensive construction contract template with 10 articles covering: scope of work with inclusions and exclusions, contract price and payment schedule, change order process, project schedule, materials and substitutions, permits and code compliance, warranty terms, insurance and liability, dispute resolution, and general provisions.",
    category: "contracts",
    fileType: "docx",
    downloadUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663332724241/F8sHs44hWg957N49MHxas2/ALP_Contract_Template_5fa054ea.docx",
    featured: false,
    badge: "Legal",
    highlights: [
      "10 complete articles covering all project phases",
      "Change order process and authorization",
      "Warranty terms with response commitments",
      "Dispute resolution and contractor lien rights",
      "Professional signature page with tier selection",
    ],
  },
  {
    id: "3",
    title: "Follow-Up Email Scripts (7 Scripts)",
    description: "7 Authority Gap email scripts + 5 text message scripts. Covers Day 1 through Day 14 of the sales cycle.",
    longDescription: "The complete Authority Gap follow-up system. 7 email scripts timed from same-day through Day 14, plus 5 text message scripts. Each script is built around the three pillars: Authority, Familiarity, and Trust. Includes the Case Study email, Education email, Vision email, Operational Urgency email, Decision Framework email, and the Final Follow-Up.",
    category: "sales",
    fileType: "docx",
    downloadUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663332724241/F8sHs44hWg957N49MHxas2/ALP_FollowUp_Email_Scripts_a4aa2c6c.docx",
    featured: true,
    badge: "Authority Gap",
    highlights: [
      "7 complete email scripts with subject lines",
      "5 text message scripts",
      "Timing guide: Day 1 through Day 14",
      "Coach's notes on when and how to use each script",
      "Built on Authority, Familiarity, and Trust framework",
    ],
  },
  {
    id: "4",
    title: "Objection Reframing Guide",
    description: "The 4 core objections contractors face, reframed as 'next decisions.' Includes word-for-word scripts for each.",
    longDescription: "The ALP Objection Control system. Covers the 4 core objections: 'It's more than we expected,' 'We need to think about it,' 'Can you sharpen your pencil?', and 'I need to talk to my spouse.' Each objection includes: what they actually mean, the wrong response, the ALP response, the next decision to control, and 2-3 word-for-word scripts. Plus bonus section covering 4 additional objections.",
    category: "sales",
    fileType: "docx",
    downloadUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663332724241/F8sHs44hWg957N49MHxas2/ALP_Objection_Reframing_Guide_7e99a43e.docx",
    featured: true,
    badge: "Decision Control",
    highlights: [
      "4 core objections with full handling scripts",
      "Wrong response vs. ALP response comparison",
      "Next decision framework for each objection",
      "4 bonus objections (lower bid, wait until next year, more bids, payments)",
      "The Objection Control Formula: Identify → Determine → Direct",
    ],
  },
  {
    id: "5",
    title: "Bid Sheet & Estimating Template",
    description: "6-tab Excel estimating system with 100+ line items, 10 divisions, subcontractor bid comparison, and payment tracker.",
    longDescription: "A comprehensive construction estimating workbook with 6 tabs: Project Summary (with 3-tier pricing), Detail Estimate (100+ line items across 10 divisions), Subcontractor Bid Comparison, Change Order Log, Payment Tracker, and Instructions. All formulas are pre-built — enter quantities and unit costs, everything calculates automatically.",
    category: "finance",
    fileType: "xlsx",
    downloadUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663332724241/F8sHs44hWg957N49MHxas2/ALP_Bid_Sheet_Estimating_Template_c8dc8bf7.xlsx",
    featured: true,
    badge: "Airtight",
    highlights: [
      "100+ line items across 10 construction divisions",
      "Automatic labor, material, and subcontractor totals",
      "Overhead & profit calculator with margin controls",
      "3-tier pricing section for proposal presentation",
      "Subcontractor bid comparison + change order log",
    ],
  },
  {
    id: "6",
    title: "Project Management Systems — Presentation",
    description: "Marshall's complete PM systems deck. The exact framework used to manage $2.5B+ in construction projects.",
    longDescription: "The Project Management Systems presentation deck — Marshall's complete framework for running construction projects at scale. Covers the systems, processes, and workflows that enabled $2.5B+ in construction. Use this as a training tool for your team or as a reference for building your own PM systems.",
    category: "operations",
    fileType: "pdf",
    downloadUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663332724241/F8sHs44hWg957N49MHxas2/ALP_PM_Systems_Presentation_356d32d8.pdf",
    featured: false,
    badge: "Marshall's System",
    highlights: [
      "Marshall's personal PM framework from $2.5B+ in construction",
      "Systems and processes for scaling your operation",
      "Team training and workflow documentation",
      "Reference guide for building your own PM systems",
    ],
  },
  {
    id: "7",
    title: "Project Management Systems — Spreadsheets",
    description: "The companion spreadsheet toolkit to the PM Systems presentation. Ready-to-use tracking tools.",
    longDescription: "The companion spreadsheet toolkit to the PM Systems presentation deck. Includes the tracking tools, templates, and worksheets that go with Marshall's PM framework. Use alongside the presentation deck for a complete project management system.",
    category: "operations",
    fileType: "xlsx",
    downloadUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663332724241/F8sHs44hWg957N49MHxas2/ALP_PM_Systems_Spreadsheets_8e2425fc.xlsx",
    featured: false,
    badge: "Marshall's System",
    highlights: [
      "Companion to the PM Systems presentation deck",
      "Ready-to-use tracking tools and worksheets",
      "Pair with the PDF for the complete PM system",
    ],
  },
];

const CATEGORIES: { value: TemplateCategory; label: string; icon: React.ElementType; count: number }[] = [
  { value: "all", label: "All Templates", icon: FolderOpen, count: TEMPLATES.length },
  { value: "proposals", label: "Proposals", icon: FileText, count: TEMPLATES.filter(t => t.category === "proposals").length },
  { value: "contracts", label: "Contracts", icon: Shield, count: TEMPLATES.filter(t => t.category === "contracts").length },
  { value: "sales", label: "Sales", icon: Target, count: TEMPLATES.filter(t => t.category === "sales").length },
  { value: "operations", label: "Operations", icon: BarChart3, count: TEMPLATES.filter(t => t.category === "operations").length },
  { value: "finance", label: "Finance", icon: FileSpreadsheet, count: TEMPLATES.filter(t => t.category === "finance").length },
];

function fileTypeConfig(type: string) {
  const configs: Record<string, { color: string; bg: string; label: string; icon: React.ElementType }> = {
    pdf: { color: "text-red-400", bg: "bg-red-500/10", label: "PDF", icon: BookOpen },
    docx: { color: "text-blue-400", bg: "bg-blue-500/10", label: "DOCX", icon: FileText },
    xlsx: { color: "text-green-400", bg: "bg-green-500/10", label: "XLSX", icon: FileSpreadsheet },
  };
  return configs[type] || configs.pdf;
}

function handleDownload(url: string, filename: string) {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function PortalTemplates() {
  const [activeCategory, setActiveCategory] = useState<TemplateCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter(t => {
      if (activeCategory !== "all" && t.category !== activeCategory) return false;
      if (searchQuery && !t.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !t.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [activeCategory, searchQuery]);

  const featuredTemplates = TEMPLATES.filter(t => t.featured);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-cream">
          Template Library
        </h1>
        <p className="text-cream-muted mt-1">
          Battle-tested templates built on the ALP framework. Download, customize, and deploy.
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Templates", value: TEMPLATES.length.toString() },
          { label: "Immediately Usable", value: "100%" },
          { label: "ALP Framework", value: "Built In" },
        ].map(stat => (
          <div key={stat.label} className="glass-card rounded-xl p-3 md:p-4 text-center">
            <div className="font-heading text-lg md:text-2xl font-bold text-ember">{stat.value}</div>
            <div className="text-cream-muted text-[10px] md:text-xs mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Featured Templates */}
      {featuredTemplates.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-ember" />
            <h2 className="font-heading text-sm font-semibold text-ember uppercase tracking-wider">Featured Templates</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredTemplates.map((template, i) => {
              const ft = fileTypeConfig(template.fileType);
              const Icon = ft.icon;
              return (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="group glass-card rounded-xl p-5 flex flex-col hover:bg-white/[0.04] transition-all duration-300 border border-ember/10 cursor-pointer"
                  onClick={() => handleDownload(template.downloadUrl, `${template.title}.${template.fileType}`)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider ${ft.bg} ${ft.color}`}>
                      {ft.label}
                    </span>
                    {template.badge && (
                      <span className="text-[9px] font-semibold text-ember bg-ember/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {template.badge}
                      </span>
                    )}
                  </div>
                  <div className={`w-9 h-9 rounded-lg ${ft.bg} flex items-center justify-center mb-3`}>
                    <Icon className={`w-4.5 h-4.5 ${ft.color}`} />
                  </div>
                  <h3 className="font-heading text-sm font-semibold text-cream group-hover:text-ember transition-colors line-clamp-2 flex-1">
                    {template.title}
                  </h3>
                  <p className="text-cream-muted text-xs mt-2 line-clamp-2">
                    {template.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-ember text-xs font-semibold">
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Free</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-muted" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-cream placeholder:text-cream-muted/50 focus:outline-none focus:border-ember/30 focus:ring-1 focus:ring-ember/20 transition-all"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.value
                    ? "bg-ember/15 text-ember border border-ember/20"
                    : "bg-white/5 text-cream-muted hover:text-cream border border-transparent"
                }`}
              >
                <Icon className="w-3 h-3" />
                {cat.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeCategory === cat.value ? "bg-ember/20 text-ember" : "bg-white/10 text-cream-muted"}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Template List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredTemplates.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card rounded-xl p-12 text-center"
            >
              <FolderOpen className="w-8 h-8 text-cream-muted mx-auto mb-3" />
              <p className="text-cream-muted text-sm">No templates match your search.</p>
            </motion.div>
          ) : (
            filteredTemplates.map((template, i) => {
              const ft = fileTypeConfig(template.fileType);
              const Icon = ft.icon;
              const isExpanded = expandedId === template.id;
              return (
                <motion.div
                  key={template.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ delay: i * 0.04 }}
                  className="group glass-card rounded-xl overflow-hidden hover:bg-white/[0.03] transition-all duration-300"
                >
                  {/* Main row */}
                  <div
                    className="flex items-center gap-4 p-4 md:p-5 cursor-pointer"
                    onClick={() => setExpandedId(isExpanded ? null : template.id)}
                  >
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${ft.bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 md:w-6 md:h-6 ${ft.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider ${ft.bg} ${ft.color}`}>
                          {ft.label}
                        </span>
                        <span className="text-cream-muted text-[10px] uppercase tracking-wider">
                          {template.category}
                        </span>
                        {template.badge && (
                          <span className="text-[9px] font-semibold text-ember bg-ember/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                            {template.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="font-heading text-sm font-semibold text-cream group-hover:text-ember transition-colors">
                        {template.title}
                      </h3>
                      <p className="text-cream-muted text-xs mt-1 line-clamp-1 hidden sm:block">
                        {template.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          handleDownload(template.downloadUrl, `${template.title}.${template.fileType}`);
                        }}
                        className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-ember/10 hover:bg-ember/20 flex items-center justify-center transition-all"
                        title="Download"
                      >
                        <Download className="w-4 h-4 text-ember" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 md:px-5 pb-5 border-t border-white/5 pt-4">
                          <p className="text-cream-muted text-sm mb-4 leading-relaxed">
                            {template.longDescription}
                          </p>
                          <div className="space-y-2 mb-5">
                            <p className="text-xs font-semibold text-ember uppercase tracking-wider">What's Inside</p>
                            {template.highlights.map((h, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-ember shrink-0 mt-0.5" />
                                <span className="text-cream-muted text-xs">{h}</span>
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={() => handleDownload(template.downloadUrl, `${template.title}.${template.fileType}`)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-ember/10 hover:bg-ember/20 border border-ember/20 rounded-lg text-ember text-sm font-semibold transition-all"
                          >
                            <Download className="w-4 h-4" />
                            Download {template.fileType.toUpperCase()}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Info Note */}
      <div className="glass-card rounded-xl p-5 text-center">
        <p className="text-cream-muted text-sm">
          New templates are added regularly. Have a template request? Drop it in the Discord.
        </p>
      </div>
    </div>
  );
}
