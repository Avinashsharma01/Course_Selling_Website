import express from "express";
import handleContact from "../controllers/contact.controller.js";
import { contactValidation } from '../middleware/validateInput.js';

const router = express.Router();

router.post('/contact', contactValidation, handleContact);

export default router;

