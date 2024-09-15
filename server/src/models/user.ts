import {
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
    DataTypes,
    type HasManyAddAssociationMixin,
    type HasManyAddAssociationsMixin,
    type HasManyGetAssociationsMixin,
    type Sequelize,
  } from 'sequelize';
  import bcrypt from 'bcrypt';
import { Bookmarks } from './bookmarks';
  
//   import type { Book } from './Book.js';
  
    export class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
  > {
    declare id: CreationOptional<number>;
    declare username: string;
    declare email: string;
    declare password: string;
    
    declare addBookmark: HasManyAddAssociationMixin<Bookmarks, number>;
    declare addBookmarks: HasManyAddAssociationsMixin<Bookmarks, number>;
    declare getBookmarks: HasManyGetAssociationsMixin<Bookmarks>;
  
    public async setPassword(password: string) {

        const saltRounds = 10;
        this.password = await bcrypt.hash(password, saltRounds)
    }
  }
  
  export function UserFactory(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        }
      },
      {
        hooks: {
            beforeCreate: async (user: User) => {
              await user.setPassword(user.password);
            },
            beforeUpdate: async (user: User) => {
              await user.setPassword(user.password);
            },
          },
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'user',
      }
    );
  
    return User;
  }
  