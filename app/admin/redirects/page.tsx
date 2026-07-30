"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { Search, RefreshCw, Plus, ArrowRightLeft, Pencil, Trash2, Check, X, Upload, Download, ArrowRight } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import type { IRedirect } from "@/types"

export default function RedirectsPage() {
  const [items, setItems] = useState<IRedirect[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [newSource, setNewSource] = useState("")
  const [newTarget, setNewTarget] = useState("")
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editSource, setEditSource] = useState("")
  const [editTarget, setEditTarget] = useState("")
  const [importing, setImporting] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const fetchItems = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.set("search", search)
      const res = await fetch(`/api/admin/redirects?${params}`)
      if (!res.ok) throw new Error()
      const data = await res.json()
      setItems(data.redirects ?? [])
    } catch {
      toast.error("Failed to load redirects")
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => { fetchItems() }, [fetchItems])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!newSource.trim() || !newTarget.trim()) return
    setAdding(true)
    try {
      const res = await fetch("/api/admin/redirects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sourceUrl: newSource.trim(), targetUrl: newTarget.trim() }),
      })
      const data = await res.json()
      if (!res.ok) { toast.error(data.error ?? "Failed to add"); return }
      toast.success("Redirect added")
      setNewSource(""); setNewTarget("")
      fetchItems()
    } catch {
      toast.error("Network error")
    } finally {
      setAdding(false)
    }
  }

  async function handleSaveEdit(id: string) {
    try {
      const res = await fetch(`/api/admin/redirects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sourceUrl: editSource.trim(), targetUrl: editTarget.trim() }),
      })
      const data = await res.json()
      if (!res.ok) { toast.error(data.error ?? "Failed to update"); return }
      toast.success("Redirect updated")
      setEditingId(null)
      fetchItems()
    } catch {
      toast.error("Network error")
    }
  }

  async function toggleEnabled(r: IRedirect) {
    try {
      await fetch(`/api/admin/redirects/${r._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !r.enabled }),
      })
      fetchItems()
    } catch {
      toast.error("Failed to update")
    }
  }

  async function handleDelete(id: string, source: string) {
    try {
      const res = await fetch(`/api/admin/redirects/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error()
      toast.success(`Redirect for "${source}" deleted`)
      fetchItems()
    } catch {
      toast.error("Failed to delete")
    }
  }

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImporting(true)
    try {
      const fd = new FormData()
      fd.append("file", file)
      const res = await fetch("/api/admin/redirects/import", { method: "POST", body: fd })
      const data = await res.json()
      if (!res.ok) { toast.error(data.error ?? "Import failed"); return }
      toast.success(`Imported ${data.imported} of ${data.total} row(s)${data.errors?.length ? ` — ${data.errors.length} skipped` : ""}`)
      fetchItems()
    } catch {
      toast.error("Import failed")
    } finally {
      setImporting(false)
      if (fileRef.current) fileRef.current.value = ""
    }
  }

  const inputStyle = { background: "var(--bg-2)", borderColor: "var(--line)", color: "var(--fg)" }

  return (
    <div style={{ padding: "28px 32px", flex: 1 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "color-mix(in srgb, var(--accent) 15%, transparent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ArrowRightLeft size={18} style={{ color: "var(--accent)" }} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "var(--fg)" }}>Redirect Manager</h1>
            <p style={{ margin: 0, fontSize: 13, color: "var(--fg-2, #888)" }}>{items.length} redirect(s)</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" onChange={handleImport} style={{ display: "none" }} />
          <Button variant="outline" disabled={importing} onClick={() => fileRef.current?.click()} style={{ borderColor: "var(--line)", color: "var(--fg)", background: "transparent" }}>
            <Upload size={14} />
            {importing ? "Importing..." : "Import"}
          </Button>
          <Button asChild variant="outline" style={{ borderColor: "var(--line)", color: "var(--fg)", background: "transparent" }}>
            <a href="/api/admin/redirects/export"><Download size={14} />Export</a>
          </Button>
        </div>
      </div>

      {/* Add + search */}
      <form onSubmit={handleAdd} style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        <Input value={newSource} onChange={(e) => setNewSource(e.target.value)} placeholder="/old-path" style={{ ...inputStyle, flex: "1 1 220px" }} />
        <Input value={newTarget} onChange={(e) => setNewTarget(e.target.value)} placeholder="/new-path or https://…" style={{ ...inputStyle, flex: "1 1 220px" }} />
        <Button type="submit" disabled={adding || !newSource.trim() || !newTarget.trim()} style={{ background: "var(--accent)", color: "#0a0a0a", fontWeight: 600, whiteSpace: "nowrap" }}>
          <Plus size={16} />Add
        </Button>
      </form>
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <div style={{ position: "relative", flex: "1 1 260px", minWidth: 200 }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--fg-2, #888)", pointerEvents: "none" }} />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search redirects..." style={{ paddingLeft: 32, background: "var(--bg-1)", borderColor: "var(--line)", color: "var(--fg)" }} />
        </div>
        <Button variant="outline" onClick={fetchItems} style={{ borderColor: "var(--line)", color: "var(--fg)", background: "transparent" }}>
          <RefreshCw size={14} />Refresh
        </Button>
      </div>

      {/* Table */}
      <div style={{ background: "var(--bg-1)", border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: 48, textAlign: "center", color: "var(--fg-2, #888)", fontSize: 14 }}>Loading...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow style={{ borderBottom: "1px solid var(--line)" }}>
                <TableHead style={{ color: "var(--fg-2, #888)" }}>Source</TableHead>
                <TableHead style={{ color: "var(--fg-2, #888)" }}>Target</TableHead>
                <TableHead style={{ color: "var(--fg-2, #888)" }}>Status</TableHead>
                <TableHead style={{ color: "var(--fg-2, #888)", textAlign: "right" }}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} style={{ textAlign: "center", padding: 48, color: "var(--fg-2, #888)" }}>
                    No redirects yet.
                  </TableCell>
                </TableRow>
              ) : items.map((r) => (
                <TableRow key={r._id} style={{ borderBottom: "1px solid var(--line)" }}>
                  <TableCell style={{ fontFamily: "monospace", fontSize: 13, color: "var(--fg)" }}>
                    {editingId === r._id
                      ? <Input value={editSource} onChange={(e) => setEditSource(e.target.value)} style={{ ...inputStyle, maxWidth: 220 }} />
                      : <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>{r.sourceUrl}</span>}
                  </TableCell>
                  <TableCell style={{ fontFamily: "monospace", fontSize: 13, color: "var(--fg-2, #888)" }}>
                    {editingId === r._id
                      ? <Input value={editTarget} onChange={(e) => setEditTarget(e.target.value)} style={{ ...inputStyle, maxWidth: 220 }} />
                      : <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><ArrowRight size={12} style={{ color: "var(--accent)" }} />{r.targetUrl}</span>}
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => toggleEnabled(r)}
                      style={{
                        padding: "4px 10px", borderRadius: 999, border: "1px solid", cursor: "pointer",
                        fontSize: 12, fontWeight: 500,
                        borderColor: r.enabled ? "rgba(52,211,153,0.3)" : "rgba(148,148,148,0.3)",
                        background: r.enabled ? "rgba(52,211,153,0.08)" : "transparent",
                        color: r.enabled ? "#34d399" : "var(--fg-2, #888)",
                      }}
                    >
                      {r.enabled ? "Active" : "Inactive"}
                    </button>
                  </TableCell>
                  <TableCell style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: 6 }}>
                      {editingId === r._id ? (
                        <>
                          <Button size="sm" onClick={() => handleSaveEdit(r._id!)} style={{ background: "var(--accent)", color: "#0a0a0a" }}><Check size={14} /></Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingId(null)} style={{ borderColor: "var(--line)", color: "var(--fg)", background: "transparent" }}><X size={14} /></Button>
                        </>
                      ) : (
                        <>
                          <Button size="sm" variant="outline" onClick={() => { setEditingId(r._id!); setEditSource(r.sourceUrl); setEditTarget(r.targetUrl) }} style={{ borderColor: "var(--line)", color: "var(--fg)", background: "transparent" }}><Pencil size={14} /></Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="outline" style={{ borderColor: "var(--line)", color: "#ef4444", background: "transparent" }}><Trash2 size={14} /></Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete this redirect?</AlertDialogTitle>
                                <AlertDialogDescription>{r.sourceUrl} → {r.targetUrl} will be removed.</AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(r._id!, r.sourceUrl)}>Delete</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}
