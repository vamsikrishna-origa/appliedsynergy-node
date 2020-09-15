var api = {};
var products = require('./models/product');
var successResp = require('./respObj').successResp;
var errorResp = require('./respObj').errResp;

api.insertProducts = function (req, res) {
    var body = req.body;
    var productObj = {
        name: body.name,
        imageUrl: body.imageUrl || '',
        price: body.price,
        category: body.category,
        color: body.color
    }
    products.insertMany(productObj).then((doc) => {
        console.log(doc);
        successResp.message = 'Successfully Insterted the document';
        successResp.data = doc;
        res.json(successResp);
    }).catch((err) => {
        console.log(err);
        errorResp.message = err.message;
        res.json(errorResp);
    });
};

api.fetch = function (req, res) {
    var body = req.body;
    var searchFilter = {
        "$and": []
    };
    if (body.name) {
        searchFilter.$and.push({ name:{ $regex: body.name, $options: "i" }  });
    }
    if (body.category && body.category.length != 0) {
        searchFilter.$and.push({ category: { $in: body.category } })
    }
    if (body.color && body.color.length != 0) {
        searchFilter.$and.push({ color:{ $in: body.color } });
    }
    if (body.priceRange) {
        if (body.priceRange.maximum && body.priceRange.minimum) {
            searchFilter.$and.push({ price: { $lte: body.priceRange.maximum, $gte: body.priceRange.minimum } });
        }
        if (body.priceRange.minimum && !body.priceRange.maximum) {
            searchFilter.$and.push({ price: { $gte: body.priceRange.minimum } });
        }
        if (!body.priceRange.minimum && body.priceRange.maximum) {
            searchFilter.$and.push({ price: { $lte: body.priceRange.maximum } });
        }
    }

    searchFilter = searchFilter.$and.length ? searchFilter : {};

    console.log(JSON.stringify(searchFilter, null, 2));

    products.find(searchFilter).then((docs) => {
        //console.log(docs);
        successResp.message = 'Successfully Retrieved The Documents';
        successResp.data = docs;
        res.json(successResp);
    }).catch((err) => {
        console.log(err);
        errorResp.message = err.message;
        res.json(errorResp);
    })
}

module.exports = api;