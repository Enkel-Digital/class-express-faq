// Import AuthType Enum
import AuthType from "./AuthType";

/** @notice Pre-Load all components for frequently used routes */
import Support from "../views/Support.vue";
import Manage from "../views/Manage.vue";
import Dashboard from "../views/Dashboard.vue";

/**
 * @notice Some of these less frequented routes uses lazily loaded components
 *
 * route level code-splitting
 * this generates a separate chunk (about.[hash].js) for this route
 * which is lazy-loaded when the route is visited.
 */

const routes = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: { Auth_requirements: AuthType.private }
  },
  {
    path: "/manage",
    name: "manage",
    component: Manage,
    meta: { Auth_requirements: AuthType.private }
  },
  {
    path: "/support",
    name: "support",
    component: Support,
    meta: { Auth_requirements: AuthType.private }
  }
];

export default routes;
