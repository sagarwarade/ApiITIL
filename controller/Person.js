const sql=require('mssql');
const logger = require('../helper/logger');
const response=require('../response/index');
const config=require('../config/config');

// PersonPK	int
// FirstName	nvarchar(30)
// MiddleName	nvarchar(30)
// LastName	nvarchar(30)
// Gender	char(10)
// DOB	date
// CreatedOn	date
// CreatedBy	nvarchar(30)
// IsActive	bit
// DeactivatedOn	date
// DeactivatedBy	nvarchar(30)
// DeactivationReason	nvarchar(200)


//Add Person details
exports.postPersonDetails=(req,res)=>{
    (async function addPersonDetails(){
        try{
                const FirstName=req.body.FirstName;
                const MiddleName=req.body.MiddleName;
                const LastName=req.body.LastName;
                const Gender=req.body.Gender;
                const DOB=req.body.DOB;
                const CreatedOn=req.body.CreatedOn
                const CreatedBy=req.body.CreatedBy
                const IsActive=req.body.IsActive
                const DeactivatedOn=req.body.DeactivatedOn
                const DeactivatedBy=req.body.DeactivatedBy
                const DeactivationReason=req.body.DeactivationReason

                const request=new sql.Request();
                const {recordset}=
                await request
                    .input('FirstName',sql.NVarChar(30),FirstName)
                    .input('MiddleName',sql.NVarChar(30),MiddleName)
                    .input('LastName',sql.NVarChar(30),LastName)
                    .input('Gender',sql.Char(10),Gender)
                    .input('DOB',sql.Date,DOB)
                    .input('CreatedOn',sql.Date,CreatedOn)
                    .input('CreatedBy',sql.NVarChar(30),CreatedBy)
                    .input('IsActive',sql.Bit,IsActive)
                    .input('DeactivatedOn',sql.Date,DeactivatedOn)
                    .input('DeactivatedBy',sql.NVarChar(30),DeactivatedBy)
                    .input('DeactivationReason',sql.NVarChar(200),DeactivationReason)
                    .execute('SpPostPersonDetails');
                res.json(response.success(null,"Successful Person registration"));
                
             }
        catch (error) {
            res.json(response.err("Something went wrong please try again"));
            logger.error('Error while addind Person details'+error);
           }
    }());

};

//Get registered Persons
exports.getRegisteredPersons=(req,res)=>{
    (async function getPersons(){
        try{
        const request=new sql.Request();
       const {recordset}=
       await request
       .execute('SpGetPersonDetails');   
       console.log(request);
       res.json(recordset);
        }
       catch (error) {
        logger.error('Error in getting registered Persons ');
       }
      }()); 
};

//Get Person by PersonPK
exports.getPersonDetailsByPersonPK=(req,res)=>{
    (async function getPersonByID(){
        try{
            const {PersonPK}=req.params;
            const request=new sql.Request();
            const {recordset}=
                 await request
                .input('PersonPK',sql.Int,PersonPK)
                .execute('SpGetPersonDetailsByID');   
                if(recordset.length)   //for checking if record exists or not
                {
                    res.json(recordset);

                }
                else{
                    res.json(response.err("Record not found for this ID"));
                }
        }
       catch (error) {
        logger.error('Error in getting Person by PersonPK');
       }
      }()); 
};

//Edit Person details by PersonPK
exports.putPersonDetails=(req,res)=>{
    (async function editUserDetails(){
        try{
        const {PersonPK}=req.params;
        const FirstName=req.body.FirstName;
        const MiddleName=req.body.MiddleName;
        const Email=req.body.Email;
        const MobileNo=req.body.MobileNo

        const request=new sql.Request();
         const {recordset}=
       await request
         .input('PersonPK',sql.Int,PersonPK)
         .input('FirstName',sql.NVarChar(50),FirstName)
         .input('MiddleName',sql.NVarChar(50),MiddleName)
         .input('Email',sql.NVarChar(50),Email)
         .input('MobileNo',sql.NVarChar(12),MobileNo)
         .execute('SpUpdatePersonDetails');
         res.json(response.success(null,"Person details updated successfully"));
        }
        catch (error) {
                logger.error( "Error while editing Person details" +error);
            }
    }());

};


//Delete Person details
exports.deletePersonDetails=(req,res)=>{
    (async function deletePerson(){
        try{

            const {PersonPK}=req.params;
            const request=new sql.Request();
            const {recordset}=
                 await request
                .input('PersonPK',sql.Int,PersonPK)
                .execute('SpDeletePerson');
       res.json(response.success(null,"Person details deleted successfully"));
        }
       catch (error) {
        logger.error('Error while deleting Person'+error);
       }
      }()); 
};



