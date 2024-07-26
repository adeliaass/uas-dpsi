module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
        studentId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        placeOfBirth: DataTypes.STRING,
        dateOfBirth: DataTypes.DATE,
        gender: DataTypes.STRING,
        religion: DataTypes.STRING,
        address: DataTypes.STRING,
        phoneNumber: DataTypes.INTEGER,
        education: DataTypes.STRING,
        occupation: DataTypes.STRING,
        idNumber: DataTypes.CHAR,
        idCard: DataTypes.CHAR
    });

    Student.associate = models => {
        Student.hasMany(models.LessonOrder, { foreignKey: 'studentId' });
        Student.hasOne(models.User, { foreignKey: 'studentId' });
    };

    return Student;
};
