const asyncHandler=require('express-async-handler')
const Contact=require('../models/contactModels')

//@desc create new contact
//@route get contacts /api/contacts
//@access public
const getContacts=asyncHandler(async (req, res) => {
    const contacts=await Contact.find();
        res.status(200).json(contacts);
});

const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is :", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400);
      throw new Error("All fields are mandatory !");
    }
    
    const contact = await Contact.create(
        {
            name,
            email,
            phone
        }
    )
    res.status(201).json(contact);
  });
  
//@desc Update contacts
//@route put contact /api/contacts
//@access public
const updateContact=asyncHandler(async (req, res) => {

    const contact=await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact not found");
    }

    const updatedContact=await Contact.findByIdAndUpdate
    (req.params.id,
        req.body,
        {new:true}
        );

    res.status(200).json(updatedContact);
});

//@desc Delete contact
//@route Delete contact /api/contacts
//@access public
const deleteContact=asyncHandler(async (req, res) => {

    const contact=await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact not found");
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.status(201).json(contact);
});

//@desc Get  contact
//@route get contact /api/contact
//@access public
const getContact=asyncHandler(async (req, res) => {
    const contact=await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact not found");
    }

    res.status(200).json(contact);
});

module.exports={getContacts, createContact, updateContact, deleteContact, getContact}