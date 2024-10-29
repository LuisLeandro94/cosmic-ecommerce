// app/shop/[slug]/page.tsx
import { AddToCart } from "@/cosmic/blocks/ecommerce/AddToCart"
import { ImageGallery } from "@/cosmic/blocks/image-gallery/ImageGallery"
import { cosmic } from "@/cosmic/client"
import { Button } from "@/cosmic/elements/Button"
import { CheckCircleIcon, XCircleIcon } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export async function SingleProduct({
  query,
  className,
  status,
  purchased,
}: {
  query: any
  className?: string
  status?: "draft" | "published" | "any"
  purchased?: boolean
}) {
  try {
    const { object: product } = await cosmic.objects
      .findOne(query)
      .props("id,slug,title,metadata")
      .depth(1)
      .status(status ? status : "published")

    return (
      <section className={`container m-auto px-4 pb-8 ${className}`}>
        <div
          className="relative m-auto max-w-[950px] mt-10"
          data-cosmic-object={product.id}
        >
          {purchased && (
            <div className="mb-6 flex rounded-lg border border-teal-700 p-4 text-teal-700">
              <CheckCircleIcon className="size-4 mr-4 mt-1" />
              <div>
                Purchase complete. Thank you for your order, we will be in touch
                with your order details!
              </div>
            </div>
          )}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol role="list" className="flex space-x-2">
              <li>
                <div className="flex items-center">
                  <Link
                    href="/shop"
                    className="mr-2 text-sm font-medium text-neutral-900 dark:text-neutral-300"
                  >
                    Shop
                  </Link>
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-neutral-900 dark:text-neutral-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
              <li className="text-sm font-medium text-teal-600 hover:text-teal-700">
                {product.title}
              </li>
            </ol>
          </nav>
          <div className="grid md:grid-cols-2 md:gap-x-8">
            <div className="mb-4">
              <ImageGallery query={query} />
            </div>
            <div>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl text-neutral-900 dark:text-neutral-300">
                {product.title}
              </h1>
              <p className="mb-6 text-3xl tracking-tight text-neutral-900 dark:text-neutral-300">
                ${product.metadata.price.toLocaleString("en-US")}
                {product.metadata.recurring.is_recurring && (
                  <span>
                    {" "}
                    /{" "}
                    {product.metadata.recurring.interval_count
                      ? product.metadata.recurring.interval_count
                      : ""}{" "}
                    {product.metadata.recurring.interval.value}
                    {product.metadata.recurring.interval_count &&
                      product.metadata.recurring.interval_count !== 1
                      ? "s"
                      : ""}
                  </span>
                )}
              </p>
              <div className="mb-8">
                {!product.metadata.quantity ? (
                  <Button
                    variant="outline"
                    disabled
                    className="border-gray-500 text-neutral-900 dark:text-neutral-300"
                  >
                    Sold out
                  </Button>
                ) : (
                  <>
                    {product.metadata.stripe_product_id ? (
                      <AddToCart product={product} />
                    ) : (
                      <div className="flex rounded-lg border border-red-500 p-4 text-neutral-800 dark:text-neutral-300">
                        <XCircleIcon className="mr-4 text-red-500" />
                        Product not available for purchase
                      </div>
                    )}
                  </>
                )}
              </div>
              <h2 className="mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-300">
                Details
              </h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: product.metadata.description,
                }}
                className="mb-6 text-sm text-neutral-900 dark:text-neutral-300"
              />
            </div>
          </div>
        </div>
      </section>
    )
  } catch (e: any) {
    if (e.status === 404) return notFound()
  }
}
