import mongoose,{Schema} from 'mongoose';

const familiaSchema = new Schema({
    ahijado: { type: Schema.ObjectId, ref:'ahijado', required: true },
    nombretutor: { type: String, maxlength: 50, unique: false, required: true},
    apellidostutor:{type:String, maxlength:125, required:true},
    parentesco:{type:String, maxlength:125, required:true},
    edad:{type:String, maxlength:125, required:true},
    ocupacion:{type:String, maxlength:125, required:true},
    ingresos:{type:String, maxlength:125, required:true},
    niveleducacional:{type:String, maxlength:125, required:true},
    num_miembros: { type: String, required:false },
    descripciondemiembros:{type: String, maxlength:255, required:true },
    telefono:{type:String, maxlength:125, required:true},
    fecha_ingreso: { type: Date, default: Date.now }

});
const Familia = mongoose.model('familia',familiaSchema);

export default Familia;