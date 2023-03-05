//defining the employee class
//create getName, getId, getEmail, getRole functions
//export the file
class Employee{
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }
    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getRole(){
        return "Employee";
    }
}

module.exports = Employee;