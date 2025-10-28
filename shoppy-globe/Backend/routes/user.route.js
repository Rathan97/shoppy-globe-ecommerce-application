import { userSignup, userLogin } from "../controllers/user.controller.js";

// Function to define all user-related routes
function userRoutes(router){
    // Route to register a new user
    router.post("/register", userSignup);

    // Route to log in an existing user
    router.post("/Login", userLogin);
}

export default userRoutes;
