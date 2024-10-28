// ProductCard.tsx
import { cn } from "@/cosmic/utils"
import Link from "next/link"

export type ProductType = {
  id: string
  title: string
  slug: string
  metadata: {
    image: {
      imgix_url: string
    }
    description: string
    price: number
  }
}

export function ProductCard({
  product,
  className,
}: {
  product: ProductType
  className?: string
}) {
  return (
    <div data-cosmic-object={product.id}>
      <Link
        href={`/shop/${product.slug}`}
        className={cn("group relative w-full", className)}
      >
        <div className="h-52 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 ">
          <img
            src={`${product.metadata.image.imgix_url}?w=1200&auto=format,compression`}
            alt={product.title}
            className="h-full w-full border border-zinc-100 object-cover object-center dark:border-zinc-800 lg:h-full lg:w-full group-hover:scale-125 group-hover:transition-transform group-hover:duration-300"
          />
        </div>
        <div className="mt-2 flex justify-between">
          <div>
            <h3 className="text-sm text-zinc-700 dark:text-zinc-300">
              <span aria-hidden="true" className="absolute inset-0"></span>
              {product.title}
            </h3>
          </div>
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
            {product.metadata.price.toLocaleString("pt-PT")} €
          </p>
        </div>
      </Link>
    </div>
  )
}
