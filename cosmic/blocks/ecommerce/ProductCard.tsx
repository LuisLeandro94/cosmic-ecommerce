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
    <div className="relative m-0 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border dark:border-neutral-300 dark:bg-neutral-300 border-neutral-900 bg-neutral-900 shadow-md xs:m-auto md:m-auto sm:m-auto">
      <Link
        href={`/shop/${product.slug}`}
        className={cn("relative mx-3 mt-3 flex h-60 ", className)}
      >
        <img className="object-cover rounded-xl" src={`${product.metadata.image.imgix_url}?auto=format&w=1200,compression`} alt={product.title} />
        {/* TODO: Add discount badge */}
        {/* <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span> */}
      </Link>
      <div className="mt-4 px-5 pb-5">
        <Link
          href={`/shop/${product.slug}`}
        >
          <h5 className="text-xl tracking-tight dark:text-neutral-900 text-neutral-300">{product.title}</h5>
        </Link>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold dark:text-neutral-800 text-neutral-300">{product.metadata.price.toLocaleString("pt-PT")} €</span>
            {/* TODO: Add discount badge */}
            {/* <span className="text-sm text-slate-900 line-through">$699</span> */}
          </p>
        </div>
        <a href="#" className="flex items-center justify-center rounded-md bg-teal-800 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-teal-900 focus:outline-none focus:ring-4 focus:ring-teal-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Add to cart
        </a>
      </div>
    </div>
  )
}
