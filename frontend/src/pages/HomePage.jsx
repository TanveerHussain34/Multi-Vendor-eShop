import Header from "../components/Layout/Header.jsx";
import Hero from "../components/Route/Hero/Hero.jsx";
import Categories from "../components/Route/Categories/Categories.jsx";
import BestDeals from "../components/Route/BestDeals/BestDeals.jsx";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct.jsx";
import PopularEvents from "../components/Route/PopularEvents/PopularEvents.jsx";
import Sponsored from "../components/Route/Sponsored/Sponsored.jsx";

function HomePage() {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <PopularEvents />
      <FeaturedProduct />
      <Sponsored />
    </div>
  );
}

export default HomePage;
