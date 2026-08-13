"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RichTextEditor } from "@/components/admin/RichTextEditor"
import { ImageUpload } from "@/components/admin/ImageUpload"
import { FaqEditor } from "@/components/admin/FaqEditor"
import { TIMEZONES, DEFAULT_TIMEZONE, zonedToUtc, utcToZonedInput } from "@/lib/schedule"
import type { IBlogPostDoc } from "@/types"

function toSlug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim()
}

const schema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters").max(500),
  content: z.string().min(1, "Content is required"),
  featuredImage: z.string().optional(),
  status: z.enum(["draft", "scheduled", "published"]),
  author: z.string().min(1, "Author is required").max(100),
  tags: z.string().optional(),
  category: z.string().optional(),
  seoTitle: z.string().max(70).optional(),
  seoDescription: z.string().max(160).optional(),
  seoKeywords: z.string().optional(),
  ogImage: z.string().optional(),
  imageAlt: z.string().optional(),
  schemaMarkup: z.string().optional(),
  readMin: z.string().optional(),
  faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
  scheduledLocal: z.string().optional(),
  scheduledTimezone: z.string().optional(),
}).superRefine((v, ctx) => {
  if (v.status !== "scheduled") return
  if (!v.scheduledLocal) {
    ctx.addIssue({ code: "custom", path: ["scheduledLocal"], message: "Pick a date and time." })
    return
  }
  const utc = zonedToUtc(v.scheduledLocal, v.scheduledTimezone || DEFAULT_TIMEZONE)
  if (isNaN(utc.getTime()) || utc.getTime() <= Date.now()) {
    ctx.addIssue({ code: "custom", path: ["scheduledLocal"], message: "Please select a future date and time." })
  }
})

type FormValues = z.infer<typeof schema>

interface BlogFormProps {
  initial?: Partial<IBlogPostDoc>
  id?: string
}

