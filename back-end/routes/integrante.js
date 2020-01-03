import routerx from 'express-promise-router'; //permite que el middleware debuelva promesas 
import integranteController from '../controllers/IntegranteController';
import auth from '../middlewares/auth';

const router = routerx();
 
router.post('/add', auth.verifyUsuario, integranteController.add);
router.get('/query', auth.verifyUsuario,integranteController.query);
router.get('/list', auth.verifyUsuario, integranteController.list);
router.put('/update', auth.verifyUsuario, integranteController.update);
router.delete('/remove', auth.verifyUsuario,integranteController.remove);

export default router;