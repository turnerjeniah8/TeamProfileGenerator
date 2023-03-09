const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRender");
const { listenerCount } = require("process");


const employees = [];
const addManagerNumber = "office number";
const addInternSchool = "school name";
const addEngineerUser = "github username";

let hireMoreMembers_g = "no";
let managersAdded = 0;

hireTeamMember();
async function hireTeamMember() {
    try {
        const { name } = await inquirer.prompt({
            message: "Name of Team Member :",
            name: "name",
        });

        let promptAgain = false;

        do {
            promptAgain = false;
            var { id } = await inquirer.prompt({
                message: "Id of Team Member :",
                name: "id",
            });
            if (isNaN(id)) {
                console.log("Not a number:", "Please provide a number for id");
                promptAgain = true;
            }
            if (employees.length > 0) {
                const sameId = employees.filter(function(empl) {
                    return id === empl.id;
                });
                if (sameId.length > 0) {
                    console.log("duplicate id", "provide unique employee id");
                    promptAgain = true;
                }
            }
        } while (promptAgain === true);

        const { email } = await inquirer.prompt({
            message: "Email of Team Member: ",
            name: "email",
        });
        const { role } = await inquirer.prompt({
            type: "list",
            message: "Role of Team Member: ",
            choices: ["Engineer", "Intern", "Manager"],
            name: "role",
        });

        let addlDetailMsg = "";
        if (role === "Engineer") {
            addlDetailMsg = "GitHub username: ";
        } else if (role === "Intern") {
            addlDetailMsg = "school name: ";
        } else {
            addlDetailMsg = "office phone number: ";
        }
        const { addlDetail } = await inquirer.prompt({
            message: `Enter team member's ${addlDetailMsg}`,
            name: "addlDetail",
        });

        const { hireMoreMembers } = await inquirer.prompt({
            type: "list",
            message: "Hire more Members: ",
            choices: ["yes", "no"],
            name: "hireMoreMembers",
        });
        hireMoreMembers_g = hireMoreMembers;
        switch (role) {
            case "Manager":
                if (managersAdded < 1) {
                    employees.push(new Manager(name, id, email, addlDetail));
                    managersAdded++;
                } else {
                    console.log("Only one Manager allowed in the team");
                }
                break;
            case "Engineer":
                employees.push(new Engineer(name, id, email, addlDetail));
                break;
            case "Intern":
                employees.push(new Intern(name, id, email, addlDetail));
                break;
        }
    } catch (err) {
        console.log(err);
    }
    if (hireMoreMembers_g == "yes") {
        hireTeamMember();
    } else {
        const html = render(employees);
        fs.writeFileSync(outputPath, html, "utf8");
        return;
    }
}