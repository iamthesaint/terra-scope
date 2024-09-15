import sequelize from '../config/connection';
import { UserFactory } from './user.js';
import { CitiesFactory } from './cities.js';
import { BookmarksFactory } from './bookmarks.js';

const User = UserFactory(sequelize);
const Cities = CitiesFactory(sequelize);
const Bookmarks = BookmarksFactory(sequelize);

User.hasMany(Bookmarks, {
  foreignKey: 'user_id',
  as: 'bookmarks',
});

Bookmarks.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

Cities.hasMany(Bookmarks, {
  foreignKey: 'city_id',
  as: 'bookmarks',
});

Bookmarks.belongsTo(Cities, {
  foreignKey: 'city_id',
  as: 'city',
});

export { User, Cities, Bookmarks };
