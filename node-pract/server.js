const express = require('express');
const fs = require('fs');
const path = require('path');
const Joi = require('joi');
const app = express();
const port = 4000;
const  cors =  require("cors");

app.use(express.json());


app.use(
    cors({
     
    })
  );
app.use(express.static('public'));

// app.get('/files', (req, res) => {
//     fs.readdir(uploadFolder, (err, files) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send('Internal Server Error');
//             return;
//         }
//         res.json(files);
//     });
// });




const uploadsFolder = path.join(__dirname, 'uploads');
const alarmFolder = path.join(__dirname, 'alarm');


app.get('/files', (req, res) => {
    const files = {
        uploads: [],
        alarm: []
    };

    fs.readdir(uploadsFolder, (err, uploadsFiles) => {
        if (!err) {
            files.uploads = uploadsFiles;
        }

        fs.readdir(alarmFolder, (err, alarmFiles) => {
            if (!err) {
                files.alarm = alarmFiles;
            }
          
            res.json(files);
        });
    });
});



app.get('/files/:fileName', (req, res) => {
    console.log("inside get api");
    const fileName = req.params.fileName;
    const filePath = path.join(uploadsFolder, fileName);
    

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          console.error(err);
          res.status(404).send('File Not Found');
        } else {
            console.log("data is ",data);
            res.setHeader('Content-Type', 'text/plain');
          res.send({data});
        }
      });
    
        
    });


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
