import mongoose,{Schema} from 'mongoose';

/*
const IntegranteSchema = new Schema({
    nombre_completo: { type: Number, default: 1}, 
    parentesco: { type: String}, 
    edad: {type: String, unique: true}, 
    nivel_educacional: {type: String}, 
    ocupacion: {type: String, unique: true}, 
    ingresos: {type: String, unique: true}
});

*/
const familiaSchema = new Schema({

    ahijado: { type: Schema.ObjectId, ref:'ahijado', required: true },
    ficha_familiar: { type: String, maxlength: 60, required: true },
    alimentacion: { type: String, maxlength: 60},
    arriendo: { type: String, maxlength: 60},
    luz: { type: String, maxlength: 60},
    agua: { type: String, maxlength: 60},
    gas: { type: String, maxlength: 60},
    movilizacion: { type: String, maxlength: 60},
    otro: { type: String, maxlength: 60},
    estado: { type: Number, default: 1},
    /*integrante: [ IntegranteSchema ],*/

});
const Familia = mongoose.model('familia', familiaSchema);

export default Familia;