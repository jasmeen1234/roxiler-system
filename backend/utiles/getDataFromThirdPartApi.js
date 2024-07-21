import axios from "axios";


export const fetchDataFromThirdPartyAPI=async()=>{
    try{
     let response= await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
     console.log("fetched data from third part API succesfully");
     return response.data;
    }catch(e){
        console.log("getting Error while fetched data from third part API",e)
    }
}