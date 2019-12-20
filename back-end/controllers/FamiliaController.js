import models from '../models';

export default {
    add: async (req, res, next) => {
        try {
            const reg = await models.Familia.create(req.body);
            res.status(200).json(reg);
        } catch (err) {
            res.status(500).send({
                message:'Ocurrio un error'
            });
            next(err);
        }
    },
    query: async (req, res, next) => {
        try {
            const reg= await models.Familia.findOne({_id:req.query._id}); //consulta de un documento (por un id)
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
            const reg = await models.Familia.find({});
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
            //primer parametro indica la busqueda del registro que quiero actualizar y el 2do los valores a cambiar
            const reg = await models.Familia.findByIdAndUpdate({_id:req.body._id},
            {

                ficha_familiar: req.body.ficha_familiar,
                alimentacion: req.body.alimentacion,
                arriendo: req.body.arriendo,
                luz: req.body.luz,
                agua: req.body.agua,
                gas: req.body.gas,
                movilizacion: req.body.movilizacion,
                otro: req.body.otro,
                estado: req.body.estado

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
            const reg = await models.Familia.findByIdAndDelete({_id:req.body._id});
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
            const reg = await models.Familia.findByIdAndUpdate({_id:req.body._id},{estado:1});
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
            const reg = await models.Familia.findByIdAndUpdate({ _id: req.body._id }, { estado: 0 });
            res.status(200).json(reg);
        } catch (err) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(err);
        }
    },
}