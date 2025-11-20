import { createBrowserRouter } from "react-router-dom";
import App from "./pages/Home";
import Page_1 from "./pages/page1";
import Login from "./pages/login";
const router=createBrowserRouter([
    {
        path:'/',
        element:<App/>,

    },
    {
        path: '/page1',
        element: <Page_1 />
    },
    {
        path:'/login',
        element:<Login/>
    }
])
export default router