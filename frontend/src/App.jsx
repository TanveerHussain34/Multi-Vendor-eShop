import { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
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
  ShopCreatePage,
  ShopLoginPage,
  PaymentPage,
} from "./routes/routes.js";
import { ShopHomePage } from "./shopRoutes/shopRoutes.js";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { loadSeller } from "./features/seller/sellerThunks.js";
import SellerProtectedRoute from "./SellerProtectedRoute.jsx";

function App() {
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const { isSellerAuthenticated, isLoading } = useSelector(
    (state) => state.seller
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadSeller());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {loading || isLoading ? null : (
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
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
            <Route path="/product/:name" element={<ProductDetailsPage />} />
            <Route path="/best-selling" element={<BestSellingPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/faqs" element={<FAQsPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            {/* shop routes */}
            <Route path="/shop-create" element={<ShopCreatePage />} />
            <Route path="/shop-login" element={<ShopLoginPage />} />
            <Route
              path="/shop/:id"
              element={
                <SellerProtectedRoute
                  isSellerAuthenticated={isSellerAuthenticated}
                >
                  <ShopHomePage />
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
      )}
    </>
  );
}

export default App;
