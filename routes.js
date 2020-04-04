const express = require('express');
const ITILRouter = express.Router();
const ITILController = require('./controller/Person');

ITILRouter.get('/get-Persons', ITILController.getRegisteredPersons);

ITILRouter.get('/get-Person/:PersonPK', ITILController.getPersonDetailsByPersonPK);

 ITILRouter.post('/add-PersonDetails', ITILController.postPersonDetails);

 ITILRouter.put('/edit-Person/:PersonPK', ITILController.putPersonDetails);

 ITILRouter.delete('/delete-Person/:PersonPK', ITILController.deletePersonDetails);


module.exports = ITILRouter;