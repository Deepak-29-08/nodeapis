import { app } from "./app.js";
import { connectDb } from "./data/data.js";

connectDb();
const port = process.env.PORT || 5000;



app.listen(port, () => console.log(`Server is running on port ${port} in ${process.env.NODE_ENV} mode`));