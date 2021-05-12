const mongoose = require ('mongoose')

const provabilitySchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref: 'User',
        },
        Clientseed : {
            type:String,
            required:true,
            default:'clienseed123',
        },
        Serverseed : {
            type:String,
            required:true,
            default:'server123',
        },
        NextServerseed : {
            type:String,
            required:true,
            default:'serv54',
        },
        Nonce:{
            type:Number,
            required:true,
            default:0,
        },
    },
)

const Provability = mongoose.model('Provability', provabilitySchema)
//export default Provability

module.exports = Provability