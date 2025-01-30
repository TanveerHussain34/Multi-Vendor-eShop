import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Checkout from "../components/Checkout/Checkout.jsx";
import CheckoutSteps from "../components/Checkout/CheckoutSteps.jsx";

function CheckoutPage() {
  return (
    <div>
      <Header />
      <br />
      <br />
      <CheckoutSteps active={1} />
      <Checkout />
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default CheckoutPage;
