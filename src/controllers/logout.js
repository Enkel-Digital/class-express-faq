import firebase from "firebase/app";
import "firebase/auth";

/**
 * Signout current user, clear vuex store state and redirect to welcome view.
 * @function logout
 */
export default async function logout() {
  if (!confirm("Logout?")) return;

  // Signout current user
  await firebase.auth().signOut();

  console.log("logout is called");

  // Redirect to welcome view
  this.$router.push({ name: "home" });
}
