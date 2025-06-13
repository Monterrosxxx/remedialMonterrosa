/*
asi esta escrito todo en el env:

DB_URI=mongodb://localhost:27017/casino_colonial
PORT=4000
JWT_SECRET=
JWT_EXPIRES=
ADMIN_EMAIL=
ADMIN_PASSWORD=
USER_EMAIL=
USER_PASS=
CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
*/

import dotenv from 'dotenv';
dotenv.config();

export const config = {
    db:{
        URI: process.env.DB_URI
    },
    server: {
        PORT: process.env.PORT || 4000  // ⚠️ CORREGIDO: Era "PORt" ahora es "PORT"
    },
    JWT: {
        secret: process.env.JWT_SECRET,
        expires: process.env.JWT_EXPIRES
    },
    admin: {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
    },
    emailUser: {
        email: process.env.USER_EMAIL,
        password: process.env.USER_PASS
    },
    cloudinary: {
        cloudName: process.env.CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET
    }
};