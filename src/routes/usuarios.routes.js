import { Router } from "express";
import { actualizar, createUser, eliminar, index } from "../controller/controller.js";
import { uploadImageMulter } from "../config/multer.js";

const router = Router()

router.get('/usuarios', index)

router.delete('/usuarios/:id', eliminar)

router.post('/usuarios', uploadImageMulter.single('imagen'), createUser)

router.put('/usuarios/:id', actualizar)

export default router