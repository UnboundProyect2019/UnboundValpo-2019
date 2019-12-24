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
    nombre_familia: { type: String, maxlength: 60, required: true },
    padre: { type: String ,maxlength: 60,},
    madre: { type: String ,maxlength: 60,},
    ingresos: { type: Number },
    egresos: { type: Number},
    total: { type: Number },
    arriendo: { type: Number},
    luz: { type: Number},
    agua: { type: Number},
    gas: { type: Number},
    movilizacion: { type: Number},
    otro: { type: Number},
    estado: { type: Number, default: 1},
    /*integrante: [ IntegranteSchema ],*/
});
const Familia = mongoose.model('familia', familiaSchema);

export default Familia;