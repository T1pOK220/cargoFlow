import multer from "multer";
import path from "path";
const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "uploads/avatars/");
  },

  filename: (req, file, cb) => {

    const uniqueName =
      Date.now() + path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const upload = multer({

  storage,

  limits: {
    fileSize: 2 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {

    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg"
    ) {

      cb(null, true);

    } else {

      cb(new Error("Тільки JPG/PNG"));
    }
  },
});

export default upload;