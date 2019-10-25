import routerx from 'express-promise-router'; //permite que el middleware debuelva promesas 
import ahijadoController from '../controllers/AhijadoController';
import auth from '../middlewares/auth';

const router = routerx();

router.post('/add',auth.verifyAsistSocial ,ahijadoController.add);
router.get('/query', auth.verifyAsistSocial , ahijadoController.query);
router.get('/list', auth.verifyAsistSocial , ahijadoController.list);
router.put('/update', auth.verifyAsistSocial , ahijadoController.update);
router.delete('/remove', auth.verifyAsistSocial , ahijadoController.remove);
router.put('/activate', auth.verifyAsistSocial , ahijadoController.activate);
router.put('/deactivate', auth.verifyAsistSocial , ahijadoController.deactivate);

export default router;