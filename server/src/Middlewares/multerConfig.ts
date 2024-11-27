import multer from "multer";
import path from "path";

// Multer Configurations
const storage = multer.diskStorage({
  destination: function (req, _file, cb) {
    console.log(_file);
    const { appointmentId } = req.params as { appointmentId: string };
    if (appointmentId) {
      return cb(null, path.join(__dirname + "../../../uploads/prescriptions/"));
    }

    cb(null, path.join(__dirname + "../../../uploads/"));
  },
  filename: function (req, file, cb) {
    const { doctorId } = req.headers as { doctorId: string };
    const { appointmentId } = req.params as { appointmentId: string };
    console.log("Doctor ID:", doctorId);
    console.log("Appointment ID:", appointmentId);

    if (appointmentId && doctorId) {
      cb(
        null,
        doctorId +
          "-" +
          appointmentId +
          "-" +
          Date.now().toString() +
          path.extname(file.originalname),
      );
    }
    else if(doctorId) {
        cb(
            null,
            doctorId +
            "-" +
            Date.now().toString() +
            path.extname(file.originalname),
        );
    }
  },
});

// File filtering (optional)
const fileFilter = (_req: any, file: any, cb: any) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only .jpg, .jpeg and .png files are allowed"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 },
});

export default upload;
