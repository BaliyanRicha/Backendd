/!-------------------------creating express server----------------- */


const express = require('express');
const app = express();
app.use(express.json());
const Joi =  require('joi');



const courses = [
    {id: 1, name: "course1"},
    {id: 2, name: "course2"},
    {id:3,name:"course3"}
]

app.get('/',(req, res)=>{
    res.send('Hello world');
});

/!----------------Route Parameters--------------*/
// {
//     "year": "2078",
//     "month": "5"
//     }
app.get('/api/posts/:year/:month',(req,res)=>{
    res.send(req.params);
});

// ----------------handling http get request--------------
app.get('/api/courses',(req,res)=>{
    res.send(courses);
});


// -------------getting data with parameters --------------------------

app.get('/api/courses/:id',(req,res)=>{
  const course = courses.find(c => c.id ===parseInt(req.params.id));
  if(!course){
    res.status(404).send("Course not found");
    return ;
  }
  res.send(course);

});


// -----------------posting data --------------------

app.post('/api/courses', (req,res)=>{

    // ----------------validation for input -------------------------
    const result =  validateCourse(req.body);


    if(result.error){
         res.status(400).send(result.error.details[0].message);
        return;
    }
    const course = {
        id : courses.length + 1 ,
       name :req.body.name 
    };
    courses.push(course);
    res.send(course);
})

// ---------------handling put request-------------------
app.put('/api/courses/:id', (req,res)=>{
    const course = courses.find(c => c.id ===parseInt(req.params.id));
    if(!course){
      res.status(404).send("Course not found");
      return;
    }

    
    const result =  validateCourse(req.body);
    if(result.error){
         res.status(400).send(result.error.details[0].message);
        return;
    }

    course.name =  req.body.name;
    res.send(course);


})


// -----------handling delete request----------

app.delete('/api/courses/:id',(req,res)=>{

    const course = courses.find(c => c.id ===parseInt(req.params.id));
    if(!course){
      res.status(404).send("Course not found");
      return;
    }

    const index =  courses.indexOf(course);
    courses.splice(index,1);
    res.send(course);


})

function validateCourse(course){
    const schema = {
        name : Joi.string().min(3).required()
    };

   return  Joi.validate(course,schema);
}


/*------------- settting up environment variable----------------*/

const port = process.env.PORT || 3003 ;
app.listen(port,()=> console.log(`listening to port ${port}`));


