import { useParams, useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductDetails from "../components/Products/ProductDetails";
import { useEffect, useState } from "react";
import SuggestedProducts from "../components/Products/SuggestedProducts.jsx";
import { useSelector } from "react-redux";

function ProductDetailsPage() {
  const { allProducts } = useSelector((state) => state.product);
  const { allEvents } = useSelector((state) => state.event);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");

  useEffect(() => {
    if (eventData !== null) {
      const data = allEvents && allEvents.find((i) => i._id === id);
      setData(data);
    } else {
      const data = allProducts && allProducts.find((i) => i._id === id);
      setData(data);
    }
  }, [allEvents, id, eventData, allProducts]);

  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {!eventData && <>{data && <SuggestedProducts data={data} />}</>}
      <Footer />
    </div>
  );
}

export default ProductDetailsPage;
