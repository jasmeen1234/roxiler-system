import Product from "../model/productModel.js";

const getStatistics = async (startDate, endDate) => {
    const products = await Product.find({
      dateOfSale: {
        $gte: startDate,
        $lte: endDate
      }
    });
  
    const totalSaleAmount = products.reduce((acc, product) => {
      return acc + (product.sold ? parseFloat(product.price) : 0);
    }, 0);
  
    const soldItemsCount = products.filter(product => product.sold).length;
    const notSoldItemsCount = products.filter(product => !product.sold).length;
  
    return {
      totalSaleAmount,
      soldItemsCount,
      notSoldItemsCount
    };
  };
  
  // Helper function to get bar chart data
  const getBarChartData = async (startDate, endDate) => {
    const products = await Product.find({
      dateOfSale: {
        $gte: startDate,
        $lte: endDate
      }
    });
  
    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Infinity }
    ];
  
    const rangeCounts = priceRanges.map(range => ({
      range: `${range.min} - ${range.max === Infinity ? 'above' : range.max}`,
      count: 0
    }));
  
    products.forEach(product => {
      const price = parseFloat(product.price);
      const rangeIndex = priceRanges.findIndex(range => price >= range.min && price <= range.max);
      if (rangeIndex !== -1) {
        rangeCounts[rangeIndex].count += 1;
      }
    });
  
    return rangeCounts;
  };
  
  // Helper function to get pie chart data
  const getPieChartData = async (startDate, endDate) => {
    const products = await Product.find({
      dateOfSale: {
        $gte: startDate,
        $lte: endDate
      }
    });
  
    const categoryCounts = products.reduce((acc, product) => {
      if (product.category in acc) {
        acc[product.category] += 1;
      } else {
        acc[product.category] = 1;
      }
      return acc;
    }, {});
  
    return Object.keys(categoryCounts).map(category => ({
      category,
      count: categoryCounts[category]
    }));
  };
  

export const combinedController =async(req,res)=>{
    try {
        const { month } = req.query;
    
        if (!month) {
          return res.status(400).send({ error: 'Month parameter is required' });
        }
    
        const [year, monthNumber] = month.split('-');
        if (!year || !monthNumber || isNaN(year) || isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
          return res.status(400).send({ error: 'Invalid month parameter. Format should be YYYY-MM' });
        }
    
        const startDate = new Date(year, monthNumber - 1, 1).toISOString(); // Start of the month
        const endDate = new Date(year, monthNumber, 0, 23, 59, 59, 999).toISOString(); // End of the month
    
        // Fetch data from all three APIs
        const [statistics, barChartData, pieChartData] = await Promise.all([
          getStatistics(startDate, endDate),
          getBarChartData(startDate, endDate),
          getPieChartData(startDate, endDate)
        ]);
    
        // Combine results
        const combinedResponse = {
          statistics,
          barChartData,
          pieChartData
        };
    
        res.status(200).json(combinedResponse);
      } catch (err) {
        res.status(500).send(err);
      }
    
}