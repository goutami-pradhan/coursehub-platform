require("dotenv").config();

const app = require("./app");

const connectDB = require("./config/mongo");

const PORT = process.env.PORT || 5000;

console.log("MONGO_URI:", process.env.MONGO_URI);

connectDB();

app.listen(PORT, () => {

    console.log(`Server Running On Port ${PORT}`);

});