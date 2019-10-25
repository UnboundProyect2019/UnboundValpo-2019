import jwt from 'jsonwebtoken';
import models from '../models'; //esto hace referencia al archivo index.js de la carpteta models

async function checkToken(token){ //recibe le token para validar que el token sea correcto a pesar de que sea antiguo(haya expirado)
    //programar funcionalidad si expira el token, generar otro token, en base del token antiguo
    let __id = null;
    try {
        const { _id } = await jwt.decode(token); //del usuario que retorna, solo extraigo el id
        __id = _id;
    } catch (e) { //sino el tojen no es valido
        return false;
    }
    const user = await models.Usuario.findOne({_id:__id, estado:1}); //con el id sacado del token obtengo el usuario
    if (user) { //si existe el usuario
        const token = jwt.sign({ _id: __id },'clavesecretaunboundvalpo',{expiresIn:'1d'}); //genero otro token
        return {token,rol:user.rol}; 
    } else {
        return false;
    }
}

export default {
    encode: async (_id,rol,email) => { //encode genera el token con el id del usuario (que esta correctamente autenticado)
        const token = jwt.sign({_id:_id,rol:rol,email:email},'clavesecretaunboundvalpo',{expiresIn:'1d'}); //primer parametro id, segundo clave secreta y tercero el tiempo de expiracion del token
        return token;
    },
    decode: async (token) => { //recive el token y poder determinar si el token en correcto
        try {
            const { _id } = await jwt.verify(token,'clavesecretaunboundvalpo');
            const user = await models.Usuario.findOne({_id,estado:1}); //exije que tenga el estado 1 (sino el usuario no puede acceder)
            if (user) {
                return user;
            } else {
                return false; 
            }
        } catch (e) {
            const newToken = await checkToken(token);
            return newToken; //puede retornar el token con el rol ó false
        }
    }
}