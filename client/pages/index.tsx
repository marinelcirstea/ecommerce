import FeaturedCategoriesComponent from "components/ecommerce/featured-categories";
import TrendingProductsComponent from "components/ecommerce/trending-products";
import FrontPageHeroComponent from "components/hero";
import NewsletterComponent from "components/newsletter";

const favorites = [
  {
    id: 1,
    name: "Black Basic Tee",
    price: "$32",
    href: "#",
    imageSrc: "https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg",
    imageAlt: "Model wearing women's black cotton crewneck tee.",
  },
  {
    id: 2,
    name: "Off-White Basic Tee",
    price: "$32",
    href: "#",
    imageSrc: "https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-02.jpg",
    imageAlt: "Model wearing women's off-white cotton crewneck tee.",
  },
  {
    id: 3,
    name: "Mountains Artwork Tee",
    price: "$36",
    href: "#",
    imageSrc: "https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-03.jpg",
    imageAlt:
      "Model wearing women's burgundy red crewneck artwork tee with small white triangle overlapping larger black triangle.",
  },
];

export default function Example() {
  return (
    <div className="bg-white">
      <main>
        <FrontPageHeroComponent />

        <TrendingProductsComponent />

        <FeaturedCategoriesComponent />

        <NewsletterComponent />
      </main>
    </div>
  );
}
