// ─── Shared TypeScript types ──────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

// ─── How it works ─────────────────────────────────────────────────────────────

export type StepArtType = "doc" | "flow" | "arch" | "code" | "qa" | "deploy";

export interface Step {
  key: string;
  label: string;
  sub: string;
  title: string;
  desc: string;
  meta: string[];
  art: StepArtType;
}

// ─── Tools ────────────────────────────────────────────────────────────────────

export interface Tool {
  mark: string;
  name: string;
  role: string;
  body: string;
  uses: string[];
  accent?: boolean;
}

// ─── Services ─────────────────────────────────────────────────────────────────

export interface ServiceMeta {
  label: string;
  value: string;
}

export interface Service {
  id: string;
  num: string;
  title: string;
  meta: ServiceMeta[];
  ctaLabel: string;
  description: string;
  sectionTitle: string;
  items: string[];
  callout: string;
  calloutSub: string;
}

// ─── Case studies ─────────────────────────────────────────────────────────────

export interface CaseResult {
  value: string;
  label: string;
}

export interface CaseSidebar {
  label: string;
  value: string;
}

export interface Case {
  id: string;
  tags: string[];
  accentTag: string;
  title: string;
  lede: string;
  imgClass: string;
  annotTl: string;
  sidebar: CaseSidebar[];
  problem: string;
  shipped: string;
  quote: string;
  quoteCite: string;
  aiNote: string;
  results: CaseResult[];
}

// ─── Use cases ────────────────────────────────────────────────────────────────

export type UseCaseIconKey =
  | "rocket"
  | "compass"
  | "code"
  | "megaphone"
  | "pen"
  | "settings";

export interface UseCaseCapability {
  title: string;
  body: string;
}

export interface UseCaseStep {
  title: string;
  body: string;
}

export interface UseCaseOutcome {
  value: string;
  label: string;
}

export interface UseCase {
  // Card + identity
  slug: string;
  role: string;
  icon: UseCaseIconKey;
  index: string;
  title: string;
  desc: string;
  points: string[];

  // Long-form detail page
  heroHeading: string;
  heroLede: string;
  intro: string[];
  capabilities: UseCaseCapability[];
  workflow: UseCaseStep[];
  scenario: { before: string[]; after: string[] };
  outcomes: UseCaseOutcome[];
  faqs: FaqItem[];
}

// ─── Contact form ─────────────────────────────────────────────────────────────

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export interface FaqItem {
  question: string;
  answer: string;
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

export type BlogKwColor = "accent" | "purple" | "green";

export type BlogContentBlock =
  | { type: "p"; text: string; html?: boolean }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; text: string }
  | { type: "blockquote"; text: string; cite?: string }
  | { type: "code"; label: string; lines: { n: number; kw: string; kwColor: BlogKwColor; text: string }[] }
  | { type: "two_col"; left: { head: string; color: string; items: string[] }; right: { head: string; color: string; items: string[] } }
  | { type: "stats"; items: { value: string; label: string }[] };

export interface BlogAuthor {
  name: string;
  role: string;
  initials: string;
  bio?: string;
  links?: { label: string; href: string }[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: BlogAuthor;
  date: string;
  readTime: string;
  featured?: boolean;
  content?: BlogContentBlock[];
}

// View-model for public blog pages, mapped from the MongoDB `BlogPost` doc.
export interface PublicPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  authorInitials: string;
  date: string;
  readTime: string;
  contentHtml: string;
  featuredImage?: string;
  // SEO / structured-data pass-through (see lib/blog.ts#toPublic)
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
  imageAlt?: string;
  schemaMarkup?: string;
  faq?: IBlogFaqItem[];
}

// View-model for the public testimonials carousel, mapped from the MongoDB doc.
export interface PublicTestimonial {
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
}

export interface ISubscriber {
  email: string;
  createdAt?: Date;
}

// ─── Mongoose Lead model ──────────────────────────────────────────────────────

export interface ILead {
  name: string;
  email: string;
  company: string;
  phone?: string;
  createdAt?: Date;
}

// ─── Admin — User ─────────────────────────────────────────────────────────────

export type AdminUserRole = "admin" | "editor" | "author";

export interface IAdminUser {
  _id?: string;
  name: string;
  email: string;
  role: AdminUserRole;
  avatar?: string;
  active: boolean;
  passwordHash?: string;
  lastLoginAt?: Date | string;
  // Brute-force protection (lib/login-security.ts)
  failedLoginAttempts?: number;
  lastFailedLogin?: Date | string;
  lockUntil?: Date | string;
  createdAt?: Date;
  updatedAt?: Date;
}

// ─── Admin — Taxonomy (Category / Tag) ────────────────────────────────────────

export interface ICategory {
  _id?: string;
  name: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITag {
  _id?: string;
  name: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Row shape returned by the taxonomy list endpoints (adds usage count).
export interface ITaxonomyItem {
  _id: string;
  name: string;
  slug: string;
  postCount: number;
}

// ─── Admin — Redirect ─────────────────────────────────────────────────────────

export interface IRedirect {
  _id?: string;
  sourceUrl: string;
  targetUrl: string;
  enabled: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// ─── Admin — Auth audit log ───────────────────────────────────────────────────

export interface IAuthLog {
  _id?: string;
  event: "login" | "password_change" | "username_change";
  email?: string | null;
  userId?: string | null;
  success: boolean;
  reason?: string;
  ip?: string;
  userAgent?: string;
  createdAt?: Date;
}

// ─── Admin — Testimonial ──────────────────────────────────────────────────────

export interface ITestimonial {
  _id?: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
  image?: string;
  visible: boolean;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// ─── Admin — Blog Post ────────────────────────────────────────────────────────

export type BlogPostStatus = "draft" | "published";

export interface IBlogFaqItem {
  q: string;
  a: string;
}

export interface IBlogPostDoc {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  status: BlogPostStatus;
  author: string;
  tags: string[];
  category?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  ogImage?: string;
  imageAlt?: string;
  schemaMarkup?: string;
  faq?: IBlogFaqItem[];
  readMin?: number;
  publishedAt?: Date | string;
  deletedAt?: Date | string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
