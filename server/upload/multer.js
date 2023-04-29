import multer from "multer";

//specify the storage engine
const storagePicture = multer.diskStorage({
  destination: function(req, file, cb){
      cb(null, './public/pictures');
  },
  filename:function(req, file, cb){
      cb(null, file.originalname);
  }
});

const storageVideo = multer.diskStorage({
  destination: function(req, file, cb){
      cb(null, './public/videos');
  },
  filename:function(req, file, cb){
      cb(null, file.originalname);
  }
});

//file validation
const fileFilterPicture = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype ===  'image/png'){
      cb(null,true);
  }else{
      cb({message: 'Unsupported File Format'}, false)
  }
};

const fileFilterVideo = (req, file, cb) => {
  if(file.mimetype === 'video/mp4'){
      cb(null,true);
  }else{
      cb({message: 'Unsupported File Format'}, false)
  }
};


export const uploadPicture = multer({
  storage: storagePicture,
  limits: {fileSize: 4096 * 4096},
  fileFilter: fileFilterPicture
});

export const uploadVideo = multer({
  storage: storageVideo,
  fileFilter: fileFilterVideo
});
