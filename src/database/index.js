import Sequelize from 'sequelize';

import User from '../app/models/User';

import Recipient from '../app/models/Recipient';

import databaseConfig from '../config/database';

const models = [User, Recipient];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    // Envia a conexão(this.connection) para a variável init dentro do model
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
