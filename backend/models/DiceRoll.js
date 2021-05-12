const mongoose = require ('mongoose')

const diceRollSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref: 'User',
        },
        bet_status : {
            type:Boolean,
            required:true,
            default:false,
        },
        rolledNumber : {
            type:Number ,
            required:true,
            default:0,
        },
        betAmount:{
            type:Number ,
            required:true,
        },
        Multiplier:{
            type:Number ,
            required:true
        }
    },
)

const DiceRoll = mongoose.model('DiceRoll', diceRollSchema)
//export default DiceRoll
module.exports = DiceRoll