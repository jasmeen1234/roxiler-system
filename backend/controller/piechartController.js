import Product from "../model/productModel.js";

export const piechartController=async(req,res)=>{
    try {
        const { month } = req.query;
    
        if (!month) {
          return res.status(400).send({ error: 'Month parameter is required' });
        }
    
        // Parse the month parameter and ensure it's valid
        const [year, monthNumber] = month.split('-');
        if (!year || !monthNumber || isNaN(year) || isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
          return res.status(400).send({ error: 'Invalid month parameter. Format should be YYYY-MM' });
        }
    
        const startDate = new Date(year, monthNumber - 1, 1).toISOString(); // Start of the month
        const endDate = new Date(year, monthNumber, 0, 23, 59, 59, 999).toISOString(); // End of the month
    
        // Fetch products for the selected month
        const products = await Product.find({
          dateOfSale: {
            $gte: startDate,
            $lte: endDate
          }
        });
    
        // Count the number of items in each category
        const categoryCounts = products.reduce((acc, product) => {
          if (product.category in acc) {
            acc[product.category] += 1;
          } else {
            acc[product.category] = 1;
          }
          return acc;
        }, {});
    
        // Format the results
        const result = Object.keys(categoryCounts).map(category => ({
          category,
          count: categoryCounts[category]
        }));
    
        res.status(200).json(result);
      } catch (err) {
        res.status(500).send(err);
      }
    
}