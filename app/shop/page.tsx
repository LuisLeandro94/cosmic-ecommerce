// app/shop/page.tsx
import { ProductList } from "@/cosmic/blocks/ecommerce/ProductList";
export default async function Shop() {
  return (
    <ProductList
      query={{ type: "products" }}
    />
  );
}
