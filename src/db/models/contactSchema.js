import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: false,
        },
        isFavourite: {
            type: Boolean,
            default: false,
        },
        contactType: {
            type: String,
            enum: ['work', 'home', 'personal'], 
            required: true,
            default: 'personal'
        },
         photo: {
      type: String,
      default: null,
    },
        userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    },
    {
        timestamps: true,
        toJSON: {
            transform: function (doc, ret) {
                delete ret.__v;
                return ret;
            }
        },
        toObject: {
            transform: function (doc, ret) {
                delete ret.__v;
                return ret;
            }
        }
    }
);

export default mongoose.model('Contact', contactSchema);
