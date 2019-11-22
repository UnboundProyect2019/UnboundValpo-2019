import models from '../models';

export default {
    add: async (req, res, next) => {
        try {
            const reg = await models.Evento.create(req.body);
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
            const reg= await models.Evento.findOne({_id:req.query._id}); //consulta de un documento (por un id)
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
            const reg = await models.Evento.find({});
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
            const reg = await models.Evento.findByIdAndUpdate({_id:req.body._id},
            {
                name: req.body.name,
                details: req.body.details,
                start: req.body.start,
                end: req.body.end,
                color: req.body.color,
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
            const reg = await models.Evento.findByIdAndDelete({_id:req.body._id});
            res.status(200).json(reg);
        } catch (err) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(err);
        }
    },
}
