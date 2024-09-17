import {
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
    DataTypes,
    type Sequelize,
    ForeignKey,
  } from "sequelize";
  
  import type { City } from "./city";

  export class List extends Model<
    InferAttributes<List>,
    InferCreationAttributes<List>
  > {
    declare id: CreationOptional<number>;
    declare name: string;
    declare city_id: ForeignKey<City['id']>;
  }
  
  export function ListFactory(sequelize: Sequelize) {
    List.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        }
      },
      {
        sequelize,
        tableName: "list",
        timestamps: true,
      }
    );
  
    return List;
  }