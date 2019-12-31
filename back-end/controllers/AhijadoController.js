import models from '../models';

export default {
    add: async (req, res, next) => {
        try {
            const reg = await models.Ahijado.create(req.body);
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
            const reg = await models.Ahijado.findOne({ _id: req.query._id }); //consulta de un documento (por un id)
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
    listAhijados: async (req, res, next) => {
        try {
            let valor= req.query.valor;
            const reg = await models.Ahijado.find({ $or: [{ 'nombre': new RegExp(valor, 'i') }, { 'apellidos': new RegExp(valor, 'i') }],'estado': 1}, { fecha_ingreso:0})
            // const reg = await models.Ahijado.find({})
            .populate('proyecto',{nombre_proyecto:1})
            .sort({'fecha_ingreso':-1});
            res.status(200).json(reg);
        } catch (err) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(err);
        }
    },
    listEgresados: async (req, res, next) => {
        try {
            let valor= req.query.valor;
            const reg = await models.Ahijado.find({ $or: [{ 'nombre': new RegExp(valor, 'i') }, { 'apellidos': new RegExp(valor, 'i') }],'estado': 0}, { fecha_ingreso:0})
            // const reg = await models.Ahijado.find({})
            .populate('proyecto',{nombre_proyecto:1})
            .sort({'fecha_ingreso':-1});
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
            const reg = await models.Ahijado.findByIdAndUpdate({ _id: req.body._id },
                {
                    proyecto:req.body.proyecto,
                    nombre: req.body.nombre,
                    apellidos: req.body.apellidos,
                    fecha_nacimiento: req.body.fecha_nacimiento,
                    discapacidad: req.body.discapacidad,
                    nivel_educacional: req.body.nivel_educacional,
                    direccion_calle: req.body.direccion_calle,
                    direccion_numero: req.body.direccion_numero,
                    direccion_sector: req.body.direccion_sector,
                    // direccion : {
                    //     calle: req.body.direccion_calle,
                    //     numero: req.body.direccion_numero,
                    //     sector: req.body.direccion_sector,
                    // },
                    // info_pago:{                        
                    //     tipo_cuenta: req.body.info_pago_tipo_cuenta,
                    //     numero_cuenta: req.body.info_pago_numero_cuenta,
                    //     pago_banco: req.body.info_pago_banco,
                    // },
                    info_pago_tipo_cuenta: req.body.info_pago_tipo_cuenta,
                    info_pago_numero_cuenta: req.body.info_pago_numero_cuenta,
                    info_pago_banco: req.body.info_pago_banco,

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
            const reg = await models.Ahijado.findByIdAndDelete({ _id: req.body._id });
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
            const reg = await models.Ahijado.findByIdAndUpdate({ _id: req.body._id }, { estado: 1 });
            res.status(200).json(reg);
        } catch (err) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(err);
        }
    },
    activate_carta_agradecimiento: async (req, res, next) => {
        try {
            const reg = await models.Ahijado.findByIdAndUpdate({ _id: req.body._id }, { carta_agradecimiento: 1 });
            res.status(200).json(reg);
        } catch (err) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(err);
        }
    },
    activate_carta_navidad: async (req, res, next) => {
        try {
            const reg = await models.Ahijado.findByIdAndUpdate({ _id: req.body._id }, { carta_navidad: 1 });
            res.status(200).json(reg);
        } catch (err) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(err);
        }
    },
    activate_carta_invierno: async (req, res, next) => {
        try {
            const reg = await models.Ahijado.findByIdAndUpdate({ _id: req.body._id }, { carta_invierno: 1 });
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
            const reg = await models.Ahijado.findByIdAndUpdate({ _id: req.body._id }, { estado: 0 });
            res.status(200).json(reg);
        } catch (err) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(err);
        }
    },
    deactivate_carta_agradecimiento: async (req, res, next) => {
        try {
            const reg = await models.Ahijado.findByIdAndUpdate({ _id: req.body._id }, { carta_agradecimiento: 0 });
            res.status(200).json(reg);
        } catch (err) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(err);
        }
    },
    deactivate_carta_navidad: async (req, res, next) => {
        try {
            const reg = await models.Ahijado.findByIdAndUpdate({ _id: req.body._id }, { carta_navidad: 0 });
            res.status(200).json(reg);
        } catch (err) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(err);
        }
    },
    deactivate_carta_invierno: async (req, res, next) => {
        try {
            const reg = await models.Ahijado.findByIdAndUpdate({ _id: req.body._id }, { carta_invierno: 0 });
            res.status(200).json(reg);
        } catch (err) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(err);
        }
    },
}
