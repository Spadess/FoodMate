import multer from "multer";

//specify the storage engine
const storagePicture = multer.diskStorage({
  destination: function(req, file, cb){
      cb(null, '../server/public/pictures');
  },
  filename:function(req, file, cb){
      cb(null, file.originalname);
  }
});



//file validation
const fileFilterPicture = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype ===  'image/png' || file.mimetype === 'image/jpg'){
      cb(null,true);
  }else{
      cb({message: 'Unsupported File Format'}, false)
  }
};



//upload method
export const uploadPicture = multer({
  storage: storagePicture,
  limits: {fileSize: 4096 * 4096},
  fileFilter: fileFilterPicture
});

//video file validation
const fileFilterVideo = (req, file, cb) => {
  if(file.mimetype === 'video/mp4' || file.mimetype === 'video/MP4'){
    cb(null,true);
  }else{
      cb({message: 'Unsupported File Format'}, false)
  }
};

//specify storage for videos
const storageVideo = multer.diskStorage({
  destination: function(req, file, cb){
      cb(null, '../server/public/videos')
  },
  filename:function(req, file, cb){
      cb(null, file.originalname)
  }
});

export const uploadVideo = multer({
  
  storage: storageVideo,
  fileFilter: fileFilterVideo
});
