import express from "express";
import cors from "cors";
import superHeroRoutes from "./routes/superHeroRoutes.js";
import cityRoutes from "./routes/cityRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({ origin: "http://localhost:5173" })); // <-- Allow Vite dev server

app.use(express.json());

app.use("/superheroes", superHeroRoutes);
app.use("/cities", cityRoutes);

app.use("/login", authRoutes); // <-- Added this line of code to include the auth routes, Tony
app.use("/frontPage", frontPageRoutes); // <-- Added this line of code to include the frontPage routes, Tony

const server = app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
