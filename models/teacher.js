module.exports = (sequelize, DataTypes) => {
    const Teacher = sequelize.define('Teacher', {
        teacherId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        expertise: DataTypes.STRING
    });
    Teacher.associate = models => {
        Teacher.hasMany(models.LessonOrder, { foreignKey: 'teacherId' });
    };
    return Teacher;
};
