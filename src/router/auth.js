import auth from "@/layouts/auth";
import register from "@/views/auth/register";
import login from "@/views/auth/login";
export default [
  {
    path: "/",
    component: auth,
    name: "auth",
    children: [
      {
        path: "/",
        component: login,
        name: "login"
      },
      {
        path: "/register",
        component: register,
        name: "register"
      }
    ]
  }
];
