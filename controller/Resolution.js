const sql=require('mssql');
const logger = require('../helper/logger');
const response=require('../response/index');
const config=require('../config/config');

// ResolutionPK	int
// RequestPK	int
// ResolutionCodePK	int
// ResolutionComment	nvarchar(200)
// ResolvedBy	nvarchar(30)
// ResolvedOn	datetime
// IsResolutionAccepted	bit
// ResolutionAcceptedBy	nvarchar(30)
// AcceptedOn	datetime
// IsReopened	bit




//Add Resolution details
exports.postResolutionDetails=(req,res)=>{
    (async function addResolutionDetails(){
        try{
                const RequestPK=req.body.RequestPK;
                const ResolutionCodePK=req.body.ResolutionCodePK;
                const ResolutionComment=req.body.ResolutionComment;
                const ResolvedBy=req.body.ResolvedBy;
                const ResolvedOn=req.body.ResolvedOn;
                const IsResolutionAccepted=req.body.IsResolutionAccepted;
                const ResolutionAcceptedBy=req.body.ResolutionAcceptedBy;
                const AcceptedOn=req.body.AcceptedOn;
                const IsReopened=req.body.IsReopened;

                const request=new sql.Request();
                const {recordset}=
                await request
                    .input('RequestPK',sql.Int,RequestPK)
                    .input('ResolutionCodePK',sql.Int,ResolutionCodePK)
                    .input('ResolutionComment',sql.NVarChar(200),ResolutionComment)
                    .input('ResolvedBy',sql.NVarChar(30),ResolvedBy)
                    .input('ResolvedOn',sql.DateTime,ResolvedOn)
                    .input('IsResolutionAccepted',sql.Bit,IsResolutionAccepted)
                    .input('ResolutionAcceptedBy',sql.NVarChar(30),ResolutionAcceptedBy)
                    .input('AcceptedOn',sql.DateTime,AcceptedOn)
                    .input('IsReopened',sql.Bit,IsReopened)
                 
                    .execute('SpPostResolutionDetails');
                res.json(response.success(null,"Successful Resolution registration"));
                
             }
        catch (error) {
            res.json(response.err("Something went wrong please try again"));
            logger.error('Error while addind Resolution details'+error);
           }
    }());

};

//Get registered Resolutions
exports.getRegisteredResolutions=(req,res)=>{
    (async function getResolutions(){
        try{
        const request=new sql.Request();
       const {recordset}=
       await request
       .execute('SpGetResolutionDetails');   
       console.log(request);
       res.json(recordset);
        }
       catch (error) {
        logger.error('Error in getting registered Resolutions ');
       }
      }()); 
};

//Get Resolution by ResolutionPK
exports.getResolutionDetailsByResolutionPK=(req,res)=>{
    (async function getResolutionByID(){
        try{
            const {ResolutionPK}=req.params;
            const request=new sql.Request();
            const {recordset}=
                 await request
                .input('ResolutionPK',sql.Int,ResolutionPK)
                .execute('SpGetResolutionDetailsByID');   
                if(recordset.length)   //for checking if record exists or not
                {
                    res.json(recordset);

                }
                else{
                    res.json(response.err("Record not found for this ID"));
                }
        }
       catch (error) {
        logger.error('Error in getting Resolution by ResolutionPK');
       }
      }()); 
};

//Edit Resolution details by ResolutionPK
exports.putResolutionDetails=(req,res)=>{
    (async function editUserDetails(){
        try{
        const {ResolutionPK}=req.params;
        const FirstName=req.body.FirstName;
        const MiddleName=req.body.MiddleName;
        const Email=req.body.Email;
        const MobileNo=req.body.MobileNo

        const request=new sql.Request();
         const {recordset}=
       await request
         .input('ResolutionPK',sql.Int,ResolutionPK)
         .input('RequestPK',sql.Int,RequestPK)
         .input('ResolutionCodePK',sql.Int,ResolutionCodePK)
         .input('ResolutionComment',sql.NVarChar(200),ResolutionComment)
         .input('ResolvedBy',sql.NVarChar(30),ResolvedBy)
         .input('ResolvedOn',sql.DateTime,ResolvedOn)
         .input('IsResolutionAccepted',sql.Bit,IsResolutionAccepted)
         .input('ResolutionAcceptedBy',sql.NVarChar(30),ResolutionAcceptedBy)
         .input('AcceptedOn',sql.DateTime,AcceptedOn)
         .input('IsReopened',sql.Bit,IsReopened)
         .execute('SpUpdateResolutionDetails');
         res.json(response.success(null,"Resolution details updated successfully"));
        }
        catch (error) {
                logger.error( "Error while editing Resolution details" +error);
            }
    }());

};


//Delete Resolution details
exports.deleteResolutionDetails=(req,res)=>{
    (async function deleteResolution(){
        try{

            const {ResolutionPK}=req.params;
            const request=new sql.Request();
            const {recordset}=
                 await request
                .input('ResolutionPK',sql.Int,ResolutionPK)
                .execute('SpDeleteResolutionDetails');
       res.json(response.success(null,"Resolution details deleted successfully"));
        }
       catch (error) {
        logger.error('Error while deleting Resolution'+error);
       }
      }()); 
};



