import {
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  DataTypes,
  type Sequelize,
} from "sequelize";

  export class City extends Model<
  InferAttributes<City>,
  InferCreationAttributes<City>
> {
  declare id: CreationOptional<number>;
  declare name: string;
}

export function CityFactory(sequelize: Sequelize) {
  City.init(
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
      }
    },
    {
      sequelize,
      tableName: "city",
      timestamps: true,
    }
  );

  return City;
}