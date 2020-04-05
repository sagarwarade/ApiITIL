const express = require('express');
const ITILRouter = express.Router();
const RequestStatusController = require('./controller/RequestStatus');
const ResolutionController = require('./controller/Resolution');

ITILRouter.get('/get-RequestStatus', RequestStatusController.getRegisteredRequestStatus);

ITILRouter.get('/get-RequestStatus/:RequestStatusPK', RequestStatusController.getRequestStatusDetailsByRequestStatusPK);

 ITILRouter.post('/add-RequestStatusDetails', RequestStatusController.postRequestStatusDetails);

 ITILRouter.put('/edit-RequestStatus/:RequestStatusPK', RequestStatusController.putRequestStatusDetails);

 ITILRouter.delete('/delete-RequestStatus/:RequestStatusPK', RequestStatusController.deleteRequestStatusDetails);


ITILRouter.get('/get-Resolutions', ResolutionController.getRegisteredResolutions);

ITILRouter.get('/get-Resolution/:ResolutionPK', ResolutionController.getResolutionDetailsByResolutionPK);

 ITILRouter.post('/add-ResolutionDetails', ResolutionController.postResolutionDetails);

 ITILRouter.put('/edit-Resolution/:ResolutionPK', ResolutionController.putResolutionDetails);

 ITILRouter.delete('/delete-Resolution/:ResolutionPK', ResolutionController.deleteResolutionDetails);


module.exports = ITILRouter;