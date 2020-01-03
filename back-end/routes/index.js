import routerx from 'express-promise-router';
import proyectoRouter from './proyecto';
import ahijadoRouter from './ahijado';
import usuarioRouter from './usuario';
import eventoRouter from './evento';
import familiaRouter from './familia';
import integranteRouter from './integrante';

const router = routerx();

router.use('/proyecto',proyectoRouter);
router.use('/ahijado',ahijadoRouter);
router.use('/usuario',usuarioRouter);
router.use('/evento',eventoRouter);
router.use('/familia',familiaRouter);
router.use('/integrante',integranteRouter);

export default router;