import { useParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductDetails from "../components/Products/ProductDetails";
import { useEffect, useState } from "react";
import { productData } from "../static/data";
import SuggestedProducts from "../components/Products/SuggestedProducts.jsx";

function ProductDetailsPage() {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const productName = name.replace(/-/g, " ");

  useEffect(() => {
    const data = productData.find((i) => i.name === productName);
    setData(data);
  }, [productName]);
  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {data && <SuggestedProducts data={data} />}
      <Footer />
    </div>
  );
}

export default ProductDetailsPage;
