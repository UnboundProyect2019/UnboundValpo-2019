import routerx from 'express-promise-router'; //permite que el middleware debuelva promesas 
import familiaController from '../controllers/FamiliaController';
import auth from '../middlewares/auth';

const router = routerx();
 
router.post('/add', auth.verifyAdministrador, familiaController.add);
router.get('/query', auth.verifyAdministrador,familiaController.query);
router.get('/list', auth.verifyAdministrador && auth.verifyAsistSocial && auth.verifyLector, familiaController.list);
router.put('/update', auth.verifyAdministrador, familiaController.update);
router.delete('/remove', auth.verifyAdministrador,familiaController.remove);
router.put('/activate', auth.verifyAdministrador, familiaController.activate);
router.put('/deactivate', auth.verifyAdministrador, familiaController.deactivate);



export default router;