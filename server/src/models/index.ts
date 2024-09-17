import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { CityFactory } from './city.js';
import { ListFactory } from './list.js';

const User = UserFactory(sequelize);
const City = CityFactory(sequelize);
const List = ListFactory(sequelize);

User.hasMany(List, {
  foreignKey: 'list_id',
  as: 'lists',
  onDelete: 'CASCADE'
});

List.belongsTo(User);

List.hasMany(City, {
  foreignKey: 'city_id',
  as: 'cities',
  onDelete: "CASCADE"
});

City.belongsTo(List);

export { User, City, List };