import routerx from 'express-promise-router'; //permite que el middleware debuelva promesas 
import ahijadoController from '../controllers/AhijadoController';
import auth from '../middlewares/auth';

const router = routerx();
//ver error aca
router.post('/add',auth.verifyAsistSocial ,ahijadoController.add);
router.get('/query', auth.verifyUsuario , ahijadoController.query);
router.get('/listAhijados', auth.verifyUsuario, ahijadoController.listAhijados);
router.get('/listEgresados', auth.verifyUsuario, ahijadoController.listEgresados);
router.put('/update', auth.verifyAsistSocial , ahijadoController.update);
router.delete('/remove', auth.verifyAsistSocial , ahijadoController.remove);
router.put('/activate', auth.verifyAsistSocial , ahijadoController.activate);
router.put('/deactivate', auth.verifyAsistSocial , ahijadoController.deactivate);
router.put('/activateca', auth.verifyAsistSocial , ahijadoController.activate_carta_agradecimiento);
router.put('/deactivateca', auth.verifyAsistSocial , ahijadoController.deactivate_carta_agradecimiento);
router.put('/activatecn', auth.verifyAsistSocial , ahijadoController.activate_carta_navidad);
router.put('/deactivatecn', auth.verifyAsistSocial , ahijadoController.deactivate_carta_navidad);
router.put('/activateci', auth.verifyAsistSocial , ahijadoController.activate_carta_invierno);
router.put('/deactivateci', auth.verifyAsistSocial , ahijadoController.deactivate_carta_invierno);

export default router;