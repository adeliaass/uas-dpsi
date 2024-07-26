module.exports = (sequelize, DataTypes) => {
    const LessonOrder = sequelize.define('LessonOrder', {
        orderId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        orderType: DataTypes.STRING,
        teacherId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        lessonCategory: DataTypes.STRING,
        date: DataTypes.DATE,
        time: DataTypes.TIME,
        duration: DataTypes.INTEGER,
        location: DataTypes.STRING
    });
    LessonOrder.associate = models => {
        LessonOrder.belongsTo(models.Student, { foreignKey: 'studentId' });
        LessonOrder.belongsTo(models.Teacher, { foreignKey: 'teacherId' });
        LessonOrder.hasMany(models.History, { foreignKey: 'orderId' });
        LessonOrder.hasMany(models.Schedule, { foreignKey: 'orderId' });
    };
    return LessonOrder;
};
