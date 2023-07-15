//@des get all contacts 
// @route GET/api/contact 
//@access Public
const asyncHandler =require('express-async-handler')
const contact= require('../models/contactModel');

const getContacts =asyncHandler( async(req,res)=>{
    const contacts = await contact.find();
    res.status(200).json(contacts)
    })
    //@des create all contacts 
// @route POST/api/contact 
//@access Public
const createContact = asyncHandler(async (req,res)=>{
    console.log('This rquest body is:',req.body)
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error('You must provide a this information')
    }
    const contacts = await contact.create({
        name,
        email,
        phone,
    });
    res.status(201).json(contacts)
    })
   //@des get contact
// @route GET/api/contact /:id
//@access Public
   const getContact=asyncHandler(async(req,res)=>{
    const contacts = await contact.findById(req.params.id);
    if(!contacts){
        res.status(404);
        throw new Error('Contact not found');
    }
    res.status(200).json(contacts)
    } )
   //@des Update contact
// @route Post/api/contact /:id
//@access Public
   const updateContact=asyncHandler(async(req,res)=>{
    const contacts = await contact.findById(req.params.id);
    if(!contacts){
        res.status(404);
        throw new Error('Contact not found');
    }

    const updateContact = await contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
        )
    res.status(200).json(updateContact)
    })
   //@des delete contact
// @route Delete/api/contact /:id
//@access Public
   const deleteContact=asyncHandler(async(req,res)=>{
    const contacts = await contact.findById(req.params.id);
    if(!contacts){
        res.status(404);
        throw new Error('Contact not found');
    }
    await contact.findOneAndDelete()
    res.status(200).json(contacts)
    })

    module.exports ={getContacts,createContact,getContact,updateContact,deleteContact}