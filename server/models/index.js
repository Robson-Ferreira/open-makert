import fs from 'fs';
import path from 'path';
import sequelize from '../../database';

const db = {};

fs.readdirSync(__dirname)
  .filter(
    (file) => file.indexOf('.') !== 0
      && file !== path.basename(__filename)
      && file.slice(-3) === '.js',
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  const model = db[modelName];
  if (model.associate) {
    model.associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
