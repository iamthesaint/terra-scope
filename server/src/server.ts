import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import pg from 'pg';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';

const pgPool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
}); 

const forceDatabaseRefresh = false;
const PgSession = connectPgSimple(session);
const app = express();
app.use(session({
  store: new PgSession({
    pool: pgPool,                // cx pool
    tableName: 'db_session'      // table name
  }),
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }      // Set to true if using https
}));

console.log('Environment Variables:');
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY);

import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';

console.log("TripAdvisor API key:", process.env.TRIPADVISOR_API_KEY);
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

//serve after api
app.use(express.static('../client/dist'));


sequelize.sync({force: forceDatabaseRefresh}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});