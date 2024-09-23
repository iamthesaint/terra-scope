const forceDatabaseRefresh = true;
import express from 'express';
// import cors from 'cors';
import sequelize from './config/connection.js';
import routes from './routes/index.js';
import dotenv from "dotenv";
dotenv.config();

console.log("TripAdvisor API key:", process.env.TRIPADVISOR_API_KEY);

const app = express();
const PORT = process.env.PORT || 3001;

// app.use(cors({
//   origin: 'http://localhost:3000'
// }));

app.use(express.static('../client/dist'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

sequelize.sync({force: forceDatabaseRefresh}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});