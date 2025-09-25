import { Schema, model, models, Document, Model } from "mongoose";
import bcrypt from "bcrypt"

export interface IUser extends Document {
  surname: string
  middlename?: string
  email: string
  phonenumber: string
  password: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    surname: { type: String, required: true, trim: true },
    middlename: { type: String, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phonenumber: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
)

// UserSchema.pre("save", async function () {
// 	const salt = await bcrypt.genSalt(10);
// 	const hashedPassword = await bcrypt.hash(this.password, salt);
// 	this.password = hashedPassword;
// })

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});



const UserModel: Model<IUser> = models.User || model<IUser>("User", UserSchema);

export default UserModel