import Product from "../model/productModel.js";

export const barchartController = async (req, res) => {
    try {
        const { month } = req.query;

        if (!month) {
            return res.status(400).send({ error: 'Month parameter is required' });
        }

        const monthNumber = parseInt(month, 10);

        // Define price ranges
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

        // Initialize counts for each range
        const rangeCounts = priceRanges.map(range => ({
            range: `${range.min} - ${range.max === Infinity ? 'above' : range.max}`,
            count: 0
        }));

        // Fetch products for the selected month across all years
        const products = await Product.find({
            $expr: {
                $eq: [{ $month: "$dateOfSale" }, monthNumber]
            }
        });

        console.log(`Found ${products.length} products for the month: ${month}`);

        // Count the number of items in each price range
        products.forEach(product => {
            const price = parseFloat(product.price);
            const rangeIndex = priceRanges.findIndex(range => price >= range.min && price <= range.max);
            if (rangeIndex !== -1) {
                rangeCounts[rangeIndex].count += 1;
            }
        });

        res.status(200).json(rangeCounts);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};
