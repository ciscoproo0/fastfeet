import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
  static init(sequelize) {
    //  calls init from Model
    super.init(
      {
        name: Sequelize.STRING,
        address: Sequelize.STRING,
        number: Sequelize.STRING,
        complement: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        zipCode: Sequelize.VIRTUAL,
        zip_code: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    //  before saving info on DB, zip_code gets value from zipCode
    this.addHook('beforeSave', async recipient => {
      if (recipient.zipCode) recipient.zip_code = recipient.zipCode;
    });
    return this;
  }
}

export default Recipient;
