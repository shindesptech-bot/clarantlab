"use client"

import { TaxonomyManager } from "@/components/admin/TaxonomyManager"

export default function TagsPage() {
  return <TaxonomyManager title="Tags" endpoint="/api/admin/tags" itemLabel="tag" />
}
