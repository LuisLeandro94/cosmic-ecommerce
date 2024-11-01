// app/shop/[slug]/page.tsx
import { SingleProduct } from "@/cosmic/blocks/ecommerce/SingleProduct";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ success?: string }>;
}

export default async function SingleProductPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  return (
    <SingleProduct
      query={{ slug: resolvedParams.slug, type: "products" }}
      purchased={resolvedSearchParams.success ? true : false}
    />
  );
}
