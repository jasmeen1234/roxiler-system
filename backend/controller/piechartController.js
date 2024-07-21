import Product from "../model/productModel.js";

export const piechartController = async (req, res) => {
    try {
        const { month } = req.query;

        if (!month) {
            return res.status(400).send({ error: 'Month parameter is required' });
        }

        const monthNumber = parseInt(month, 10);

        // Fetch products for the selected month across all years
        const products = await Product.find({
            $expr: {
                $eq: [{ $month: "$dateOfSale" }, monthNumber]
            }
        });

        console.log(`Found ${products.length} products for the month: ${month}`);

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
        console.error(err);
        res.status(500).send(err);
    }
};
