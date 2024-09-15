import {
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type BelongsToGetAssociationMixin,
    type BelongsToManyAddAssociationMixin,
    type BelongsToManyAddAssociationsMixin,
    type BelongsToManyGetAssociationsMixin,
    type CreationOptional,
    DataTypes,
    type Sequelize,
    ForeignKey,
  } from "sequelize";
  
  import type { User } from "./user";
  import type { Cities } from "./cities";

  export class Bookmarks extends Model<
    InferAttributes<Bookmarks>,
    InferCreationAttributes<Bookmarks>
  > {
    declare id: CreationOptional<number>;
    declare user_id: ForeignKey<User['id']>;
    declare city_id: ForeignKey<Cities['id']>;

    declare getUser: BelongsToGetAssociationMixin<User>;

    declare addCity: BelongsToManyAddAssociationMixin<Cities, number>;
    declare addCities: BelongsToManyAddAssociationsMixin<Cities, number>;
    declare getCities: BelongsToManyGetAssociationsMixin<Cities>;
  }
  
  export function BookmarksFactory(sequelize: Sequelize) {
    Bookmarks.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        }
      },
      {
        sequelize,
        tableName: "bookmarks",
        timestamps: true,
      }
    );
  
    return Bookmarks;
  }