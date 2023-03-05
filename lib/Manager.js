//create manager class with Employee.js as a base
const Employee = require("./Employee");
//create officenumber for employee
class Manager extends Eployee {
    construction(name, id, email, officeNum) {
        super(name, id, email);
        this.officeNumber = officeNum;
    }
    getOfficeNumber() {
        return this.officeNumber
    }

    getRole() {
        return "Manager";
    }
}

//export manager
module.exports = Manager