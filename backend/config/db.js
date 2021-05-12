const mongoose = require ('mongoose')

const connectDB =  async()=> {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/dice', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,})
        console.log(`connected :${conn.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}

//export default connectDB
module.exports = connectDB