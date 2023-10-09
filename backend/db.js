const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://imayush:Ayush0123@cluster0.himdvv4.mongodb.net/?retryWrites=true&w=majority';

module.exports = async function (callback) {
    try {
        const connectionOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        await mongoose.connect(mongoURI, connectionOptions);

        console.log('Connected to MongoDB');

        const foodCollection = mongoose.connection.db.collection('food_items');
        const categoryCollection = mongoose.connection.db.collection('Categories');

        const [foodData, categoryData] = await Promise.all([
            foodCollection.find({}).toArray(),
            categoryCollection.find({}).toArray()
        ]);

        callback(null, foodData, categoryData);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        callback(error, null, null);
    }
};
