import Product from "../model/productModel.js"
import { bulkInsert } from "../utiles/default.js";
import { fetchDataFromThirdPartyAPI } from "../utiles/getDataFromThirdPartApi.js";

export const productController=async(req,res)=>{
    try{
        let dataFromDB=await Product.find({});

        if(dataFromDB.length ===0){
           let data=await fetchDataFromThirdPartyAPI();
           await bulkInsert(data);
           return res.status(200).json(data);
        }else{
            let data=await Product.find({});
            return res.status(200).json(data);
        }


    }catch(e){
        console.log("Error while ",e)
    }
}