import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { loadUser } from "./features/user/userThunks.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  HomePage,
  SignupPage,
  LoginPage,
  ActivationPage,
  SellerActivationPage,
  ProductPage,
  BestSellingPage,
  EventsPage,
  FAQsPage,
  ProductDetailsPage,
  ProfilePage,
  CheckoutPage,
  PaymentPage,
  OrderSuccessPage,
} from "./routes/routes.js";
import {
  ShopHomePage,
  ShopDashboardPage,
  ShopCreatePage,
  ShopLoginPage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvent,
  ShopAllEvents,
  ShopAllCoupons,
  ShopPreviewPage,
} from "./routes/shopRoutes/shopRoutes.js";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./routes/protectedRoutes/ProtectedRoute.jsx";
import { loadSeller } from "./features/seller/sellerThunks.js";
import SellerProtectedRoute from "./routes/protectedRoutes/SellerProtectedRoute.jsx";
import { getAllProducts } from "./features/product/productThunks.js";
import { getAllEvents } from "./features/event/eventThunks.js";
import { server } from "./server.js";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const dispatch = useDispatch();
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadSeller());
    dispatch(getAllProducts());
    dispatch(getAllEvents());
    getStripeApiKey();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <Routes>
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <PaymentPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Elements>
        )}
        <Routes>
          {/* user routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/activation/:activation_token"
            element={<ActivationPage />}
          />
          <Route
            path="/seller/activation/:activation_token"
            element={<SellerActivationPage />}
          />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/best-selling" element={<BestSellingPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/faqs" element={<FAQsPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/success"
            element={
              <ProtectedRoute>
                <OrderSuccessPage />
              </ProtectedRoute>
            }
          />
          <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
          {/* shop routes */}
          <Route path="/shop-create" element={<ShopCreatePage />} />
          <Route path="/shop-login" element={<ShopLoginPage />} />
          <Route
            path="/shop/:id"
            element={
              <SellerProtectedRoute>
                <ShopHomePage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <SellerProtectedRoute>
                <ShopDashboardPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard/create-product"
            element={
              <SellerProtectedRoute>
                <ShopCreateProduct />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard/all-products"
            element={
              <SellerProtectedRoute>
                <ShopAllProducts />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard/create-event"
            element={
              <SellerProtectedRoute>
                <ShopCreateEvent />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard/all-events"
            element={
              <SellerProtectedRoute>
                <ShopAllEvents />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard/all-coupons"
            element={
              <SellerProtectedRoute>
                <ShopAllCoupons />
              </SellerProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>
    </>
  );
}

export default App;
