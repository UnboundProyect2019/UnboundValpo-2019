import mongoose, { Schema } from 'mongoose';

const ahijadoSchema = new Schema({
    proyecto: { type: Schema.ObjectId, ref:'proyecto', required: true },
    nombre: { type: String, maxlength: 60, required: true },
    apellidos: { type: String, maxlength: 100, required: true },
    fecha_nacimiento: { type: String, maxlength: 60, required: true },
    discapacidad: { type: String, maxlength: 60, required: false },
    nivel_educacional: { type: String, maxlength: 60, required: false },

    carta_agradecimiento: { type: Number, default: 0 }, 
    carta_navidad: { type: Number, default: 0 },
    carta_invierno: { type: Number, default: 0 },
    estado: { type: Number, default: 1 }, //si esta activo ó egresado el ahijado

    direccion_calle:{type:String, maxlength:30},
    direccion_numero:{type:String, maxlength:5},
    direccion_sector:{type:String, maxlength:60}, 
    info_pago_tipo_cuenta: { type: String, maxlength: 30},
    info_pago_numero_cuenta: { type: String, maxlength: 30},
    info_pago_banco: { type: String, maxlength: 30},
    fecha_ingreso: { type: Date, default: Date.now }
});
const Ahijado = mongoose.model('ahijado', ahijadoSchema);

export default Ahijado;