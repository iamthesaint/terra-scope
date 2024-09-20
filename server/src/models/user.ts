import {
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
    DataTypes,
    ForeignKey,
    type Sequelize,
  } from 'sequelize';
  import bcrypt from 'bcrypt';

  import type { List } from './list';

    export class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
  > {
    declare id: CreationOptional<number>;
    declare username: string;
    declare email: string;
    declare password: string;
    declare list_id: ForeignKey<List['id']>;

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
        timestamps: true,
        underscored: true,
        modelName: 'user',
      }
    );
  
    return User;
  }
  