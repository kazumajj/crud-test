import { createBrowserRouter } from "react-router-dom";
import App from "./pages/Home";
import Page_1 from "./pages/page1";
const router=createBrowserRouter([
    {
        path:'/',
        element:<App/>,

    },
    {
        path: '/page1',
        element: <Page_1 />
    }
])
export default router