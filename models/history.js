module.exports = (sequelize, DataTypes) => {
    const History = sequelize.define('History', {
        historyId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    History.associate = models => {
        History.belongsTo(models.LessonOrder, { foreignKey: 'orderId' });
    };
    return History;
};
