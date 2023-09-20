import { DataTypes } from 'sequelize';
import db from '../db/config';

const User = db.define('User', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false, // Indica que el nombre no puede ser nulo
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false, // Indica que el correo electrónico no puede ser nulo
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, // Valor predeterminado para el estado (puedes cambiarlo según tus necesidades)
    },
});


export default User;