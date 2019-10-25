import mongoose,{Schema} from 'mongoose';

const proyectoSchema = new Schema({
    nombre_proyecto: { type: String, maxlength: 50, unique: true, required: true},
    sector:{type:String, maxlength:60, required:true},
    estado:{type:Number, default:1},
    createdAt:{type:Date, default:Date.now}
});
const Proyecto = mongoose.model('proyecto',proyectoSchema);

export default Proyecto;