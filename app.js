const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Image')
    },

    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now()+ path.extname(file.originalname))
    }
});

const upload = multer({storage: storage})

// app.use('/images', express.static(path.join(__dirname, 'Image')));
app.set("view engine", "ejs");


app.get(`/images/:imageName`, (req, res) => {

    const imageName = req.params.imageName;
    const imagesFolder = path.join(__dirname, "image");
    res.sendFile(path.join(imagesFolder, imageName));
});

app.get('/upload', (req, res) => {
    res.render("upload");
});

app.post('/upload', upload.single("image"), (req, res) => {
    console.log(req.file);
    res.send("Image uploaded");
});

app.listen(3000,() => {
    console.log("app work cheyynd.......!");
})