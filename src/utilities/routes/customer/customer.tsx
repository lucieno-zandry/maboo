import { Route, Routes } from "react-router-dom";

import Homepage from "../../../App/Frontoffice/Homepage/Homepage";
import User from "../../../App/Frontoffice/User/User";
import Category from "../../../App/Frontoffice/Category/Category";
import Product from "../../../App/Frontoffice/Product/Product";
import Orders from "../../../App/Frontoffice/Orders/Orders";
import List from "../../../App/Frontoffice/Orders/List/List";
import Order from "../../../App/Frontoffice/Orders/Order/Order";
import Search from "../../../App/Frontoffice/Search/Search";
import Profile from "../../minitiatures/Profile/Profile";
import Login from "../../minitiatures/Login/Login";
import Signup from "../../minitiatures/Signup/Signup";
import PasswordForgotten from "../../minitiatures/PasswordForgotten/PasswordForgotten";
import ResetPassword from "../../minitiatures/ResetPassword/ResetPassword";
import Confirmation from "../../minitiatures/Confirmation/Confirmation";
import Frontoffice from "../../../App/Frontoffice/Frontoffice";
import Guest from "../../minitiatures/Guest/Guest";
import Auth from "../../minitiatures/Auth/Auth";
import Authenticated from "../../minitiatures/Authenticated/Authenticated";
import Cart from "../../../App/Frontoffice/Cart/Cart";
import Articles from "../../../App/Frontoffice/Articles/Articles";
import Professionals from "../../../App/Frontoffice/Professionals/Professionals";
import Professional from "../../../App/Frontoffice/Professionals/Professional/Professional";
import VariantsDemo from "../../../App/Frontoffice/VariantsDemo/VariantsDemo";
import Products from "../../../App/Frontoffice/Products/Products";
// import Article from './path/to/Article';

export default function () {
    return <Routes>
        <Route element={<Frontoffice />}>
            <Route index element={<Homepage />} />
            <Route element={<Category />} path='category/:id' />
            <Route element={<Product />} path='product/:slug' />
            <Route element={<Search />} path='search/:words' />
            <Route element={<VariantsDemo />} path='variants-demo' />
            <Route element={<Products />} path='products' />
            <Route element={<Articles />} path='articles' />
            <Route element={<Articles />} path="articles/:articleId" />
            <Route element={<Professionals />} path="professionals" />
            <Route element={<Professional />} path="professionals/:professionalId" />


            <Route element={<Guest />}>
                <Route element={<Auth />} path="auth">
                    <Route element={<Login />} path="login" />
                    <Route element={<Signup />} path="signup" />
                    <Route element={<PasswordForgotten />} path="password-forgotten" />
                    <Route element={<ResetPassword />} path="reset-password/:token" />
                </Route>
            </Route>
            <Route element={<Authenticated />}>
                <Route element={<Cart />} path="cart" />
                <Route element={<Orders />} path="orders">
                    <Route element={<List />} path="list" />
                    <Route element={<Order />} path="order/:id" />
                </Route>
                <Route element={<Auth />} path="auth">
                    <Route element={<Confirmation />} path="confirmation" />
                </Route>
                <Route element={<User />} path="user">
                    <Route element={<Profile />} path="profile" />
                </Route>
            </Route>
        </Route>
    </Routes>
}
