import Sequelize from 'sequelize';
import User from '../app/models/User';

import databaseConfig from '../config/database';

import Recipient from '../app/models/Recipient';
import Deliveryman from '../app/models/Deliveryman';
import File from '../app/models/File';
import Order from '../app/models/Order';
import DeliveryProblem from '../app/models/DeliveryProblem';

// array of models to simplify connection
const models = [User, Recipient, Deliveryman, File, Order, DeliveryProblem];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      // relationship between tables if such association exists in model
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
