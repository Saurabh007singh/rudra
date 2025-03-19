import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Toaster } from "@/components/ui/toaster"
import ScrollToTop from "./hooks/scrolltop";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <ScrollToTop></ScrollToTop>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </BrowserRouter>
);