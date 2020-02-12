import Sequelize, { Model } from 'sequelize';

// Colunas que serão inseridas pelo usuário

class User extends Model {
  // O método abaixo (init) será chamado automaticamente pelo sequelize
  static init(sequelize) {
    /*
      "Super" indica que estamos usando a classe "model",
      e na sequencia usando o init do model
      Para o init, enviamos as colunas que serão inseridas pelo usuário,
      o que é chave estrangeira ou preenchido automaticamente, logo, não precisa
      de Sequelize. VIRTUAL é um campo que será gerado apenas no lado da aplicação,
      não será gerado na base de dados
    */
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        type_acess: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
}

export default User;
