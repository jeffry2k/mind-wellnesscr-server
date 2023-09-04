import mongoose, { Document, Schema, model } from "mongoose";

export interface IRoutineData extends Document {
  diaEjercicio: number;
  idEjercicio: any;
  // nombreEjercicio: string;
  ordenEjercicio: number;
  obsEjercicio: string;
  urlVideoEjercicio: string;
}

export interface IRoutine extends Document, Array<IRoutineData> {
  // datosRutina: {
  //   type: [];
  //   required: true;
  // };
  datosRutina: [];
  notas: string;
  metodo: string;
  usuario: any;
}

const dscRoutineSchema = new Schema<IRoutineData>({
  diaEjercicio: {
    type: Number,
    required: true,
  },
  idEjercicio: {
    required: true,
    type: mongoose.Types.ObjectId,
    ref: "Exercise",
  },
  obsEjercicio: {
    type: String,
    default: "",
    optional: true,
    trim: true,
  },
  ordenEjercicio: {
    type: Number,
    required: true,
  },
  urlVideoEjercicio: {
    type: String,
    optional: true,
  },
  // nombreEjercicio: {
  //   type: String,
  //   default: "",
  //   required: true,
  //   trim: true,
  // },
});

const routineSchema = new Schema<IRoutine>({
  datosRutina: [dscRoutineSchema],
  notas: {
    type: String,
    default: "",
    optional: true,
    trim: true,
  },
  metodo: {
    type: String,
    default: "",
    trim: true,
  },
  usuario: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

export default model("Routine", routineSchema);
