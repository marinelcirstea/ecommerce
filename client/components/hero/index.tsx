import Button from "components/button";

interface Props {}
const offers = [
  { name: "Download the app", description: "Get an exclusive $5 off code", href: "#" },
  { name: "Return when you're ready", description: "60 days of free returns", href: "#" },
  { name: "Sign up for our newsletter", description: "15% off your first order", href: "#" },
];
const FrontPageHeroComponent: React.FunctionComponent<Props> = () => {
  return (
    <div className="relative">
      <div className="absolute w-full h-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="w-full h-full object-center object-cover"
        />
      </div>
      <div className="relative max-w-3xl mx-auto py-32 px-6 flex flex-col items-center text-center sm:py-64 lg:px-0">
        <h1 className="text-4xl font-extrabold tracking-tight text-white lg:text-6xl">
          New arrivals are here
        </h1>
        <p className="my-4 text-xl text-white">
          The new arrivals have, well, newly arrived. Check out the latest options from our summer
          small-batch release while they're still in stock.
        </p>
        <Button>Shop now</Button>
      </div>
    </div>
  );
};

export default FrontPageHeroComponent;
