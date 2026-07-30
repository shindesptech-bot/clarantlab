"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { ArrowLeft, RefreshCw, Trash2, RotateCcw, Trash } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import type { IBlogPostDoc } from "@/types"

export default function BlogTrashPage() {
  const [posts, setPosts] = useState<IBlogPostDoc[]>([])
  const [loading, setLoading] = useState(true)

  const fetchTrash = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/blog?trash=1&limit=100")
      if (!res.ok) throw new Error()
      const data = await res.json()
      setPosts(data.posts ?? [])
    } catch {
      toast.error("Failed to load trash")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchTrash() }, [fetchTrash])

  async function handleRestore(id: string, title: string) {
    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ restore: true }),
      })
      if (!res.ok) throw new Error()
      toast.success(`"${title}" restored`)
      fetchTrash()
    } catch {
      toast.error("Failed to restore post")
    }
  }

  async function handlePermanentDelete(id: string, title: string) {
    try {
      const res = await fetch(`/api/admin/blog/${id}?permanent=1`, { method: "DELETE" })
      if (!res.ok) throw new Error()
      toast.success(`"${title}" permanently deleted`)
      fetchTrash()
    } catch {
      toast.error("Failed to delete post")
    }
  }

  return (
    <div style={{ padding: "28px 32px", flex: 1 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "color-mix(in srgb, var(--accent) 15%, transparent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Trash2 size={18} style={{ color: "var(--accent)" }} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "var(--fg)" }}>Trash</h1>
            <p style={{ margin: 0, fontSize: 13, color: "var(--fg-2, #888)" }}>{posts.length} deleted post(s)</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Button variant="outline" onClick={fetchTrash} style={{ borderColor: "var(--line)", color: "var(--fg)", background: "transparent" }}>
            <RefreshCw size={14} />
            Refresh
          </Button>
          <Button asChild variant="outline" style={{ borderColor: "var(--line)", color: "var(--fg)", background: "transparent" }}>
            <Link href="/admin/blog">
              <ArrowLeft size={16} />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "var(--bg-1)", border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: 48, textAlign: "center", color: "var(--fg-2, #888)", fontSize: 14 }}>Loading...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow style={{ borderBottom: "1px solid var(--line)" }}>
                <TableHead style={{ color: "var(--fg-2, #888)" }}>Title</TableHead>
                <TableHead style={{ color: "var(--fg-2, #888)" }}>Author</TableHead>
                <TableHead style={{ color: "var(--fg-2, #888)" }}>Status</TableHead>
                <TableHead style={{ color: "var(--fg-2, #888)", textAlign: "right" }}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} style={{ textAlign: "center", padding: 48, color: "var(--fg-2, #888)" }}>
                    Trash is empty.
                  </TableCell>
                </TableRow>
              ) : (
                posts.map((p) => (
                  <TableRow key={p._id} style={{ borderBottom: "1px solid var(--line)" }}>
                    <TableCell style={{ fontWeight: 500, color: "var(--fg)" }}>{p.title}</TableCell>
                    <TableCell style={{ fontSize: 13, color: "var(--fg)" }}>{p.author}</TableCell>
                    <TableCell><Badge variant="secondary" style={{ textTransform: "capitalize" }}>{p.status}</Badge></TableCell>
                    <TableCell style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: 6 }}>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRestore(p._id!, p.title)}
                          style={{ borderColor: "var(--line)", color: "var(--fg)", background: "transparent" }}
                        >
                          <RotateCcw size={14} style={{ marginRight: 4 }} />
                          Restore
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" style={{ borderColor: "var(--line)", color: "#ef4444", background: "transparent" }}>
                              <Trash size={14} style={{ marginRight: 4 }} />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Permanently delete this post?</AlertDialogTitle>
                              <AlertDialogDescription>
                                &quot;{p.title}&quot; will be permanently removed. This cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handlePermanentDelete(p._id!, p.title)}>
                                Delete permanently
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
