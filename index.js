const connection=require ("./db/connection")
const inquirer=require("inquirer")
connection.connect(err=>{
    console.log("databaseconnected")
    startQuestion()
    if (err) {
        console.log(err)
    }
})

function startQuestion(){
    inquirer.prompt({
        name:"question",
        message:"what would you like to do ?",
        type:"list",
        choices:[
            "add employee",
            "add department",
            "add role",
            "view employees",
            "view departments",
            "view roles",
            "update user role"
        ]

    }).then(selection=>{
        console.log(selection)
        if (selection.question==="add department"){
            addDepartment()
        }if (selection.question==="add role"){
            addRole()
        }
if(selection.question==="add employee"){
    addEmployee()
}
if (selection.question==="view departments"){
    viewDepartments()
}if (selection.question==="view roles"){
    viewRoles()
}
if(selection.question==="view employees"){
viewEmployees()
}
if(selection.question=="update user role"){
    updateUserRole()
    }
    


    })
}
function addDepartment(){
    inquirer.prompt({
       name:"depname",
       message:"what is the department name?" 
    }).then(name=>{
        console.log (name.depname)
        connection.query("insert into department set ?",{name:name.depname})
        startQuestion()
    })
}
function addRole(){
   connection.query("select * from department",(err,res)=>{
    //    console.log(res)
//   onst departments=res.map(dep=>{
//       return{
//           name:dep.name,
          
//       }
 // })
    inquirer.prompt([{
       name:"roletitle",
       message:"what is the role title ?" 
    },
    {
        name:"salary",
        message:"what is the role salary ?" 
     },
{
    name:"depname",
    type:"list",
    message:"what department is this role in ?",

    choices:res
}

]).then(name=>{
        console.log (name.roletitle)
        const depid=res.find(dep=>{
            return dep.name===name.depname
        })
        console.log(depid)
        connection.query("insert into role set ?",{title:name.roletitle,
        department_id:depid.id,
        salary:name.salary
        })
        startQuestion()
    })
})
}
function addEmployee(){
    connection.query("select * from role",(err,res)=>{
        console.log(res)
   const roles=res.map(dep=>{
       return{
           name:dep.title,
        value:dep.id   
       }       
  })

  connection.query("select * from employees",(err,res)=>{
    console.log(res)
const managers=res.map(dep=>{
   return{
       name:dep.first_name,
    value:dep.id   
   }
})
     inquirer.prompt([{
        name:"firstName",
        message:"what is the employee`s first name ?" 
     },
     {
        name:"lastName",
        message:"what is the employee`s last name ?" 
     },
    
 {
     name:"employeerole",
     type:"list",
     message:"what is the employee`s role ?",
 
     choices:roles
 },
 {
    name:"employeemanager",
    type:"list",
    message:"what is the employee`s manager ?",

    choices:managers
}
 
 ]).then(employee=>{
         connection.query("insert into employees set ?",{first_name:employee.firstName,
            last_name:employee.lastName,
         role_id:employee.employeerole,
         manager_id:employee.employeemanager
         })
         startQuestion()
     })
 })
})
 }
 function viewDepartments(){
    connection.query("select * from department",(err,res)=>{
        console.log (res)
    startQuestion() 

    })   
 }
 function viewEmployees(){
    connection.query("select * from employees",(err,res)=>{
        console.log (res)
    startQuestion()   

    }) 
 }
 function viewRoles(){
    connection.query("select * from role",(err,res)=>{
        console.log (res)
        startQuestion() 
    }) 
   
 }


 function updateUserRole() {

    connection.query("select * from employees",(err,res)=>{
    
        const users=res.map(dep=>{
            return{
                name:dep.first_name,
                value:dep.id   
            }
         })

        connection.query("select * from role", (err, resp) => {
            const roles =resp.map(dep=>{
                return{
                    name:dep.title,
                    value:dep.id   
                }
             })


             inquirer.prompt([
                {
                    name:"employee",
                    type:"list",
                    message:"which employee do we want to update ?",
                
                    choices: users
                },
                {
                    name:"role",
                    type:"list",
                    message:"what is employees new role?",
                
                    choices:roles
                }
             ]).then(response => {
                 connection.query("update employees set role_id = ? where id = ?", [response.role, response.employee])
             })

        }) 

    }) 

 }