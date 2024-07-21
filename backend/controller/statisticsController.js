import Product from "../model/productModel.js";
export const statisticsController=async(req,res)=>{
    try {
        const { month } = req.query;
    
        if (!month) {
          return res.status(400).send({ error: 'Month parameter is required' });
        }
    
        const startDate = new Date(month);
        const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0, 23, 59, 59, 999);
    
        // Calculate total sale amount of the selected month
        const totalSaleAmount = await Product.aggregate([
          {
            $match: {
              sold: true,
              dateOfSale: {
                $gte: startDate,
                $lte: endDate
              }
            }
          },
          {
            $group: {
              _id: null,
              totalAmount: { $sum: "$price" }
            }
          }
        ]);
    
        // Calculate total number of sold items of the selected month
        const totalSoldItems = await Product.countDocuments({
          sold: true,
          dateOfSale: {
            $gte: startDate,
            $lte: endDate
          }
        });
    
        // Calculate total number of not sold items of the selected month
        const totalNotSoldItems = await Product.countDocuments({
          sold: false,
          dateOfSale: {
            $gte: startDate,
            $lte: endDate
          }
        });
    
        res.status(200).json({
          totalSaleAmount: totalSaleAmount[0] ? totalSaleAmount[0].totalAmount : 0,
          totalSoldItems,
          totalNotSoldItems
        });
      } catch (err) {
        res.status(500).send(err);
      }
}