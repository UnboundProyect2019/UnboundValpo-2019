import routerx from 'express-promise-router'; //permite que el middleware debuelva promesas 
import eventoController from '../controllers/EventoController';
import auth from '../middlewares/auth';

const router = routerx();
 
router.post('/add', auth.verifyAdministrador, eventoController.add);
router.get('/query', auth.verifyAdministrador,eventoController.query);
router.get('/list', auth.verifyAdministrador, eventoController.list);
router.put('/update', auth.verifyAdministrador, eventoController.update);
router.delete('/remove', auth.verifyAdministrador,eventoController.remove);


export default router;