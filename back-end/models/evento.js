import mongoose,{Schema} from 'mongoose';

const eventoSchema = new Schema({
    name: { type: String, maxlength: 50, unique: false, required: true},
    details:{type:String, maxlength:125, required:true},
    start:{type:String, unique: false, required: true},
    end:{type:String,unique: false, required: true},
    color:{type:String, maxlength:10, required:true}
});
const Evento = mongoose.model('evento',eventoSchema);

export default Evento;