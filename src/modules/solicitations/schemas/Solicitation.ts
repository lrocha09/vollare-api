import { Schema, model, Document } from 'mongoose';

interface Solicitation extends Document {
    title: string;
    description: string;
    user: string;
    status: string;
    createdAt: Date;
}

const SolicitationSchema = new Schema<Solicitation>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['aberta', 'andamento', 'fechada', 'cancelada'],
        default: 'aberta',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Solicitation = model<Solicitation>('Solicitation', SolicitationSchema);

export default Solicitation;
