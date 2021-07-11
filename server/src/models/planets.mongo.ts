import mongoose, { Schema } from 'mongoose';
import { IPlanet } from '../types/planets';

const planetSchema: Schema = new mongoose.Schema({
  keplerName: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IPlanet>('Planet', planetSchema);
