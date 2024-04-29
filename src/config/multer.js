import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: async function (req, file, cb) {
    const nuevoNombre = `${Date.now()}-${file.originalname}`
    cb(null, nuevoNombre)
  }
})

export const uploadImageMulter = multer({ storage : storage})

