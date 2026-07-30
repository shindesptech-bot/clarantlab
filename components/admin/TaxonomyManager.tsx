"use client"

import { useEffect, useState, useCallback } from "react"
import { Plus, Pencil, Trash2, Check, X, RefreshCw, FolderTree } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import type { ITaxonomyItem } from "@/types"

interface TaxonomyManagerProps {
  title: string
  endpoint: string // e.g. "/api/admin/categories"
  itemLabel: string // e.g. "category"
}

export function TaxonomyManager({ title, endpoint, itemLabel }: TaxonomyManagerProps) {
  const [items, setItems] = useState<ITaxonomyItem[]>([])
  const [loading, setLoading] = useState(true)
  const [newName, setNewName] = useState("")
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState("")

  const fetchItems = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(endpoint)
      if (!res.ok) throw new Error()
      const data = await res.json()
      setItems(data.items ?? [])
    } catch {
      toast.error(`Failed to load ${title.toLowerCase()}`)
    } finally {
      setLoading(false)
    }
  }, [endpoint, title])

  useEffect(() => { fetchItems() }, [fetchItems])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!newName.trim()) return
    setAdding(true)
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName.trim() }),
      })
      const data = await res.json()
      if (!res.ok) { toast.error(data.error ?? "Failed to add"); return }
      toast.success(`${itemLabel} added`)
      setNewName("")
      fetchItems()
    } catch {
      toast.error("Network error")
    } finally {
      setAdding(false)
    }
  }

  async function handleSaveEdit(id: string) {
    if (!editName.trim()) return
    try {
      const res = await fetch(`${endpoint}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName.trim() }),
      })
      const data = await res.json()
      if (!res.ok) { toast.error(data.error ?? "Failed to update"); return }
      toast.success(`${itemLabel} updated`)
      setEditingId(null)
      fetchItems()
    } catch {
      toast.error("Network error")
    }
  }

  async function handleDelete(id: string, name: string) {
    try {
      const res = await fetch(`${endpoint}/${id}`, { method: "DELETE" })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) { toast.error(data.error ?? "Failed to delete"); return }
      toast.success(`"${name}" deleted`)
      fetchItems()
    } catch {
      toast.error("Network error")
    }
  }

  const inputStyle = { background: "var(--bg-2)", borderColor: "var(--line)", color: "var(--fg)" }

  return (
    <div style={{ padding: "28px 32px", flex: 1 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "color-mix(in srgb, var(--accent) 15%, transparent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FolderTree size={18} style={{ color: "var(--accent)" }} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "var(--fg)" }}>{title}</h1>
            <p style={{ margin: 0, fontSize: 13, color: "var(--fg-2, #888)" }}>{items.length} total</p>
          </div>
        </div>
        <Button variant="outline" onClick={fetchItems} style={{ borderColor: "var(--line)", color: "var(--fg)", background: "transparent" }}>
          <RefreshCw size={14} />
          Refresh
        </Button>
      </div>

      {/* Add form */}
      <form onSubmit={handleAdd} style={{ display: "flex", gap: 10, marginBottom: 16, maxWidth: 480 }}>
        <Input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder={`New ${itemLabel} name`}
          style={inputStyle}
        />
        <Button type="submit" disabled={adding || !newName.trim()} style={{ background: "var(--accent)", color: "#0a0a0a", fontWeight: 600, whiteSpace: "nowrap" }}>
          <Plus size={16} />
          Add
        </Button>
      </form>

      {/* Table */}
      <div style={{ background: "var(--bg-1)", border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: 48, textAlign: "center", color: "var(--fg-2, #888)", fontSize: 14 }}>Loading...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow style={{ borderBottom: "1px solid var(--line)" }}>
                <TableHead style={{ color: "var(--fg-2, #888)" }}>Name</TableHead>
                <TableHead style={{ color: "var(--fg-2, #888)" }}>Slug</TableHead>
                <TableHead style={{ color: "var(--fg-2, #888)" }}>Posts</TableHead>
                <TableHead style={{ color: "var(--fg-2, #888)", textAlign: "right" }}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} style={{ textAlign: "center", padding: 48, color: "var(--fg-2, #888)" }}>
                    No {title.toLowerCase()} yet.
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item) => (
                  <TableRow key={item._id} style={{ borderBottom: "1px solid var(--line)" }}>
                    <TableCell style={{ fontWeight: 500, color: "var(--fg)" }}>
                      {editingId === item._id ? (
                        <Input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          autoFocus
                          onKeyDown={(e) => { if (e.key === "Enter") handleSaveEdit(item._id); if (e.key === "Escape") setEditingId(null) }}
                          style={{ ...inputStyle, maxWidth: 260 }}
                        />
                      ) : item.name}
                    </TableCell>
                    <TableCell style={{ fontSize: 13, color: "var(--fg-2, #888)" }}>{item.slug}</TableCell>
                    <TableCell><Badge variant="secondary">{item.postCount}</Badge></TableCell>
                    <TableCell style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: 6 }}>
                        {editingId === item._id ? (
                          <>
                            <Button size="sm" onClick={() => handleSaveEdit(item._id)} style={{ background: "var(--accent)", color: "#0a0a0a" }}>
                              <Check size={14} />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setEditingId(null)} style={{ borderColor: "var(--line)", color: "var(--fg)", background: "transparent" }}>
                              <X size={14} />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button size="sm" variant="outline" onClick={() => { setEditingId(item._id); setEditName(item.name) }} style={{ borderColor: "var(--line)", color: "var(--fg)", background: "transparent" }}>
                              <Pencil size={14} />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="outline" style={{ borderColor: "var(--line)", color: "#ef4444", background: "transparent" }}>
                                  <Trash2 size={14} />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete &quot;{item.name}&quot;?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    {item.postCount > 0
                                      ? `This ${itemLabel} is used by ${item.postCount} post(s).`
                                      : `This ${itemLabel} is not used by any posts.`}
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(item._id, item.name)}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}
