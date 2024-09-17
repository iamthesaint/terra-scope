// import sequelize from './config/connection';
import { app } from './app.js';
import dotenv from 'dotenv';
dotenv.config();

// const forceDatabaseRefresh = false;
// const PORT = process.env.PORT || 3001;

// // sync database and start server
// sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
//   });
// });


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});