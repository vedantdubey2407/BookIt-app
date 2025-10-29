import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
  _id: any;
  name: string;
  description: string;
  about: string;
  price: number;
  location: string;
  imageUrl: string;
  slots: {
    date: Date;
    times: {
      time: string;
      slotsAvailable: number;
    }[];
  }[];
}

const ExperienceSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  about: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  imageUrl: { type: String, required: true },
  slots: [{
    date: { type: Date, required: true },
    times: [{
      time: { type: String, required: true },
      slotsAvailable: { type: Number, required: true, default: 10 },
    }],
  }],
});

export default mongoose.models.Experience || mongoose.model<IExperience>('Experience', ExperienceSchema);