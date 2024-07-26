module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Students',
                key: 'studentId'
            }
        }
    });

    User.associate = models => {
        User.belongsTo(models.Student, { foreignKey: 'studentId', allowNull: true });
    };

    return User;
};