export function BlogForm({ initial, id }: BlogFormProps) {
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initial?.title ?? "",
      slug: initial?.slug ?? "",
      excerpt: initial?.excerpt ?? "",
      content: initial?.content ?? "",
      featuredImage: initial?.featuredImage ?? "",
      status: initial?.status ?? "draft",
      author: initial?.author ?? "",
      tags: initial?.tags?.join(", ") ?? "",
      category: initial?.category ?? "",
      seoTitle: initial?.seoTitle ?? "",
      seoDescription: initial?.seoDescription ?? "",
      seoKeywords: initial?.seoKeywords ?? "",
      ogImage: initial?.ogImage ?? "",
      imageAlt: initial?.imageAlt ?? "",
      schemaMarkup: initial?.schemaMarkup ?? "",
      readMin: initial?.readMin ? String(initial.readMin) : "",
      faq: initial?.faq ?? [],
      scheduledTimezone: initial?.scheduledTimezone ?? DEFAULT_TIMEZONE,
      scheduledLocal: initial?.scheduledAt
        ? utcToZonedInput(initial.scheduledAt, initial?.scheduledTimezone ?? DEFAULT_TIMEZONE)
        : "",
    },
  })

  const { watch, setValue } = form
  const isSubmitting = form.formState.isSubmitting
  const slugValue = watch("slug")
  const featuredImage = watch("featuredImage")
  const ogImage = watch("ogImage")
  const faq = watch("faq")
  const tagsValue = watch("tags")
  const statusValue = watch("status")

  // Managed taxonomy (Phase 3): suggestions sourced from the Category/Tag
  // collections. Values are still stored as names on the post, so free-text and
  // legacy values keep working.
  const [categoryOptions, setCategoryOptions] = useState<string[]>([])
  const [tagOptions, setTagOptions] = useState<string[]>([])

  useEffect(() => {
    let active = true
    Promise.all([
      fetch("/api/admin/categories").then((r) => (r.ok ? r.json() : { items: [] })).catch(() => ({ items: [] })),
      fetch("/api/admin/tags").then((r) => (r.ok ? r.json() : { items: [] })).catch(() => ({ items: [] })),
    ]).then(([cats, tags]) => {
      if (!active) return
      setCategoryOptions((cats.items ?? []).map((c: { name: string }) => c.name))
      setTagOptions((tags.items ?? []).map((t: { name: string }) => t.name))
    })
    return () => { active = false }
  }, [])

  function toggleTag(name: string) {
    const current = (tagsValue ? tagsValue.split(",").map((t) => t.trim()).filter(Boolean) : [])
    const next = current.includes(name) ? current.filter((t) => t !== name) : [...current, name]
    setValue("tags", next.join(", "))
  }

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    form.setValue("title", title)
    if (!id) {
      form.setValue("slug", toSlug(title), { shouldValidate: false })
    }
  }, [form, id])

  async function onSubmit(values: FormValues) {
    try {
      const isScheduled = values.status === "scheduled"
      const payload = {
        ...values,
        tags: values.tags ? values.tags.split(",").map(t => t.trim()).filter(Boolean) : [],
        readMin: values.readMin ? Number(values.readMin) : undefined,
        faq: values.faq ?? [],
        // Convert the admin's wall-clock time in the chosen zone to an absolute
        // UTC instant; backend re-validates it is in the future.
        scheduledAt: isScheduled && values.scheduledLocal
          ? zonedToUtc(values.scheduledLocal, values.scheduledTimezone || DEFAULT_TIMEZONE).toISOString()
          : undefined,
        scheduledTimezone: isScheduled ? values.scheduledTimezone : undefined,
      }
      const res = await fetch(id ? `/api/admin/blog/${id}` : "/api/admin/blog", {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error ?? "Something went wrong")
        return
      }
      toast.success(id ? "Post updated" : "Post created")
      router.push("/admin/blog")
    } catch {
      toast.error("Network error. Please try again.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24 }}>
          {/* Main content */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Card style={{ background: "var(--bg-1)", border: "1px solid var(--line)" }}>
              <CardHeader style={{ paddingBottom: 12 }}>
                <CardTitle style={{ fontSize: 15, color: "var(--fg)" }}>Post Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ color: "var(--fg)" }}>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Post title"
                          style={{ background: "var(--bg-2)", borderColor: "var(--line)", color: "var(--fg)", fontSize: 16 }}
                          {...field}
                          onChange={handleTitleChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ color: "var(--fg)" }}>Slug</FormLabel>
                      <FormControl>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontSize: 13, color: "var(--fg-2, #888)", whiteSpace: "nowrap" }}>/blog/</span>
                          <Input
                            placeholder="post-slug"
                            style={{ background: "var(--bg-2)", borderColor: "var(--line)", color: "var(--fg)" }}
                            {...field}
                            onChange={(e) => field.onChange(toSlug(e.target.value))}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ color: "var(--fg)" }}>Excerpt</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Short description shown in listings..."
                          rows={3}
                          style={{ background: "var(--bg-2)", borderColor: "var(--line)", color: "var(--fg)", resize: "vertical" }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ color: "var(--fg)" }}>Content</FormLabel>
                      <FormControl>
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Write your post content..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* SEO */}
            <Card style={{ background: "var(--bg-1)", border: "1px solid var(--line)" }}>
              <CardHeader style={{ paddingBottom: 12 }}>
                <CardTitle style={{ fontSize: 15, color: "var(--fg)" }}>SEO Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="seoTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ color: "var(--fg)" }}>SEO Title <span style={{ color: "var(--fg-2, #888)", fontWeight: 400 }}>(max 70 chars)</span></FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Override browser tab title"
                          style={{ background: "var(--bg-2)", borderColor: "var(--line)", color: "var(--fg)" }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="seoDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ color: "var(--fg)" }}>Meta Description <span style={{ color: "var(--fg-2, #888)", fontWeight: 400 }}>(max 160 chars)</span></FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Meta description for search engines..."
                          rows={3}
                          style={{ background: "var(--bg-2)", borderColor: "var(--line)", color: "var(--fg)", resize: "vertical" }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="seoKeywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ color: "var(--fg)" }}>Keywords</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="keyword1, keyword2, keyword3"
                          style={{ background: "var(--bg-2)", borderColor: "var(--line)", color: "var(--fg)" }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="schemaMarkup"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ color: "var(--fg)" }}>JSON-LD Schema <span style={{ color: "var(--fg-2, #888)", fontWeight: 400 }}>(optional, advanced)</span></FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='{"@context":"https://schema.org", ...}'
                          rows={4}
                          style={{ background: "var(--bg-2)", borderColor: "var(--line)", color: "var(--fg)", resize: "vertical", fontFamily: "monospace", fontSize: 12 }}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription style={{ color: "var(--fg-2, #888)" }}>Injected into the page &lt;head&gt;. Leave blank for none.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card style={{ background: "var(--bg-1)", border: "1px solid var(--line)" }}>
              <CardHeader style={{ paddingBottom: 12 }}>
                <CardTitle style={{ fontSize: 15, color: "var(--fg)" }}>FAQ <span style={{ color: "var(--fg-2, #888)", fontWeight: 400, fontSize: 13 }}>(powers FAQ structured data)</span></CardTitle>
              </CardHeader>
              <CardContent>
                <FaqEditor value={faq ?? []} onChange={(v) => setValue("faq", v)} />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Card style={{ background: "var(--bg-1)", border: "1px solid var(--line)" }}>
              <CardHeader style={{ paddingBottom: 12 }}>
                <CardTitle style={{ fontSize: 15, color: "var(--fg)" }}>Publish</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ color: "var(--fg)" }}>Status</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger style={{ background: "var(--bg-2)", borderColor: "var(--line)", color: "var(--fg)" }}>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="scheduled">Schedule</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {statusValue === "scheduled" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 12, borderRadius: 8, background: "var(--bg-2)", border: "1px solid var(--line)" }}>
                    <FormField
                      control={form.control}
                      name="scheduledLocal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel style={{ color: "var(--fg)" }}>Scheduled date &amp; time</FormLabel>
                          <FormControl>
                            <Input
                              type="datetime-local"
                              style={{ background: "var(--bg-1)", borderColor: "var(--line)", color: "var(--fg)" }}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="scheduledTimezone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel style={{ color: "var(--fg)" }}>Timezone</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger style={{ background: "var(--bg-1)", borderColor: "var(--line)", color: "var(--fg)" }}>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {TIMEZONES.map((tz) => (
                                <SelectItem key={tz.value} value={tz.value}>{tz.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ color: "var(--fg)" }}>Author</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Author name"
                          style={{ background: "var(--bg-2)", borderColor: "var(--line)", color: "var(--fg)" }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="readMin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ color: "var(--fg)" }}>Read time <span style={{ color: "var(--fg-2, #888)", fontWeight: 400 }}>(minutes)</span></FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          max={60}
                          placeholder="Auto"
                          style={{ background: "var(--bg-2)", borderColor: "var(--line)", color: "var(--fg)" }}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription style={{ color: "var(--fg-2, #888)" }}>Leave blank to estimate from content.</FormDescription>
                    </FormItem>
                  )}
                />

                <Separator style={{ background: "var(--line)" }} />

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <Button type="button" variant="outline" onClick={() => router.back()}
                    style={{ borderColor: "var(--line)", color: "var(--fg)", background: "transparent", width: "100%" }}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}
                    style={{ background: "var(--accent)", color: "#0a0a0a", fontWeight: 600, width: "100%" }}>
                    {isSubmitting && <Loader2 size={14} className="animate-spin mr-1" />}
                    {isSubmitting ? "Saving..." : statusValue === "scheduled" ? "Schedule Publish" : id ? "Update Post" : "Publish Post"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card style={{ background: "var(--bg-1)", border: "1px solid var(--line)" }}>
              <CardHeader style={{ paddingBottom: 12 }}>
                <CardTitle style={{ fontSize: 15, color: "var(--fg)" }}>Categorization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ color: "var(--fg)" }}>Category</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Technology"
                          list="blog-category-options"
                          style={{ background: "var(--bg-2)", borderColor: "var(--line)", color: "var(--fg)" }}
                          {...field}
                        />
                      </FormControl>
                      <datalist id="blog-category-options">
                        {categoryOptions.map((c) => <option key={c} value={c} />)}
                      </datalist>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ color: "var(--fg)" }}>Tags</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="nextjs, react, typescript"
                          style={{ background: "var(--bg-2)", borderColor: "var(--line)", color: "var(--fg)" }}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription style={{ color: "var(--fg-2, #888)" }}>Comma-separated tags</FormDescription>
                      {tagOptions.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                          {tagOptions.map((t) => {
                            const selected = (tagsValue ?? "").split(",").map((x) => x.trim()).includes(t)
                            return (
                              <button
                                key={t}
                                type="button"
                                onClick={() => toggleTag(t)}
                                style={{
                                  fontSize: 12,
                                  padding: "3px 10px",
                                  borderRadius: 999,
                                  cursor: "pointer",
                                  border: "1px solid var(--line)",
                                  background: selected ? "var(--accent)" : "transparent",
                                  color: selected ? "#0a0a0a" : "var(--fg)",
                                }}
                              >
                                {t}
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card style={{ background: "var(--bg-1)", border: "1px solid var(--line)" }}>
              <CardHeader style={{ paddingBottom: 12 }}>
                <CardTitle style={{ fontSize: 15, color: "var(--fg)" }}>Featured Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ImageUpload
                  value={featuredImage}
                  onChange={(url) => setValue("featuredImage", url)}
                  label="Upload Featured Image"
                />
                <FormField
                  control={form.control}
                  name="imageAlt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ color: "var(--fg)" }}>Image Alt Text</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Describe the image (SEO + accessibility)"
                          style={{ background: "var(--bg-2)", borderColor: "var(--line)", color: "var(--fg)" }}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div>
                  <FormLabel style={{ color: "var(--fg)", display: "block", marginBottom: 8 }}>
                    Open Graph Image <span style={{ color: "var(--fg-2, #888)", fontWeight: 400 }}>(social share)</span>
                  </FormLabel>
                  <ImageUpload
                    value={ogImage}
                    onChange={(url) => setValue("ogImage", url)}
                    label="Upload OG Image"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  )
}
