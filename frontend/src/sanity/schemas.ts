export const blogPost = {
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (Rule: any) => Rule.required() },
    { name: "author", title: "Author", type: "string" },
    { name: "excerpt", title: "Excerpt", type: "text" },
    { name: "content", title: "Content", type: "blockContent" },
    { name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } },
    { name: "categories", title: "Categories", type: "array", of: [{ type: "reference", to: [{ type: "category" }] }] },
    { name: "tags", title: "Tags", type: "array", of: [{ type: "reference", to: [{ type: "tag" }] }] },
    { name: "publishedAt", title: "Published At", type: "datetime" },
    { name: "seoTitle", title: "SEO Title", type: "string" },
    { name: "seoDescription", title: "SEO Description", type: "string" },
    { name: "canonicalUrl", title: "Canonical URL", type: "url" },
  ],
  preview: { select: { title: "title", media: "coverImage" } },
}

export const category = {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (Rule: any) => Rule.required() },
    { name: "description", title: "Description", type: "text" },
  ],
}

export const tag = {
  name: "tag",
  title: "Tag",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 48 } },
  ],
}

export const testimonial = {
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "company", title: "Company", type: "string" },
    { name: "role", title: "Role", type: "string" },
    { name: "content", title: "Content", type: "text", validation: (Rule: any) => Rule.required() },
    { name: "avatar", title: "Avatar", type: "image" },
    { name: "rating", title: "Rating", type: "number", options: { min: 1, max: 5 } },
    { name: "featured", title: "Featured", type: "boolean" },
    { name: "service", title: "Service", type: "string" },
  ],
  preview: { select: { title: "name", subtitle: "company", media: "avatar" } },
}

export const caseStudy = {
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (Rule: any) => Rule.required() },
    { name: "client", title: "Client", type: "string" },
    { name: "industry", title: "Industry", type: "string" },
    { name: "service", title: "Service", type: "string" },
    { name: "overview", title: "Overview", type: "blockContent" },
    { name: "challenge", title: "Challenge", type: "blockContent" },
    { name: "approach", title: "Approach", type: "blockContent" },
    { name: "results", title: "Results", type: "blockContent" },
    { name: "metrics", title: "Metrics", type: "array", of: [{ type: "object", fields: [{ name: "label", type: "string" }, { name: "value", type: "string" }] }] },
    { name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } },
    { name: "publishedAt", title: "Published At", type: "datetime" },
    { name: "featured", title: "Featured", type: "boolean" },
  ],
  preview: { select: { title: "title", subtitle: "client", media: "coverImage" } },
}

export const portfolio = {
  name: "portfolio",
  title: "Portfolio",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (Rule: any) => Rule.required() },
    { name: "client", title: "Client", type: "string" },
    { name: "industry", title: "Industry", type: "string" },
    { name: "service", title: "Service", type: "string" },
    { name: "description", title: "Description", type: "text" },
    { name: "images", title: "Images", type: "array", of: [{ type: "image", options: { hotspot: true } }] },
    { name: "url", title: "Website URL", type: "url" },
    { name: "publishedAt", title: "Published At", type: "datetime" },
    { name: "featured", title: "Featured", type: "boolean" },
  ],
  preview: { select: { title: "title", subtitle: "client" } },
}

export const lead = {
  name: "lead",
  title: "Lead",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "email", title: "Email", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "phone", title: "Phone", type: "string" },
    { name: "company", title: "Company", type: "string" },
    { name: "service", title: "Service", type: "string" },
    { name: "message", title: "Message", type: "text" },
    { name: "source", title: "Source", type: "string" },
    { name: "status", title: "Status", type: "string", options: { list: ["new", "contacted", "qualified", "converted", "lost"] } },
    { name: "createdAt", title: "Created At", type: "datetime" },
  ],
  preview: { select: { title: "name", subtitle: "email" } },
}

export const setting = {
  name: "setting",
  title: "Setting",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "value", title: "Value", type: "text" },
  ],
}

export const blockContent = {
  name: "blockContent",
  title: "Block Content",
  type: "array",
  of: [
    { type: "block", styles: [{ title: "Normal", value: "normal" }, { title: "H2", value: "h2" }, { title: "H3", value: "h3" }, { title: "H4", value: "h4" }, { title: "Quote", value: "blockquote" }], lists: [{ title: "Bullet", value: "bullet" }, { title: "Numbered", value: "number" }], marks: { decorators: [{ title: "Bold", value: "strong" }, { title: "Italic", value: "em" }, { title: "Code", value: "code" }] } },
    { type: "image", options: { hotspot: true } },
    { type: "code" },
  ],
}

export const schemaTypes = [blogPost, category, tag, testimonial, caseStudy, portfolio, lead, setting, blockContent]
