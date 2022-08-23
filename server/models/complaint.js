import mongoose from 'mongoose';

const complaintSchema = mongoose.Schema({
  username: {type: String, required: true},
  type: {type: String, required: true},
  description: {type: String,required: true},
  area: {type: String,required: true},
 
})

var Complaint = mongoose.model('Complain', complaintSchema);

export default Complaint;