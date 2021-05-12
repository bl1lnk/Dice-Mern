const User = require ('../models/user.js')
const provability = require ('../models/provability.js')
const DiceRoll =require ('../models/DiceRoll.js')
const Provability =require ('../models/provability.js')
const asyncHandler =require ('express-async-handler')
const generate =require ('../utils/generateToken.js')
const crypto =require ('crypto')
const History =require ('../models/History.js')




const getResult = hashedValue => {
    // the offset of the interval
    let index = 0;
    // result variable
    let result;
  
    do {
      // get the decimal value require an interval of 5 hex letters
      result = parseInt(hashedValue.substring(index * 5, index * 5 + 5), 16);
      // increment the offset in case we will need to repeat the operation above
      index += 1;
      // if all the numbers were over 999999 and we reached the end of the string, we set that to a default value of 9999 (99 as a result)
      if (index * 5 + 5 > 129) {
        result = 9999;
        break;
      }
    } while (result >= 1e6);
    // the result is between 0-999999 and we need to convert if into a 4 digit number
    // we a apply a modulus of 1000 and the 4 digit number is further split into a 2 digit number with decimals
    return [result % 1e4] * 1e-2;
  };

  


const rollDice = asyncHandler(async (req, res) => {
    //Provability.find({user:req.user._id})
    const user = await User.findById(req.user._id)
    let {chance, betAmount} = req.body 
    chance = parseInt(chance)
    betAmount = parseInt(betAmount)
    const provability = await Provability.find({user:req.user._id})
    const ServerSeed = provability[0].Serverseed
    const ClientSeed = provability[0].Clientseed
    let Nonce = provability[0].Nonce
    const combination = ServerSeed + ClientSeed + Nonce

    const hash = crypto.createHash('sha512')
                 .update(combination)
                 .digest('hex');
  // depend onroll over value

    let rolledNumber = getResult(hash)
    rolledNumber = rolledNumber.toFixed(2)
     let bet_status
     let profit
     let balance
     let multiplier = 0
     if(rolledNumber <= chance){
     multiplier = 100/chance
     profit = ((betAmount* multiplier)-betAmount).toFixed(8)
     bet_status= true
     balance = user.balance + parseInt(profit)
     console.log('balance on profit '+ balance)
     user.balance = balance
     user.save()
     }else{
      balance = user.balance - betAmount
      user.balance = balance
      console.log('balance on lose '+ balance)
      user.save()
      bet_status= false
     }
     const bet = await DiceRoll.create({user:req.user._id, bet_status, rolledNumber, Multiplier:multiplier, betAmount: betAmount})
    if(bet){
        res.json(bet)
        const nonce = provability[0].Nonce
        provability[0].Nonce = nonce+1
        provability[0].save()
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })

  
  const createHistory = asyncHandler(async (req, res) => {
    const {bet_id} = req.body
    const user = await User.findById(req.user._id)
    const provability = await Provability.find({user:req.user._id})
    const bet = await DiceRoll.findById(bet_id)
  
    const payout= (bet.betAmount) * bet.Multiplier
    
 const history = await History.create({user:req.user._id, 
                                    username:user.name,
                                    Serverseed:provability[0].Serverseed,
                                    Clientseed:provability[0].Clientseed,
                                    Nonce: provability[0].Nonce,
                                    betAmount: (bet.betAmount).toFixed(8),
                                    Multiplier: (bet.Multiplier).toFixed(2),
                                    rolledNumber: bet.rolledNumber,
                                    Payout: (payout).toFixed(8),
                                    bet_status: bet.bet_status,
                                    })
    res.json(history)
  })


  const listHistory= asyncHandler(async(req,res)=>{
    const historyLists = await History.find({user:req.user._id}).sort({date:-1}).limit(20)

    res.json(historyLists)

  })
  module.exports = {rollDice, createHistory, listHistory}
  //export {rollDice, createHistory, listHistory}