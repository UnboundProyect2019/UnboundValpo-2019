import mongoose,{Schema} from 'mongoose';

const IntegranteSchema = new Schema({
    familia: { type: Schema.ObjectId, ref:'familia', required: true },
    nombre_completo: { type: String, required: true}, 
    parentesco: { type: String}, 
    edad: {type: String, required: true}, 
    nivel_educacional: {type: String}, 
    ocupacion: {type: String, required: false}, 
    ingresos: {type: Number}
});

const Integrante = mongoose.model('integrante', IntegranteSchema);

export default Integrante;