const sql=require('mssql');
const logger = require('../helper/logger');
const response=require('../response/index');
const config=require('../config/config');

   
//Add employee details
exports.postEmployeeDetails=(req,res)=>{
    (async function addEmployeeDetails(){
        try{
                const Fname=req.body.Fname;
                const Lname=req.body.Lname;
                const Email=req.body.Email;
                const MobileNo=req.body.MobileNo

                const request=new sql.Request();
                const {recordset}=
                await request
                    .input('Fname',sql.NVarChar(50),Fname)
                    .input('Lname',sql.NVarChar(50),Lname)
                    .input('Email',sql.NVarChar(50),Email)
                    .input('MobileNo',sql.NVarChar(12),MobileNo)
                    .execute('SpSaveEmployeeDetails');
                res.json(response.success(null,"Successful employee registration"));
                
             }
        catch (error) {
            res.json(response.err("Something went wrong please try again"));
            logger.error('Error while addind employee details'+error);
           }
    }());

};

//Get registered employees
exports.getRegisteredEmployees=(req,res)=>{
    (async function getEmployees(){
        try{
        const request=new sql.Request();
       const {recordset}=
       await request
       .execute('SpGetEmployeesDetails');   
       res.json(recordset);
        }
       catch (error) {
        logger.error('Error in getting registered employees ');
       }
      }()); 
};

//Get employee by EmpID
exports.getEmployeeDetailsByEmpID=(req,res)=>{
    (async function getEmployeeByID(){
        try{
            const {EmpID}=req.params;
            const request=new sql.Request();
            const {recordset}=
                 await request
                .input('EmpID',sql.Int,EmpID)
                .execute('SpGetEmployeeDetailsByEmpID');   
                if(recordset.length)   //for checking if record exists or not
                {
                    res.json(recordset);

                }
                else{
                    res.json(response.err("Record not found for this ID"));
                }
        }
       catch (error) {
        logger.error('Error in getting employee by EmpID');
       }
      }()); 
};

//Edit employee details by EmpID
exports.putEmployeeDetails=(req,res)=>{
    (async function editUserDetails(){
        try{
        const {EmpID}=req.params;
        const Fname=req.body.Fname;
        const Lname=req.body.Lname;
        const Email=req.body.Email;
        const MobileNo=req.body.MobileNo

        const request=new sql.Request();
         const {recordset}=
       await request
         .input('EmpID',sql.Int,EmpID)
         .input('Fname',sql.NVarChar(50),Fname)
         .input('Lname',sql.NVarChar(50),Lname)
         .input('Email',sql.NVarChar(50),Email)
         .input('MobileNo',sql.NVarChar(12),MobileNo)
         .execute('SpUpdateEmployeeDetails');
         res.json(response.success(null,"Employee details updated successfully"));
        }
        catch (error) {
                logger.error( "Error while editing employee details" +error);
            }
    }());

};


//Delete employee details
exports.deleteEmployeeDetails=(req,res)=>{
    (async function deleteEmployee(){
        try{

            const {EmpID}=req.params;
            const request=new sql.Request();
            const {recordset}=
                 await request
                .input('EmpID',sql.Int,EmpID)
                .execute('SpDeleteEmployeeDetails');
       res.json(response.success(null,"Employee details deleted successfully"));
        }
       catch (error) {
        logger.error('Error while deleting employee'+error);
       }
      }()); 
};



