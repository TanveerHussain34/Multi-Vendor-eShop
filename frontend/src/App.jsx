import { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./features/user/userThunks";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  HomePage,
  SignupPage,
  LoginPage,
  ActivationPage,
  ProductPage,
  BestSellingPage,
  EventsPage,
  FAQsPage,
  ProductDetailsPage,
} from "./routes/routes.js";
import { ToastContainer } from "react-toastify";

function App() {
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <div className="font-bold text-[48px] flex items-center justify-center h-screen w-full">
          Loading
        </div>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/activation/:activation_token"
              element={<ActivationPage />}
            />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/product/:name" element={<ProductDetailsPage />} />
            <Route path="/best-selling" element={<BestSellingPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/faqs" element={<FAQsPage />} />
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
