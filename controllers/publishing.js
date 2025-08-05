const jwt= require("jsonwebtoken");
const bcrypt= require("bcrypt");
const Published= require("../model/templateAuth");
require("dotenv").config();

const fetchPublished= async(req,res)=>{
   try {

    const user= await Published.find({})
    // console.log(user);

    res.status(200).json(user)
   } catch (error) {
    res.status(403).send("something went wrong fetching templates")
   }
} 
const fetchSinglePublished= async(req,res)=>{
  const {email,publisherId}= req.body;
  const {template}= req.params;
  console.log(req.params); 
  try {
    if(template){
      const user= await Published.findOne({templateName:template})
      if(!user){
       return res.status(404).send("no published template for this user!");
   
      }

      console.log({ userPublished: [user] });
      res.status(200).json({ userPublished: [user] });
    }else{
      res.status(403).json({msg:"no template name provided!!!"})
    }

  } catch (error) {
   res.status(500).send("network error, try checking your network connection")
  }
}
const publishTemplate = async (req, res) => {
  try {
    // Check if templateName already exists
    const exists = await Published.findOne({ templateName: req.body.templateName });
    if (exists) {
      return res.status(400).json({ msg: "Document with this template name already exists" });
    }

    if (!req.body.publisherId) {
      return res.status(400).json("can't publish template at the moment, please try again later!");
    }

    // Create new document
    let newUser = { ...req.body };
    const published = await Published.create(newUser);

    res.status(200).json(published);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error (just in case)
      return res.status(400).json({ msg: "Document with this template name already exists" });
    }
    res.status(500).json({ msg: "Network error, check network connection please" });
  }
};

const deletePublishedTemplate = async (req, res) => {
  try {
    const { templateName } = req.params;

    if (!templateName) {
      return res.status(400).json({ msg: "Template name is required" });
    }

    const deleted = await Published.findOneAndDelete({ templateName });

    if (!deleted) {
      return res.status(404).json({ msg: `No template found with name: ${templateName}` });
    }

    res.status(200).json({ msg: `Template '${templateName}' deleted successfully` });
  } catch (error) {
    console.error("Delete template error:", error);
    res.status(500).json({ msg: "Server error while deleting template" });
  }
};


module.exports= {publishTemplate,deletePublishedTemplate,fetchPublished,fetchSinglePublished}