import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  userName: string;
  userEmail: string;
  experienceId: mongoose.Schema.Types.ObjectId;
  date: string;
  time: string;
}

const BookingSchema: Schema = new Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  experienceId: { type: Schema.Types.ObjectId, ref: 'Experience', required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);