import mongoose, { Model, Schema } from 'mongoose';


const UserSchema: Schema<any> = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
        validator: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => /^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W).{6,}$/.test(value),
      message:"Password must contain at least one numeric digit, one alphabet character, one symbol and atleast 6 char long",
    },
  },
  role: {
    type: [String],
    enum: ["VIEWER", "CREATOR", "VIEW_ALL"],
    default: ["VIEWER"],
  },
});

const UserModel: Model<any> = mongoose.model('Varthak_User', UserSchema);

export { UserModel };
