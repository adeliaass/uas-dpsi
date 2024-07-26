module.exports = (sequelize, DataTypes) => {
    const Schedule = sequelize.define('Schedule', {
        scheduleId: {
            type: DataTypes.INTEGER,
            primaryKey: true
            ,
            autoIncrement: true
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    Schedule.associate = models => {
        Schedule.belongsTo(models.LessonOrder, { foreignKey: 'orderId' });
    };
    return Schedule;
};