import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/auth-layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin/admin-layout";
import { AdminDashboard } from "./pages/admin/dashboard";
import { AdminProducts } from "./pages/admin/products";
import { AdminOrders } from "./pages/admin/orders";
import { AdminFeatures } from "./pages/admin/features";
import { ShoppingLayout } from "./components/shopping/shopping-layout";
import { NotFound } from "./pages/err/notfound";
import { ShoppingHome } from "./pages/shopping/shopppinghome";
import { ShoppingListing } from "./pages/shopping/Shoppinglisting";
import { ShoppingCheckout } from "./pages/shopping/shoppingcheckout";
import { ShoppingAccount } from "./pages/shopping/shoppingaccount";
import CheckAuth from "./components/common/check-auth";
import { Unauth } from "./pages/err/unauth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Loading } from "./pages/loading/loading";
import { ShoppingProduct } from "./pages/shopping/shoppingproducts";
import { ShoppingCategory } from "./pages/shopping/shopcategory";
import { ProductDetails } from "./components/admin/productdetails";
import { AboutUs } from "./pages/shopping/aboutus";
import { ContactUs } from "./pages/shopping/contact-us";
import { Category } from "./pages/shopping/shopcategorymain";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="flex flex-col overflow-hidden bg-white ">
      <Routes>
        <Route path="/" element={<Navigate to="/shop/home" />}></Route>

        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin></AuthLogin>}></Route>
          <Route
            path="register"
            element={<AuthRegister></AuthRegister>}
          ></Route>
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route
            path="dashboard"
            element={<AdminDashboard></AdminDashboard>}
          ></Route>
          <Route
            path="product/:id"
            element={<ProductDetails></ProductDetails>}
          ></Route>
          <Route
            path="products"
            element={<AdminProducts></AdminProducts>}
          ></Route>
          <Route path="orders" element={<AdminOrders></AdminOrders>}></Route>
          <Route
            path="features"
            element={<AdminFeatures></AdminFeatures>}
          ></Route>
        </Route>

        <Route path="/shop" element={<ShoppingLayout isAuthenticated={isAuthenticated} user={user}/>}>
          <Route path="home" element={<ShoppingHome></ShoppingHome>}></Route>
          <Route
            path="category/:category"
            element={<ShoppingCategory></ShoppingCategory>}
          ></Route>
          <Route
            path="category"
            element={<Category></Category>}
          ></Route>
          <Route
            path="product/:id"
            element={<ShoppingProduct></ShoppingProduct>}
          ></Route>
          <Route
            path="listing"
            element={<ShoppingListing></ShoppingListing>}
          ></Route>
          <Route
            path="checkout"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
             <ShoppingCheckout></ShoppingCheckout>
            </CheckAuth>
            }
          ></Route>
          <Route
            path="account"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingAccount></ShoppingAccount>
            </CheckAuth>
            }
          ></Route>
          <Route path="about" element={<AboutUs></AboutUs>}></Route>
          <Route path="contact-us" element={<ContactUs></ContactUs>}></Route>
        </Route>

        <Route path="*" element={<NotFound></NotFound>} />
        <Route path="/unauth" element={<Unauth></Unauth>} />
      </Routes>
    </div>
  );
}

export default App;
