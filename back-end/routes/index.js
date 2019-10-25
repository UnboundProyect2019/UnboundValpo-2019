import routerx from 'express-promise-router';
import proyectoRouter from './proyecto';
import ahijadoRouter from './ahijado';
import usuarioRouter from './usuario';

const router = routerx();

router.use('/proyecto',proyectoRouter);
router.use('/ahijado',ahijadoRouter);
router.use('/usuario',usuarioRouter);

export default router;