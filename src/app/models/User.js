import Sequelize, { Model } from 'sequelize';

// Colunas que serão inseridas pelo usuário

class User extends Model {
  // O método abaixo (init) será chamado automaticamente pelo sequelize
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }
}

export default User;
