import routerx from 'express-promise-router';
import proyectoRouter from './proyecto';
import ahijadoRouter from './ahijado';
import usuarioRouter from './usuario';
import eventoRouter from './evento';

const router = routerx();

router.use('/proyecto',proyectoRouter);
router.use('/ahijado',ahijadoRouter);
router.use('/usuario',usuarioRouter);
router.use('/evento',eventoRouter);

export default router;