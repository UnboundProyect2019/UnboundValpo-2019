import tokenService from '../services/token';

export default {
    verifyUsuario: async (req, res, next) => { //verificar si es un usuario autenticado
        if (!req.headers.token) { // si no entra aca, es por que el usuario envio el token
            res.status(404).send({
                message: 'No tokenn' //entra aca
            })
        } 
        const response = await tokenService.decode(req.headers.token);
        if (response.rol == 'Administrador' || response.rol == 'Lector' || response.rol == 'Asist_Social') {
            //si fuera cualquiera de estos roles, es un usuario autenticado
            next();
        } else {
            return res.status(403).send({
                message:'No autorizado'
            })
        }
    },
    verifyAdministrador: async (req, res, next) => { 
        if (!req.headers.token) { // si no entra aca, es por que el usuario envio el token
            res.status(404).send({
                message: 'No tokenn'
            })
        }
        const response = await tokenService.decode(req.headers.token);
        if (response.rol == 'Administrador') {
            //si fuera cualquiera de estos roles, es un usuario autenticado
            next();
        } else {
            return res.status(403).send({
                message: 'No autorizado'
            })
        }
    },
    verifyLector: async (req, res, next) => { 
        if (!req.headers.token) { // si no entra aca, es por que el usuario envio el token
            res.status(404).send({
                message: 'No token'
            })
        }
        const response = await tokenService.decode(req.headers.token);
        if (response.rol == 'Administrador' || response.rol == 'Lector') {
            //si fuera cualquiera de estos roles, es un usuario autenticado
            next();
        } else {
            return res.status(403).send({
                message: 'No autorizado'
            })
        }
    },
    verifyAsistSocial: async (req, res, next) => { 
        if (!req.headers.token) { // si no entra aca, es por que el usuario envio el token
            res.status(404).send({
                message: 'No token'
            })
        }
        const response = await tokenService.decode(req.headers.token);
        if (response.rol == 'Administrador' || response.rol == 'Asist_Social') {
            //si fuera cualquiera de estos roles, es un usuario autenticado
            next();
        } else {
            return res.status(403).send({
                message: 'No autorizado'
            })
        }
    }
}