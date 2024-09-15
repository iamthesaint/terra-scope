import {
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  DataTypes,
  type Sequelize,
  type BelongsToManyAddAssociationMixin,
  type BelongsToManyAddAssociationsMixin,
  type BelongsToManyGetAssociationsMixin,
} from "sequelize";

import { Bookmarks } from "./bookmarks";

export class Cities extends Model<
  InferAttributes<Cities>,
  InferCreationAttributes<Cities>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare country: string;

  declare addBookmark: BelongsToManyAddAssociationMixin<Bookmarks, number>;
  declare addBookmarks: BelongsToManyAddAssociationsMixin<Bookmarks, number>;
  declare getBookmarks: BelongsToManyGetAssociationsMixin<Bookmarks>;
}

export function CitiesFactory(sequelize: Sequelize) {
  Cities.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "cities",
      timestamps: true,
    }
  );

  return Cities;
}