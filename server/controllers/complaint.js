
import ComplaintModel from "../models/complaint.js";


export const addComplaint = async (req, res) => {
  try {
    const {  username, type , area, description } = req.body;
    const complaints = await ComplaintModel.create({username, type , area, description })
    res.status(200).json( complaints );
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getComplaint = async (req, res) => {

  try {
    const data = await ComplaintModel.find();
    res.status(200).json( data );
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const editComplaint = async (req, res) => {
  try {
    const {  username, type , area, description   } = req.body;
    const { id } = req.params;
    console.log(id)
    const updateComplaint = {
      username, type , area, description 
    }

    const editedComplaint = await ComplaintModel.findByIdAndUpdate(id,updateComplaint,{ new: true });
    res.status(200).json({ editedComplaint });

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" })
  }
}

export const deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    await ComplaintModel.findByIdAndDelete(id)
    res.status(200).json({ message: "User Deleted" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" });
  }
}




