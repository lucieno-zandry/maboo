import { Route, Routes } from "react-router-dom";
import Backoffice from "../../../App/Backoffice/Backoffice";
import Guest from "../../minitiatures/Guest/Guest";
import Auth from "../../minitiatures/Auth/Auth";
import Login from "../../minitiatures/Login/Login";
import Signup from "../../minitiatures/Signup/Signup";
import PasswordForgotten from "../../minitiatures/PasswordForgotten/PasswordForgotten";
import ResetPassword from "../../minitiatures/ResetPassword/ResetPassword";
import Authenticated from "../../minitiatures/Authenticated/Authenticated";
import Dashboard from "../../../App/Backoffice/Dashboard/Dashboard";
import Overview from "../../../App/Backoffice/Dashboard/Main/Overview/Overview";
import User from "../../../App/Backoffice/Dashboard/Main/User/User";
import Profile from "../../minitiatures/Profile/Profile";
import Products from "../../../App/Backoffice/Dashboard/Main/Products/Products";
import Categories from "../../../App/Backoffice/Dashboard/Main/Categories/Categories";
import Seller from "../../../App/Backoffice/Dashboard/Main/Seller/Seller";
import SellerRequests from "../../../App/Backoffice/Dashboard/Main/Seller/SellerRequests/SellerRequests";
import Admins from "../../../App/Backoffice/Dashboard/Main/Admin/Admin";
import AdminRequests from "../../../App/Backoffice/Dashboard/Main/Admin/AdminRequests/AdminRequests";
import Orders from "../../../App/Backoffice/Dashboard/Main/Orders/Orders";
import Processing from "../../../App/Backoffice/Dashboard/Main/Orders/Processing/Processing";
import Unchecked from "../../../App/Backoffice/Dashboard/Main/Orders/Unchecked/Unchecked";
import Delivered from "../../../App/Backoffice/Dashboard/Main/Orders/Delivered/Delivered";
import Confirmation from "../../minitiatures/Confirmation/Confirmation";
import Validation from "../../minitiatures/Validation/Validation";

export default function () {
    return <Routes>
        <Route element={<Backoffice />} path='/admin'>
            <Route element={<Guest />} >
                <Route element={<Auth />} path="auth">
                    <Route element={<Login />} path="login" />
                    <Route element={<Signup />} path="signup" />
                    <Route element={<PasswordForgotten />} path="password-forgotten" />
                    <Route element={<ResetPassword />} path="reset-password/:token" />
                </Route>
            </Route>
            <Route element={<Authenticated />} >
                <Route element={<Dashboard />} path="dashboard">
                    <Route element={<Overview />} index />
                    <Route element={<User />} path="user">
                        <Route element={<Profile />} path="profile" />
                    </Route>
                    <Route element={<Products />} path="products" />
                    <Route element={<Categories />} path="categories" />
                    <Route element={<Seller />} path="sellers">
                        <Route element={<SellerRequests />} path="requests" />
                    </Route>
                    <Route element={<Admins />} path="admins">
                        <Route element={<AdminRequests />} path="requests" />
                    </Route>
                    <Route element={<Orders />} path="orders">
                        <Route element={<Processing />} path="processing" />
                        <Route element={<Unchecked />} path="unchecked" />
                        <Route element={<Delivered />} path="delivered" />
                    </Route>
                </Route>
                <Route element={<Auth />} path="auth">
                    <Route element={<Confirmation />} path="confirmation" />
                    <Route element={<Validation />} path="validation" />
                </Route>
            </Route>
        </Route>
    </Routes>
}