"use client"

import { useRef, useState } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"
import { TableKit } from "@tiptap/extension-table"
import { html as beautifyHtml } from "js-beautify"
import { toast } from "sonner"
import {
  Bold, Italic, UnderlineIcon, Strikethrough,
  List, ListOrdered, Quote, Code, Code2,
  Heading1, Heading2, Heading3, Undo, Redo, Minus,
  ImagePlus, Table as TableIcon, Link2, Loader2,
  Columns3, Rows3, Trash2,
} from "lucide-react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { rel: "noopener noreferrer" },
      }),
      Image.configure({ inline: false, allowBase64: false }),
      TableKit.configure({ table: { resizable: true } }),
      Placeholder.configure({ placeholder: placeholder ?? "Start writing..." }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  const [source, setSource] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  // Link popover state
  const [linkOpen, setLinkOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const [linkText, setLinkText] = useState("")
  const [linkBlank, setLinkBlank] = useState(true)

  if (!editor) return null

  function toggleSource() {
    if (!editor) return
    if (!source) {
      // Entering source view — pretty-print the current HTML.
      onChange(beautifyHtml(value || editor.getHTML(), { indent_size: 2, wrap_line_length: 0 }))
    } else {
      // Returning to the visual editor — parse the (possibly hand-edited) HTML back in.
      editor.commands.setContent(value || "")
    }
    setSource((s) => !s)
  }

  // ── Insert Image: upload via the existing /api/admin/upload endpoint, then
  //    insert at the cursor. Public + editor CSS keep it responsive. ──
  async function uploadImage(file: File) {
    if (!editor) return
    if (!file.type.startsWith("image/")) { toast.error("Please select an image file"); return }
    if (file.size > 10 * 1024 * 1024) { toast.error("Image must be under 10MB"); return }
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append("file", file)
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || "Upload failed")
      }
      const { url } = await res.json()
      const alt = window.prompt("Alt text (accessibility & SEO):", "") ?? ""
      editor.chain().focus().setImage({ src: url, alt }).run()
      toast.success("Image inserted")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to upload image")
    } finally {
      setUploading(false)
    }
  }

  // ── Insert Table: configurable rows × columns (header row on top). ──
  function insertTable() {
    if (!editor) return
    const rows = clampInt(window.prompt("Number of rows:", "3"), 3, 1, 30)
    const cols = clampInt(window.prompt("Number of columns:", "3"), 3, 1, 10)
    editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run()
  }

  // ── Insert Link: URL + optional text + open-in-new-tab. ──
  function openLinkForm() {
    if (!editor) return
    const attrs = editor.getAttributes("link")
    const { from, to } = editor.state.selection
    setLinkUrl(typeof attrs.href === "string" ? attrs.href : "")
    setLinkText(editor.state.doc.textBetween(from, to, " "))
    setLinkBlank(attrs.target ? attrs.target === "_blank" : true)
    setLinkOpen(true)
  }

  function applyLink() {
    if (!editor) return
    const url = linkUrl.trim()
    if (!url) { editor.chain().focus().extendMarkRange("link").unsetLink().run(); setLinkOpen(false); return }
    const target = linkBlank ? "_blank" : null
    const rel = linkBlank ? "noopener noreferrer" : null
    const { from, to } = editor.state.selection
    if (from !== to) {
      // Apply to the current selection.
      editor.chain().focus().extendMarkRange("link").setLink({ href: url, target, rel }).run()
    } else {
      // No selection — insert the link text as a new linked node.
      const text = linkText.trim() || url
      editor.chain().focus().insertContent({
        type: "text",
        text,
        marks: [{ type: "link", attrs: { href: url, target, rel } }],
      }).run()
    }
    setLinkOpen(false)
  }

  const inTable = editor.isActive("table")

  const ToolbarBtn = ({ onClick, active, title, disabled, children }: {
    onClick: () => void; active?: boolean; title: string; disabled?: boolean; children: React.ReactNode
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      disabled={disabled}
      style={{
        padding: "4px 6px",
        borderRadius: 4,
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        background: active ? "var(--accent)" : "transparent",
        color: active ? "#fff" : "var(--fg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 28,
        height: 28,
        transition: "background 0.15s",
      }}
    >
      {children}
    </button>
  )

  const Divider = () => <div style={{ width: 1, height: 20, background: "var(--line)", margin: "0 4px" }} />

  return (
    <div style={{ border: "1px solid var(--line)", borderRadius: 8, overflow: "hidden", display: "flex", flexDirection: "column", maxHeight: "70vh" }}>
      {/* Toolbar — stays pinned to the top while the editor body scrolls */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          padding: "6px 8px",
          borderBottom: "1px solid var(--line)",
          background: "var(--bg-1)",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 2,
          flexShrink: 0,
        }}
      >
        {!source && (<>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold">
          <Bold size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic">
          <Italic size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline">
          <UnderlineIcon size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough">
          <Strikethrough size={14} />
        </ToolbarBtn>

        <Divider />

        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} title="Heading 1">
          <Heading1 size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Heading 2">
          <Heading2 size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Heading 3">
          <Heading3 size={14} />
        </ToolbarBtn>

        <Divider />

        <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet List">
          <List size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Ordered List">
          <ListOrdered size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Blockquote">
          <Quote size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} title="Code Block">
          <Code size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal Rule">
          <Minus size={14} />
        </ToolbarBtn>

        <Divider />

        {/* Insert: Link · Image · Table */}
        <ToolbarBtn onClick={openLinkForm} active={editor.isActive("link")} title="Insert Link">
          <Link2 size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => fileRef.current?.click()} disabled={uploading} title="Insert Image">
          {uploading ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : <ImagePlus size={14} />}
        </ToolbarBtn>
        <ToolbarBtn onClick={insertTable} active={inTable} title="Insert Table">
          <TableIcon size={14} />
        </ToolbarBtn>

        {/* Contextual table controls — only while the cursor is inside a table */}
        {inTable && (<>
          <Divider />
          <ToolbarBtn onClick={() => editor.chain().focus().addColumnAfter().run()} title="Add column">
            <Columns3 size={14} />
          </ToolbarBtn>
          <ToolbarBtn onClick={() => editor.chain().focus().addRowAfter().run()} title="Add row">
            <Rows3 size={14} />
          </ToolbarBtn>
          <ToolbarBtn onClick={() => editor.chain().focus().deleteColumn().run()} title="Delete column">
            <Columns3 size={14} style={{ color: "#ef4444" }} />
          </ToolbarBtn>
          <ToolbarBtn onClick={() => editor.chain().focus().deleteRow().run()} title="Delete row">
            <Rows3 size={14} style={{ color: "#ef4444" }} />
          </ToolbarBtn>
          <ToolbarBtn onClick={() => editor.chain().focus().deleteTable().run()} title="Delete table">
            <Trash2 size={14} style={{ color: "#ef4444" }} />
          </ToolbarBtn>
        </>)}

        <Divider />

        <ToolbarBtn onClick={() => editor.chain().focus().undo().run()} title="Undo">
          <Undo size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().redo().run()} title="Redo">
          <Redo size={14} />
        </ToolbarBtn>
        </>)}
        <div style={{ marginLeft: "auto" }} />
        <ToolbarBtn onClick={toggleSource} active={source} title={source ? "Visual editor" : "Edit HTML source"}>
          <Code2 size={14} />
        </ToolbarBtn>
      </div>

      {/* Link form — appears under the toolbar when inserting/editing a link */}
      {linkOpen && !source && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", padding: "8px 10px", borderBottom: "1px solid var(--line)", background: "var(--bg-1)", flexShrink: 0 }}>
          <input
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://example.com"
            autoFocus
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); applyLink() } if (e.key === "Escape") setLinkOpen(false) }}
            style={inputStyle(200)}
          />
          <input
            value={linkText}
            onChange={(e) => setLinkText(e.target.value)}
            placeholder="Link text (optional)"
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); applyLink() } if (e.key === "Escape") setLinkOpen(false) }}
            style={inputStyle(160)}
          />
          <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--fg)", cursor: "pointer" }}>
            <input type="checkbox" checked={linkBlank} onChange={(e) => setLinkBlank(e.target.checked)} />
            Open in new tab
          </label>
          <button type="button" onClick={applyLink}
            style={{ padding: "6px 12px", borderRadius: 6, border: "none", background: "var(--accent)", color: "#0a0a0a", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
            {linkUrl.trim() ? "Apply" : "Remove"}
          </button>
          <button type="button" onClick={() => setLinkOpen(false)}
            style={{ padding: "6px 12px", borderRadius: 6, border: "1px solid var(--line)", background: "transparent", color: "var(--fg)", fontSize: 13, cursor: "pointer" }}>
            Cancel
          </button>
        </div>
      )}

      {/* Hidden file input for image upload */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadImage(f); e.target.value = "" }}
      />

      {/* Editor body — the only scrolling region, so the toolbar stays visible */}
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
        {source ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            spellCheck={false}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "12px 16px",
              minHeight: 300,
              border: "none",
              outline: "none",
              resize: "vertical",
              background: "var(--bg-2, #1a1a1a)",
              color: "var(--fg)",
              fontSize: 13,
              fontFamily: "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
              lineHeight: 1.6,
            }}
          />
        ) : (
          <EditorContent
            editor={editor}
            style={{ padding: "12px 16px", minHeight: 300, color: "var(--fg)", fontSize: 14 }}
            className="prose-editor"
          />
        )}
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .prose-editor .ProseMirror {
          outline: none;
          min-height: 280px;
        }
        .prose-editor .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #666;
          pointer-events: none;
          height: 0;
        }
        .prose-editor .ProseMirror h1 { font-size: 1.75em; font-weight: 700; margin: 0.75em 0 0.5em; }
        .prose-editor .ProseMirror h2 { font-size: 1.4em; font-weight: 600; margin: 0.75em 0 0.5em; }
        .prose-editor .ProseMirror h3 { font-size: 1.15em; font-weight: 600; margin: 0.75em 0 0.5em; }
        .prose-editor .ProseMirror ul, .prose-editor .ProseMirror ol { padding-left: 1.5em; margin: 0.5em 0; }
        .prose-editor .ProseMirror li { margin: 0.25em 0; }
        .prose-editor .ProseMirror blockquote { border-left: 3px solid var(--accent); padding-left: 1em; margin: 0.5em 0; color: #999; }
        .prose-editor .ProseMirror code { background: var(--bg-2, #1a1a1a); padding: 2px 6px; border-radius: 4px; font-size: 0.875em; }
        .prose-editor .ProseMirror pre { background: var(--bg-2, #1a1a1a); padding: 12px; border-radius: 6px; overflow-x: auto; margin: 0.75em 0; }
        .prose-editor .ProseMirror pre code { background: none; padding: 0; }
        .prose-editor .ProseMirror hr { border: none; border-top: 1px solid var(--line, #2a2a2a); margin: 1em 0; }
        /* Links */
        .prose-editor .ProseMirror a { color: var(--accent); text-decoration: underline; text-underline-offset: 2px; cursor: pointer; }
        /* Images — responsive, selectable */
        .prose-editor .ProseMirror img { max-width: 100%; height: auto; display: block; border-radius: 6px; margin: 10px 0; }
        .prose-editor .ProseMirror img.ProseMirror-selectednode { outline: 2px solid var(--accent); outline-offset: 2px; }
        /* Tables */
        .prose-editor .ProseMirror .tableWrapper { overflow-x: auto; margin: 12px 0; }
        .prose-editor .ProseMirror table { border-collapse: collapse; width: 100%; table-layout: fixed; }
        .prose-editor .ProseMirror table td, .prose-editor .ProseMirror table th {
          border: 1px solid var(--line, #2a2a2a); padding: 6px 10px; vertical-align: top; position: relative; min-width: 60px; box-sizing: border-box;
        }
        .prose-editor .ProseMirror table th { background: var(--bg-2, #1a1a1a); font-weight: 600; text-align: left; }
        .prose-editor .ProseMirror table p { margin: 0; }
        .prose-editor .ProseMirror .selectedCell:after {
          content: ""; position: absolute; inset: 0; background: color-mix(in srgb, var(--accent) 18%, transparent); pointer-events: none;
        }
        .prose-editor .ProseMirror .column-resize-handle {
          position: absolute; right: -2px; top: 0; bottom: 0; width: 4px; background: var(--accent); pointer-events: none;
        }
      `}</style>
    </div>
  )
}

// Parse an integer from a prompt value, clamp to [min,max], fall back to def.
function clampInt(raw: string | null, def: number, min: number, max: number): number {
  const n = parseInt(raw ?? "", 10)
  if (Number.isNaN(n)) return def
  return Math.min(max, Math.max(min, n))
}

function inputStyle(width: number): React.CSSProperties {
  return {
    width,
    padding: "6px 10px",
    borderRadius: 6,
    border: "1px solid var(--line)",
    background: "var(--bg-2, #1a1a1a)",
    color: "var(--fg)",
    fontSize: 13,
    outline: "none",
  }
}
