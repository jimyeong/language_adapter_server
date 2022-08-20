const multer = require("multer");
const path = require("path")
const CAPACITY_FILE = 5000000;
const fs = require("fs");
const filePath = path.join(process.env.PWD, "/upload");



const router = require("express").Router();
const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, path.join(process.env.PWD, "/upload"));
    },
    filename: function(req, file, callback){
        console.log(['file'], file);
        const ext =  file.mimetype.split("/")[1];
        console.log(['file name'], Math.round(Math.random() * 1E9))
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E7)}.${ext}`
        callback(null, file.fieldname + "-" + uniqueSuffix);
    }
});

const upload = multer({storage, limits:{
    fileSize: CAPACITY_FILE
}}).single("uploaded_file");

router.get("/", (req, res, next)=>{
    console.log(res);
});

router.post("/" ,(req, res, next) => {
    console.log(["body"],req.body, ["file"],req.file);
    upload(req, res, function(err){
        console.log(['error message'], err);

        console.log(["body inner"],req.body, ["file inner"],req.file);

        if(!err){
            // DB 저장
            setTimeout(()=>{
                try{
                    failedFileDelete(filePath,req.file.filename);
                }catch(err){
                    console.error(err);
                }
            },8000)
        }
        if(err){
            if(err instanceof multer.MulterError){
                // 업로드 중에 오류가 발생하면 여기서
                // 로그를 기록하고 실패했다는 응답을 클라이언트로 전송
                return res.json({
                    code: 400,
                    message: err
                })
            }
                // 업로드 중에 오류가 발생하면 여기서
                // 로그를 기록하고 실패했다는 응답을 클라이언트로 전송
                res.json({
                    code: 500,
                    message: err
                })
        }
    })
})

function failedFileDelete(fileDirectory, fileName){
    fs.unlink(fileDirectory + `/${fileName}`, (err)=>{
        if(err){return console.log(['FAILED FILE DELETE FAILED', "failed"])}
        console.log(['FAILED FILE DELETED', "success"])
    });
}
module.exports = router;