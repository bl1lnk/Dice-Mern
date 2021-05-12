const mongoose = require ('mongoose')

const historySchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref: 'User',
        },
         username:{
            type:String,
            required:true
        },
        Serverseed:{
            type:String,
            required:true
        },
        Clientseed:{
            type:String,
            required:true
        },
        Nonce:{
            type:Number,
            required:true
        },
        betAmount:{
            type:Number,
            required:true
        },
        Multiplier:{
            type:Number,
            required:true
        },
        rolledNumber:{
            type:Number,
            required: true,
        }
        ,
        Payout:{
            type:String,
            required:true
        },

        bet_status:{
            type:String,
            required:true
        },
        date: {
            type: Date,
            default: Date.now
        }
        

    },
)

const DiceRoll = mongoose.model('History', historySchema)
//export default DiceRoll

module.exports = DiceRoll