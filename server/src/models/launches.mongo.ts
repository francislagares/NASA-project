import mongoose, { Schema } from 'mongoose';
import { ILaunches } from '../types/launches';

const launchesSchema: Schema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
  },
  launchDate: {
    type: String,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  target: {
    type: String,
  },
  customers: [String],
  upcoming: {
    type: Boolean,
    required: true,
  },
  success: {
    type: Boolean,
    required: true,
    default: true,
  },
});

export default mongoose.model<ILaunches>('Launch', launchesSchema);
