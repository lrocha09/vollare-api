import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

interface User extends Document {
    name: string;
    email: string;
    cpf: string;
    password: string;
    active: boolean;
    adm: boolean;
    createdAt: Date;
}

const UserSchema = new Schema<User>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        validate: validator.isEmail,
    },
    cpf: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    adm: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.pre('save', async function (next) {
    const user: User = this;

    if (user.isModified('password')) {
        try {
            const hash = await bcrypt.hash(user.password, 10);
            user.password = hash;
        } catch (error) {
            next(error);
        }
    }

    next();
});

const User = model<User>('User', UserSchema);

export default User;
