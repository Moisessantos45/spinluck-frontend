import useAuthStore from "@/store/auth";
import {
  type RouteRecordRaw,
  createRouter,
  createWebHistory,
} from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/auth/Register.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/auth/Login.vue"),
  },
  {
    path: "/auth/2fa",
    name: "auth-two-factor-login",
    component: () => import("../views/auth/LoginTwoFactor.vue"),
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: () => import("../views/auth/ForgotPassword.vue"),
  },
  {
    path: "/forgot-password/:token",
    name: "reset-password",
    component: () => import("../views/auth/ResetPassword.vue"),
  },
  {
    path: "/confirm/:token",
    name: "confirm-account",
    component: () => import("../views/auth/ConfirmAccount.vue"),
  },
  {
    path: "/generate-two-factor",
    name: "generate-two-factor",
    component: () => import("../views/auth/TwoFactor.vue"),
  },
  {
    path: "/raffle/:slug",
    name: "raffle-public",
    component: () => import("../views/RafflePublic.vue"),
  },
  {
    path: "/confirmation",
    name: "confirmation",
    component: () => import("../views/Confirmation.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../features/AdminLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "dashboard-home",
        component: () => import("../views/admin/AdminHome.vue"),
      },
      {
        path: "add-raffle",
        name: "dashboard-add-raffle",
        component: () => import("../views/admin/AddRaffle.vue"),
      },
      {
        path: "raffles",
        name: "dashboard-raffles",
        component: () => import("../views/admin/RaffleManagement.vue"),
      },
      {
        path: "manage-numbers/:id",
        name: "dashboard-manage-numbers",
        component: () => import("../views/admin/ManageNumbers.vue"),
      },
      {
        path: "profile",
        name: "dashboard-profile",
        meta: { requiresProfile: true },
        component: () => import("../views/admin/Profile.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_, __, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach(async (to, _) => {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const profileIncomplete =
    authStore.authenticated && authStore.authData?.fullProfile === false;

  if (requiresAuth && !authStore.loading && !authStore.authenticated) {
    await authStore.getSession();
  }

  if (requiresAuth && !authStore.authenticated) {
    return { path: "/login" };
  }

  if (
    authStore.authenticated &&
    (to.name === "login" ||
      to.name === "register" ||
      to.name === "auth-two-factor-login")
  ) {
    return {
      name:
        authStore.authData?.fullProfile === false
          ? "dashboard-profile"
          : "dashboard-home",
    };
  }

  if (profileIncomplete && to.name !== "dashboard-profile") {
    return { name: "dashboard-profile" };
  }
});

export default router;
