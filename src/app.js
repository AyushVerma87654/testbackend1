import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Import controllers
import * as UserController from "./controllers/UserController.js";
import * as CollectionController from "./controllers/CollectionController.js";
import * as RequestController from "./controllers/RequestController.js";
import * as EnvironmentController from "./controllers/EnvironmentController.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "https://sparkling-khapse-134e85.netlify.app",
      "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["content-type", "authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

// ----------------------------
// User Routes (short paths)
// ----------------------------
app.post("/signup", UserController.signup);
app.post("/login", UserController.login);
app.get("/me", UserController.fetchMe);
app.get("/logout", UserController.logout);

// ----------------------------
// Collection Routes
// ----------------------------
app.post("/collections", CollectionController.createCollection);
app.get(
  "/collections/user/:userId",
  CollectionController.getCollectionsByUserId
);
app.get("/collections/:id", CollectionController.getCollectionById);
app.put("/collections/:id", CollectionController.updateCollection);
app.delete("/collections/:id", CollectionController.deleteCollection);

// ----------------------------
// Request Routes
// ----------------------------
app.post("/request", RequestController.createRequest);
app.get(
  "/requests/collection/:collectionId",
  RequestController.getRequestsByCollection
);
app.get("/requests/:id", RequestController.getRequestById);
app.put("/requests/:id", RequestController.updateRequest);
app.delete("/requests/:id", RequestController.deleteRequest);

// ----------------------------
// Environment Routes
// ----------------------------
app.post("/environments", EnvironmentController.createEnvironment);
app.get(
  "/environments/user/:userId",
  EnvironmentController.getEnvironmentsByUser
);
app.get("/environments/:id", EnvironmentController.getEnvironmentById);
app.put("/environments/:id", EnvironmentController.updateEnvironment);
app.delete("/environments/:id", EnvironmentController.deleteEnvironment);

// ----------------------------
// Test route
// ----------------------------
app.get("/", (req, res) => res.send("API Testing Tool Backend Running"));

export default app;
