const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const Team = []
const Idnumbers = []

function Manager(){
    inquirer.prompt([
{
    type:"input",
    name:"MName",
    message:"What is the name of your Manager?"
},
{
    type:"input",
    name:"MID",
    message:"What is the Manager's ID?"
},
{
    type:"input",
    name:"Memail",
    message:"What is the Manager's email address?"
},
{
    type:"input",
    name:"MOfficeNumber",
    message:"What is the Manager's office number?"
},

    ])
    .then(answers =>{
        const Manager = new Manager(answers.MName, answers.MID, answers.Memail,answers.Mofficenumber)
        Team.push(Manager)
        Idnumbers.push(answers.MID)
        createTeam()
    })

}

function Engineer(){
    inquirer.prompt([
{
    type:"input",
    name:"EName",
    message:"What is the name of your Engineer?"
},
{
    type:"input",
    name:"EID",
    message:"What is the Engineer's ID?"
},
{
    type:"input",
    name:"Eemail",
    message:"What is the Engineer's email address?"
},
{
    type:"input",
    name:"Egithub",
    message:"What is the Engineer's github profile?"
},


    ])
    .then(answers =>{
        const engineer = new Engineer(answers.EName, answers.EID, answers.Eemail,answers.Egithub)
        Team.push(engineer)
        Idnumbers.push(answers.EID)
        createTeam()
    })

}

function Intern(){
    inquirer.prompt([
{
    type:"input",
    name:"IName",
    message:"What is the name of your Intern?"
},
{
    type:"input",
    name:"IID",
    message:"What is the Intern's ID?"
},
{
    type:"input",
    name:"Iemail",
    message:"What is the Intern's email address?"
},
{
    type:"input",
    name:"Ischool",
    message:"What is the Intern's school?"
},

    ])
    .then(answers =>{
        const Intern = new Intern(answers.IName, answers.IID, answers.Iemail,answers.Ischool)
        Team.push(Intern)
        Idnumbers.push(answers.IID)
        createTeam()
    })
}

function createTeam(){
    inquirer.prompt([
    {
        type:"list",
        name:"HRChoice",
        message:"Which type of team member do you want to add?",
        choices:["Engineer", "Intern", "Manager", "No one else"]
        }
    ])
    .then(userchoice =>{
        switch(userchoice.HRChoice){
            case"Engineer":
            Engineer()
            break
            case"Intern":
            Intern()
            break
            case"Manager":
            Manager()
            break
            default:
        }

    })
    function buildTeam() {
          if (!fs.existsSync(OUTPUT_DIR)) {
          fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
      }
}



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
