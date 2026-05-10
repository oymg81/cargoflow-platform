import { Router } from 'express';
import { submitContactForm } from '../controllers/contact.controller';

const router = Router();

// POST /api/v1/contact
router.post('/', submitContactForm);

export default router;
