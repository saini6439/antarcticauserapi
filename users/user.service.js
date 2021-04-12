const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const { response } = require('express');
const User = db.User;
const Employee = db.Employee;

module.exports = {
    authenticate,
    getById,
    getDetails,
    create
};

async function authenticate({ email, password }) {
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
        return {
            ...user.toJSON(),
            token
        };
    }
}





async function getById(id) {
    return await User.findById(id);

}

async function getDetails(query) {
    console.log(query)
    var pageNo = parseInt(query.pageNo)
    var size = parseInt(query.size)
  
    if(pageNo < 0 || pageNo === 0) {
        
          throw "invalid page number, should start with 1";
    }
    const sort_prop={"$sort" : { "employee_id" : 1, "firstName": 1,"organization":1,"lastName":1,"email":1} }
    const lookup_data={
        "$lookup": {
         "from": "employees",
         "localField": "employee_id",
         "foreignField": "employee_id",
         "as": "employee_detail"
       }}
    if(query.firstname&&query.lastname&&query.emp_id) {
        var responsedata = await User.aggregate([
            lookup_data,sort_prop,
            {$match: {
                firstName : query.firstname,
                lastName: query.lastname,
                employee_id: query.emp_id
                     }
                }
            ,
            sort_prop,
    
            ])
            var response = {"data" : responsedata};

        return response
    }
    else if(pageNo&&size){
        var totaldoc= await User.countDocuments();
        var totalPages = Math.ceil(totaldoc / size)
        var responsedata = await User.aggregate([
            lookup_data,sort_prop
            ,
            sort_prop,
             {$skip: size * (pageNo - 1)},
             {$limit: size},
    
            ])
            var response = {"data" : responsedata,"total pages": totalPages};

            return response
    }

    var responsedata = await User.aggregate([
        lookup_data,sort_prop,
        sort_prop
        ])

        var response = {"data" : responsedata};

        return response

}




async function create(userParam) {
    // validate
    if (await User.findOne({ email: userParam.email })) {
        throw 'email "' + userParam.email + '" is already taken';
    } 
    else if (await User.findOne({ employee_id: userParam.employee_id })) {
        throw ' Employee already "' + userParam.employee_id + '" is already taken';
    }

    const userdata={
        firstName: userParam.firstName,
        lastName: userParam.lastName,
        email: userParam.email,
        employee_id: userParam.employee_id,
        password: userParam.password,
      }
    
      const employeedata={
        employee_id: userParam.employee_id,
        organization:userParam.organization
      }

    const user = new User(userdata);
    const employee = new Employee(employeedata);


    // hash password
    if (userdata.password) {
        user.hash = bcrypt.hashSync(userdata.password, 10);
    }

    // save user
    await user.save();
    await employee.save(); 
}



