import NavLink from "components/link";
import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Button from "components/button";

export default function ProductsListComponent({ products }: { products: any[] }) {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:p-0 lg:max-w-7xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-8">
        {products.map((product) => (
          <div key={product._id} className="max-w-sm">
            <NavLink
              href={`/products/${product.slug}`}
              className="w-full h-72 rounded-lg overflow-hidden block"
            >
              <Image
                src={
                  "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"
                }
                width={300}
                height={300}
                className="w-full h-full object-center object-cover"
                alt={product.imageAltText}
              />
            </NavLink>
            <div className="mt-3 flex flex-col items-start">
              <p className="sr-only">{product.rating || 4} out of 5 stars</p>
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    fill={product.rating || 4 > rating ? "rgb(250 204 21)" : "rgb(229 231 235)"}
                    className={"flex-shrink-0 h-5 w-5"}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="mt-1 text-sm text-gray-500">{product.reviewCount || 10} reviews</p>
            </div>
            <NavLink
              href={`/products/${product.slug}`}
              className="flex items-center justify-between my-4"
            >
              <span className="text-sm font-medium text-gray-900">{product.title}</span>
              <span className="text-sm font-medium text-gray-600">£{product.price}</span>
            </NavLink>
            {/* <button className="bg-blue-800 hover:bg-blue-900 w-full py-3 rounded-md text-white text-sm font-medium">
              Add to cart
            </button> */}
            <Button className="w-full">Add to cart</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
