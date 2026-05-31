import Image from "next/image";
import { type Product, isAvailable } from "@/lib/products";

// Drops inside a `relative bg-deven-cream` container. Shows the studio photo
// when we have a clean one; otherwise a quiet branded placeholder so the grid
// stays consistent and "class-first" until Deven's real photography lands.
export default function ProductMedia({
  product,
  sizes,
  imgClassName = "object-contain p-5",
  priority = false,
}: {
  product: Product;
  sizes?: string;
  imgClassName?: string;
  priority?: boolean;
}) {
  if (product.cleanImage && product.image) {
    return (
      <Image
        src={product.image}
        alt={`${product.name} — ${product.styleLabel}`}
        fill
        priority={priority}
        sizes={sizes}
        className={imgClassName}
      />
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
      <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-deven-gold/40">
        <Image
          src="/images/logo-icon.png"
          alt=""
          width={80}
          height={80}
          className="h-full w-full scale-110 object-cover opacity-90"
        />
      </div>
      <span className="text-[10px] font-semibold tracking-[0.25em] text-deven-gray/70 uppercase">
        {isAvailable(product) ? "Studio Photo Soon" : "Sold Out"}
      </span>
    </div>
  );
}
