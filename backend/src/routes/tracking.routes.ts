import { Router } from 'express';
import { getTrackingStatus } from '../controllers/tracking.controller';

const router = Router();

// GET /api/v1/tracking/:trackingNumber
router.get('/:trackingNumber', getTrackingStatus);

export default router;
