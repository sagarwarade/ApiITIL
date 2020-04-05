const sql=require('mssql');
const logger = require('../helper/logger');
const response=require('../response/index');
const config=require('../config/config');




//Add RequestStatus details
exports.postRequestStatusDetails=(req,res)=>{
    (async function addRequestStatusDetails(){
        try{
                const RequestPK=req.body.RequestPK;
                const StatusCodePK=req.body.StatusCodePK;
                const Comment=req.body.Comment;
                const IsActive=req.body.IsActive;
                const UpdatedBy=req.body.UpdatedBy;
                const UpdatedOn=req.body.UpdatedOn;

                const request=new sql.Request();
                const {recordset}=
                await request
                    .input('RequestPK',sql.Int,RequestPK)
                    .input('StatusCodePK',sql.Int,StatusCodePK)
                    .input('Comment',sql.NVarChar(500),Comment)
                    .input('IsActive',sql.Bit,IsActive)
                    .input('UpdatedBy',sql.NVarChar(30),UpdatedBy)
                    .input('UpdatedOn',sql.DateTime,UpdatedOn)
                   
                    .execute('SpPostRequestStatusDetails');
                    logger.info("data inserted successfully")
                res.json(response.success(null,"Successful RequestStatus registration"));
                
             }
        catch (error) {
            res.json(response.err("Something went wrong please try again"));
            logger.error('Error while addind RequestStatus details'+error);
           }
    }());

};

//Get registered RequestStatus
exports.getRegisteredRequestStatus=(req,res)=>{
    (async function getRequestStatus(){
        try{
        const request=new sql.Request();
       const {recordset}=
       await request
       .execute('SpGetRequestStatusDetails');   
       console.log(request);
       res.json(recordset);
        }
       catch (error) {
        logger.error('Error in getting registered RequestStatus ');
       }
      }()); 
};

//Get RequestStatus by RequestStatusPK
exports.getRequestStatusDetailsByRequestStatusPK=(req,res)=>{
    (async function getRequestStatusByID(){
        try{
            const {RequestStatusPK}=req.params;
            const request=new sql.Request();
            const {recordset}=
                 await request
                .input('RequestStatusPK',sql.Int,RequestStatusPK)
                .execute('SpGetRequestStatusDetailsByID');   
                if(recordset.length)   //for checking if record exists or not
                {
                    res.json(recordset);

                }
                else{
                    res.json(response.err("Record not found for this ID"));
                }
        }
       catch (error) {
        logger.error('Error in getting RequestStatus by RequestStatusPK');
       }
      }()); 
};

//Edit RequestStatus details by RequestStatusPK
exports.putRequestStatusDetails=(req,res)=>{
    (async function editUserDetails(){
        try{
        const {RequestStatusPK}=req.params;
        const RequestPK=req.body.RequestPK;
        const StatusCodePK=req.body.StatusCodePK;
        const Comment=req.body.Comment;
        const IsActive=req.body.IsActive;
        const UpdatedBy=req.body.UpdatedBy;
        const UpdatedOn=req.body.UpdatedOn
       
        const request=new sql.Request();
         const {recordset}=
       await request
         .input('RequestStatusPK',sql.Int,RequestStatusPK)
         .input('RequestPK',sql.Int,RequestPK)
         .input('StatusCodePK',sql.Int,StatusCodePK)
         .input('Comment',sql.NVarChar(500),Comment)
         .input('IsActive',sql.Bit,IsActive)
         .input('UpdatedBy',sql.NVarChar(30),UpdatedBy)
         .input('UpdatedOn',sql.DateTime,UpdatedOn)
       
         .execute('SpUpdateRequestStatusDetails');
         res.json(response.success(null,"RequestStatus details updated successfully"));
        }
        catch (error) {
                logger.error( "Error while editing RequestStatus details" +error);
            }
    }());

};


//Delete RequestStatus details
exports.deleteRequestStatusDetails=(req,res)=>{
    (async function deleteRequestStatus(){
        try{

            const {RequestStatusPK}=req.params;
            const request=new sql.Request();
            const {recordset}=
                 await request
                .input('RequestStatusPK',sql.Int,RequestStatusPK)
                .execute('SpDeleteRequestStatusDetails');
       res.json(response.success(null,"RequestStatus details deleted successfully"));
        }
       catch (error) {
        logger.error('Error while deleting RequestStatus'+error);
       }
      }()); 
};



