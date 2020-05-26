import Vue from "vue";
import VueRouter from "vue-router";
import RouteGuard from "./RouteGuard.js";

// Import the private and public routes
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import NotFound from "./NotFound";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [...PrivateRoutes, ...PublicRoutes, ...NotFound]
});

// Attach Router Gaurd Middleware function to run when navigation is made before the actual navigation.
router.beforeEach(RouteGuard);

export default router;
