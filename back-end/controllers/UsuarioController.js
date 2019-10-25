import models from '../models';
import bcrypt from 'bcryptjs';
import token from '../services/token';

export default {
    add: async (req, res, next) => {
        try {
            req.body.password = await bcrypt.hash(req.body.password,10);//con el metodo hash se encripta los que esta en el body.password y el largo del hash
            const reg = await models.Usuario.create(req.body);
            res.status(200).json(reg);
        } catch (err) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(err);
        }
    },
    query: async (req, res, next) => {
        try {
            const reg = await models.Usuario.findOne({ _id: req.query._id });
            if (!reg) { // si no encuentro el documento 
                res.status(404).send({
                    message: 'El registro no existe'
                });
            } else { // si encuentro el documento
                res.status(200).json(reg);
            }
        } catch (err) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(err);
        }
    },
    list: async (req, res, next) => {
        try {
            let valor = req.query.valor;
            const reg = await models.Usuario.find({ $or: [{ 'nombre': new RegExp(valor, 'i') }, { 'email': new RegExp(valor, 'i') }] }, { fecha_ingreso: 0 })
                .sort({ 'fecha_ingreso': -1 });
            res.status(200).json(reg);
        } catch (err) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(err);
        }
    },
    update: async (req, res, next) => {
        try {
            let pas = req.body.password; //guardo el password que me estan enviando
            const reg0 = await models.Usuario.findOne({_id:req.body._id}); //y guardo el password del usuario que estoy editando
            if (pas != reg0.password) { //si son diferentes encripto la nueva password que se esta ingresando
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }
            //primer parametro indica la busqueda del registro que quiero actualizar y el 2do los valores a cambiar
            const reg = await models.Usuario.findByIdAndUpdate({ _id: req.body._id },
                {
                    rol: req.body.rol,
                    nombre: req.body.nombre,
                    contacto: req.body.contacto,
                    email: req.body.email,
                    password: req.body.password
                });
            res.status(200).json(reg);
        } catch (err) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(err);
        }
    },
    remove: async (req, res, next) => {
        try {
            const reg = await models.Usuario.findByIdAndDelete({ _id: req.body._id });
            res.status(200).json(reg);
        } catch (err) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(err);
        }
    },
    activate: async (req, res, next) => {
        try {
            const reg = await models.Usuario.findByIdAndUpdate({ _id: req.body._id }, { estado: 1 });
            res.status(200).json(reg);
        } catch (err) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(err);
        }
    },
    deactivate: async (req, res, next) => {
        try {
            const reg = await models.Usuario.findByIdAndUpdate({ _id: req.body._id }, { estado: 0 });
            res.status(200).json(reg);
        } catch (err) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(err);
        }
    },
    login: async (req, res, next) => {
        try {                                                           //OJO    indico que solo los usuarios con estado 1 puedan entrar al sistema
            let user = await models.Usuario.findOne({email:req.body.email, estado:1}); //primero verificar si el email q se ingreso esta en la bd
            if (user) {
                //existe un usuario con ese email 
                let match = await bcrypt.compare(req.body.password, user.password) //se verifica si la contraseña es correcta
                if (match) {
                    // Password correcta y aca se genera el token del usuario
                    let tokenReturn = await token.encode(user._id,user.rol,user.email);
                    res.status(200).json({user,tokenReturn});
                } else {
                    res.status(404).json({
                        message:'Password Incorrecto'
                    });
                }

            } else {
                //el usuario no existe
                res.status(404).send({
                    message:'No existe el usuario'
                });
            }
        } catch (err) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(err);
        }
    }, 
}
