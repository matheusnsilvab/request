const mongoose = require('mongoose')

const connectToDb = () => {
    mongoose.connect(
        'mongodb+srv://oimatth_:1799@menu.oageq82.mongodb.net/?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useunifiedtopology: true,
        }
    ).then(() => console.log('MongoDB Atlas CONECTADO!'))
        .catch((err) => console.log(err))
}

module.exports = connectToDb;