import Product from "../model/productModel.js";
export const transationController=async(req,res)=>{
    try {
        const { search = '', page = 1, perPage = 10 } = req.query;
        const pageNumber = parseInt(page, 10);
        const perPageNumber = parseInt(perPage, 10);
    
        // Create the search query
        const searchQuery = {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { price: { $regex: search, $options: 'i' } }
          ]
        };
    
        // Calculate the skip value for pagination
        const skip = (pageNumber - 1) * perPageNumber;
    
        // Fetch the products with search and pagination
        const products = await Product.find(search ? searchQuery : {})
          .skip(skip)
          .limit(perPageNumber);
    
        // Count total products for pagination
        const totalProducts = await Product.countDocuments(search ? searchQuery : {});
    
        res.status(200).json({
          products,
          currentPage: pageNumber,
          totalPages: Math.ceil(totalProducts / perPageNumber),
          totalProducts
        });
      } catch (err) {
        res.status(500).send(err);
      }
}