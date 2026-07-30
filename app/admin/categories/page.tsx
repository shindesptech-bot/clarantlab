"use client"

import { TaxonomyManager } from "@/components/admin/TaxonomyManager"

export default function CategoriesPage() {
  return <TaxonomyManager title="Categories" endpoint="/api/admin/categories" itemLabel="category" />
}
