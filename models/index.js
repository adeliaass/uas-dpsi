const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Student = require('./student')(sequelize, Sequelize.DataTypes);
const Teacher = require('./teacher')(sequelize, Sequelize.DataTypes);
const LessonOrder = require('./lessonOrder')(sequelize, Sequelize.DataTypes);
const History = require('./history')(sequelize, Sequelize.DataTypes);
const Schedule = require('./schedule')(sequelize, Sequelize.DataTypes);
const User = require('./user')(sequelize,Sequelize.DataTypes);

const models = {
    Student,
    Teacher,
    LessonOrder,
    History,
    Schedule,
    User
};

// Define relationships
Object.keys(models).forEach(modelName => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;


module.exports = models;
