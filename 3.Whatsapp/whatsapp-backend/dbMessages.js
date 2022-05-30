import mongoose from "mongoose";

const whatsappschema=mongoose.Schema({ //schema-thats the structure in which the data is stored
    message:String,
    name:String,
    timestamp:String,
    received:Boolean
}
);
 //collection
export default mongoose.model('messagecontents', whatsappschema)