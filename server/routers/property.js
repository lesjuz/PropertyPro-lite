import express from 'express';
import propertyCtrl from '../controllers/property';

const router = express.Router();

router.post('/', propertyCtrl.create);
router.get('/', propertyCtrl.getAll);
router.get('/:id', propertyCtrl.getOne);
router.put('/:id', propertyCtrl.update);
router.delete('/:id', propertyCtrl.delete);

export default router;
