import { createBrowserRouter } from "react-router-dom";
import Home from "../component/Home/Home";
import DashboardLayout from "../Layouts/DashboardLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DashboardLayout/>,
        children: [
            {
                path: "/",
                element: <Home />
            }
        ]
    },
]);
