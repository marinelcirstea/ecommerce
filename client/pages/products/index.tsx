import CategoryFilterComponent from "components/ecommerce/category-filter";
import ProductsListComponent from "components/ecommerce/products-list";
import captain from "libs/captain";

export default function AllProductsPage({ products }: { products: any }) {
  return (
    <CategoryFilterComponent>
      <ProductsListComponent products={products} />
    </CategoryFilterComponent>
  );
}

export async function getServerSideProps() {
  const products = await captain.get("http://localhost:5000/api/products");
  console.log(products.data);
  if (!products) {
    return {
      props: {
        products: [],
      },
    };
  }
  return {
    props: {
      products: products.data,
    },
  };
}
