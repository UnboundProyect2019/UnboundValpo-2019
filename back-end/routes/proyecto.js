import routerx from 'express-promise-router'; //permite que el middleware debuelva promesas 
import proyectoController from '../controllers/ProyectoController';
import auth from '../middlewares/auth';

const router = routerx();
 
router.post('/add', auth.verifyAdministrador, proyectoController.add);
router.get('/query', auth.verifyAdministrador,proyectoController.query);
router.get('/list', auth.verifyAdministrador && auth.verifyAsistSocial, proyectoController.list);
router.put('/update', auth.verifyAdministrador, proyectoController.update);
router.delete('/remove', auth.verifyAdministrador,proyectoController.remove);
router.put('/activate', auth.verifyAdministrador, proyectoController.activate);
router.put('/deactivate', auth.verifyAdministrador, proyectoController.deactivate);



export default router;