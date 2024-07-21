import Product from "../model/productModel.js";

export const  bulkInsert=async(data)=>{
  try{
    await Product.insertMany(data);
    console.log("Bulk inserted")
  }catch(e){
    console.log("error while inserting in bulk")
  }
   
}