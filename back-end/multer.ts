import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import * as AWS from "aws-sdk";

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-southeast-1'
});


export const upload: multer.Instance = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'beebeerent.upload',
        metadata: (req, file, cb) => {
            // console.log('i am multer file!!!!', file);
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
        }
    })
});