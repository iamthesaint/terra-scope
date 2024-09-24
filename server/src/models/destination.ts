import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface DestinationAttributes {
  id: number;
  image: string;
  name: string;
  description: string;
  web_url: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface DestinationCreationAttributes extends Optional<DestinationAttributes, 'id'> {}

export class Destination extends Model<DestinationAttributes, DestinationCreationAttributes> implements DestinationAttributes {
  public id!: number;
  public image!: string;
  public name!: string;
  public description!: string;
  public web_url!: string;
  public userId!: number; // reference to the user who saved this destination
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function DestinationFactory(sequelize: Sequelize): typeof Destination {
  Destination.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      web_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: 'destinations',
      timestamps: true,
    }
  );

  return Destination;
}