const express = require("express");
const router = express.Router();
const {getContacts, createContact, updateContact, deleteContact, getContact}=require("../controllers/contactController")


router.route('/').get(getContacts);

router.route('/').post(createContact);

router.route('/:id').put(updateContact);

router.route('/:id').delete(deleteContact);


router.route('/:id').get(getContact);

module.exports=router