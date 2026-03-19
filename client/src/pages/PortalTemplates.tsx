/**
 * Templates Page — Downloadable resources for Contracting Circle members.
 * Placeholder content that Marshall can populate with real templates.
 */
import { useState, useMemo } from "react";
import {
  FileDown,
  FileText,
  FileSpreadsheet,
  Presentation,
  Search,
  Download,
  Star,
  FolderOpen,
  ExternalLink,
} from "lucide-react";

type TemplateCategory = "all" | "proposals" | "contracts" | "sales" | "operations" | "finance";

interface Template {
  id: string;
  title: string;
  description: string;
  category: Exclude<TemplateCategory, "all">;
  fileType: "pdf" | "docx" | "xlsx" | "pptx";
  downloadUrl?: string;
  featured?: boolean;
}

// Placeholder templates — Marshall will replace with real files
const TEMPLATES: Template[] = [
  {
    id: "1",
    title: "Construction Proposal Template",
    description: "Professional proposal template with scope of work, timeline, and pricing sections. Ready to customize for any project.",
    category: "proposals",
    fileType: "docx",
    featured: true,
  },
  {
    id: "2",
    title: "Subcontractor Agreement",
    description: "Standard subcontractor agreement covering scope, payment terms, insurance requirements, and dispute resolution.",
    category: "contracts",
    fileType: "docx",
  },
  {
    id: "3",
    title: "Sales Call Script — First Contact",
    description: "Proven script for initial prospect calls using the ALP methodology. Includes objection handling responses.",
    category: "sales",
    fileType: "pdf",
    featured: true,
  },
  {
    id: "4",
    title: "Project Estimating Spreadsheet",
    description: "Comprehensive estimating template with labor, materials, equipment, and overhead calculations.",
    category: "finance",
    fileType: "xlsx",
  },
  {
    id: "5",
    title: "Client Presentation Deck",
    description: "Professional slide deck template for presenting proposals and project plans to clients.",
    category: "proposals",
    fileType: "pptx",
  },
  {
    id: "6",
    title: "Change Order Template",
    description: "Standard change order form with cost breakdown, schedule impact, and approval workflow.",
    category: "contracts",
    fileType: "docx",
  },
  {
    id: "7",
    title: "Sales Pipeline Tracker",
    description: "Track your leads, proposals, and closed deals with this comprehensive pipeline management spreadsheet.",
    category: "sales",
    fileType: "xlsx",
    featured: true,
  },
  {
    id: "8",
    title: "Daily Job Report Template",
    description: "Document daily progress, weather conditions, labor hours, and materials used on each project.",
    category: "operations",
    fileType: "pdf",
  },
  {
    id: "9",
    title: "Cash Flow Projection Template",
    description: "12-month cash flow projection tool designed specifically for construction businesses.",
    category: "finance",
    fileType: "xlsx",
  },
  {
    id: "10",
    title: "Safety Meeting Checklist",
    description: "Weekly safety meeting agenda and checklist covering OSHA requirements and best practices.",
    category: "operations",
    fileType: "pdf",
  },
];

const CATEGORIES: { value: TemplateCategory; label: string; icon: any }[] = [
  { value: "all", label: "All Templates", icon: FolderOpen },
  { value: "proposals", label: "Proposals", icon: FileText },
  { value: "contracts", label: "Contracts", icon: FileText },
  { value: "sales", label: "Sales", icon: Presentation },
  { value: "operations", label: "Operations", icon: FileText },
  { value: "finance", label: "Finance", icon: FileSpreadsheet },
];

function fileTypeIcon(type: string) {
  const icons: Record<string, { color: string; bg: string; label: string }> = {
    pdf: { color: "text-red-400", bg: "bg-red-500/10", label: "PDF" },
    docx: { color: "text-blue-400", bg: "bg-blue-500/10", label: "DOCX" },
    xlsx: { color: "text-green-400", bg: "bg-green-500/10", label: "XLSX" },
    pptx: { color: "text-orange-400", bg: "bg-orange-500/10", label: "PPTX" },
  };
  return icons[type] || icons.pdf;
}

export default function PortalTemplates() {
  const [activeCategory, setActiveCategory] = useState<TemplateCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

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
          Download ready-to-use templates for proposals, contracts, sales, and operations.
        </p>
      </div>

      {/* Featured Templates */}
      {featuredTemplates.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-ember" />
            <h2 className="font-heading text-sm font-semibold text-ember uppercase tracking-wider">Most Popular</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredTemplates.map(template => {
              const ft = fileTypeIcon(template.fileType);
              return (
                <button
                  key={template.id}
                  className="group glass-card rounded-xl p-5 text-left hover:bg-white/[0.03] transition-all duration-300 border border-ember/10"
                  onClick={() => {
                    if (template.downloadUrl) {
                      window.open(template.downloadUrl, "_blank");
                    }
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider ${ft.bg} ${ft.color}`}>
                      {ft.label}
                    </span>
                  </div>
                  <h3 className="font-heading text-sm font-semibold text-cream group-hover:text-ember transition-colors line-clamp-2">
                    {template.title}
                  </h3>
                  <p className="text-cream-muted text-xs mt-2 line-clamp-2">
                    {template.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-ember text-xs font-medium">
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </div>
                </button>
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
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.value
                  ? "bg-ember/15 text-ember border border-ember/20"
                  : "bg-white/5 text-cream-muted hover:text-cream border border-transparent"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Template List */}
      <div className="space-y-3">
        {filteredTemplates.length === 0 ? (
          <div className="glass-card rounded-xl p-12 text-center">
            <FolderOpen className="w-8 h-8 text-cream-muted mx-auto mb-3" />
            <p className="text-cream-muted text-sm">No templates match your search.</p>
          </div>
        ) : (
          filteredTemplates.map(template => {
            const ft = fileTypeIcon(template.fileType);
            return (
              <div
                key={template.id}
                className="group glass-card rounded-xl p-4 md:p-5 flex items-center gap-4 hover:bg-white/[0.03] transition-all duration-300"
              >
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${ft.bg} flex items-center justify-center shrink-0`}>
                  <FileDown className={`w-5 h-5 md:w-6 md:h-6 ${ft.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider ${ft.bg} ${ft.color}`}>
                      {ft.label}
                    </span>
                    <span className="text-cream-muted text-[10px] uppercase tracking-wider">
                      {template.category.replace("_", " ")}
                    </span>
                  </div>
                  <h3 className="font-heading text-sm font-semibold text-cream group-hover:text-ember transition-colors truncate">
                    {template.title}
                  </h3>
                  <p className="text-cream-muted text-xs mt-1 line-clamp-1 hidden sm:block">
                    {template.description}
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (template.downloadUrl) {
                      window.open(template.downloadUrl, "_blank");
                    }
                  }}
                  className="shrink-0 w-10 h-10 rounded-lg bg-white/5 hover:bg-ember/10 flex items-center justify-center transition-all group-hover:bg-ember/10"
                >
                  <Download className="w-4 h-4 text-cream-muted group-hover:text-ember transition-colors" />
                </button>
              </div>
            );
          })
        )}
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
