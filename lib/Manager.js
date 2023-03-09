//create manager class with Employee.js as a base
const Employee = require("./Employee");
//create officenumber for employee
class Manager extends Employee {
    construction(name, id, email, officeNum) {
        (name, id, email);
        this.officeNumber = officeNum;
    }
    getOfficeNumber() {
        return this.officeNumber
    }

    getRole() {
        return "Manager";
    }
}

module.exports = Manager;