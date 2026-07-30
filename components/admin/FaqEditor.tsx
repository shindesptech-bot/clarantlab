"use client"

import { Plus, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import type { IBlogFaqItem } from "@/types"

interface FaqEditorProps {
  value: IBlogFaqItem[]
  onChange: (value: IBlogFaqItem[]) => void
}

export function FaqEditor({ value, onChange }: FaqEditorProps) {
  const items = value ?? []

  function update(i: number, patch: Partial<IBlogFaqItem>) {
    onChange(items.map((item, idx) => (idx === i ? { ...item, ...patch } : item)))
  }
  function remove(i: number) {
    onChange(items.filter((_, idx) => idx !== i))
  }
  function add() {
    onChange([...items, { q: "", a: "" }])
  }

  const inputStyle = { background: "var(--bg-2)", borderColor: "var(--line)", color: "var(--fg)" }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {items.length === 0 && (
        <p style={{ fontSize: 13, color: "var(--fg-2, #888)", margin: 0 }}>
          No FAQ items. Add questions to generate FAQ structured data.
        </p>
      )}
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", gap: 6, padding: 12, border: "1px solid var(--line)", borderRadius: 8 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <Input
              placeholder="Question"
              value={item.q}
              onChange={(e) => update(i, { q: e.target.value })}
              style={inputStyle}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => remove(i)}
              title="Remove"
              style={{ borderColor: "var(--line)", color: "var(--fg)", background: "transparent", padding: "0 10px" }}
            >
              <Trash2 size={14} />
            </Button>
          </div>
          <Textarea
            placeholder="Answer"
            rows={2}
            value={item.a}
            onChange={(e) => update(i, { a: e.target.value })}
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={add}
        style={{ borderColor: "var(--line)", color: "var(--fg)", background: "transparent", alignSelf: "flex-start" }}
      >
        <Plus size={14} style={{ marginRight: 4 }} /> Add FAQ
      </Button>
    </div>
  )
}
