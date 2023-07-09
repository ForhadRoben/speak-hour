import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import Instructors from "../pages/Instructors/Instructors";
import Classes from "../pages/Classes/Classes";
import ErrorPage from "../pages/Shared/ErrorPage/ErrorPage";
import Login from "../pages/login/Login";
import SignUp from "../pages/signup/SignUp";
import Dashboard from "../layout/DashBoard";
import MySelectedClasses from "../pages/DashBoard/MySelectedClasses/MySelectedClasses";
import PrivateRoute from "./PrivateRoute";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import AddAClass from "../pages/Dashboard/AddAClass/AddAClass";
import MyClasses from "../pages/Dashboard/MyClasses/MyClasses";
import MyEnrolledClasses from "../pages/Dashboard/MyEnrolledClasses/MyEnrolledClasses";
import ManageClasses from "../pages/Dashboard/ManageClasses/ManageClasses";




export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'instructors',
                element: <Instructors></Instructors>
            },
            {
                path: 'classes',
                element: <Classes></Classes>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'signup',
                element: <SignUp></SignUp>
            },
            {
                path: 'dashboard',
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
                children: [
                    {
                        path: 'myselectedclasses',
                        element: <MySelectedClasses></MySelectedClasses>
                    },
                    {
                        path: 'myenrolledclasses',
                        element: <MyEnrolledClasses></MyEnrolledClasses>
                    },
                    {
                        path: 'manageusers',
                        element: <ManageUsers></ManageUsers>
                    },
                    {
                        path: 'manageclasses',
                        element: <ManageClasses></ManageClasses>
                    },
                    {
                        path: 'addaclass',
                        element: <AddAClass></AddAClass>
                    },
                    {
                        path: 'myclasses',
                        element: <MyClasses></MyClasses>
                    },
                ]
            }

        ]
    },

]);