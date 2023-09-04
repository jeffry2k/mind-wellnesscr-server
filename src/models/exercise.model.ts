import { Document, Schema, model } from "mongoose";

export interface IExercise extends Document {
  nombre: string;
  observaciones: string;
  urlVideo: string;
}

const exerciseSchema = new Schema<IExercise>(
  {
    nombre: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      max: 200,
    },
    observaciones: {
      type: String,
      optional: true,
      trim: true,
    },
    urlVideo: {
      type: String,
      optional: true,
      trim: true,
    },    
  },
  {
    timestamps: true,
  }
);

export default model<IExercise>("Exercise", exerciseSchema);
