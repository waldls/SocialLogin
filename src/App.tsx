import {
  RouterProvider,
  type RouteObject,
  createBrowserRouter,
} from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import MyPage from "./pages/MyPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";

// publicRoutes : 인증 없이 접근 가능한 라우트
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "v1/auth/google/callback", element: <GoogleLoginRedirectPage /> },
    ],
  },
];

// protectedRoutes : 인증이 필요한 라우트
const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "my",
        element: <MyPage />,
      },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
