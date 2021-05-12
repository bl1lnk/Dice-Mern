const User =require ('../models/user.js')
const Provability =require ('../models/provability.js')
const asyncHandler =require ('express-async-handler')
const generate =require ('../utils/generateToken.js')
const crypto= require ('crypto')

// provability

function randomString(length) {
  const availableChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = '';
  for(let i = 0; i < length; i++) {
    randomString += availableChars[Math.floor(Math.random() * availableChars.length)];
  }
  return randomString;
}

// hash server seed
const sha512 = string =>
  crypto
    .createHash('sha512')
    .update(string)
    .digest('hex');


//generate server seed

const ClientSeed = randomString(30)
const ServerSeed = crypto.randomBytes(256).toString('hex');
const Nonce = 0
const Clientseed = randomString(30)
const Serverseed = crypto.randomBytes(256).toString('hex');
const NextServerseed = crypto.randomBytes(256).toString('hex');

const combination = ServerSeed + ClientSeed + Nonce

const hash = crypto.createHash('sha512')
                 .update(combination)
                 .digest('hex');






const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generate(user._id),
      balance: user.balance,
      lastclaim :user.lastclaim,
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or Password')
  }
})

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      balance: (user.balance).toFixed(8),

    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})


const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  
  const user = await User.findOne({ email })
  if(user) {
    res.status(400)
    throw new Error('user already exists')
  }
  const createdUser = await User.create({ name, email, password })
  const provability = await Provability.create({user:createdUser._id, Clientseed, Serverseed, NextServerseed})

  if (createdUser) {
    res.json({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      lastclaim: createdUser.lastclaim,

    })

  } else {
    res.status(400)
    throw new Error('invalid user data')
  }
})



const provabilityDetail = asyncHandler(async(req,res)=>{

  const provability = await Provability.find({user:req.user._id})
 if(provability){
    res.json({
      _id: provability[0].user,
      Clientseed: provability[0].Clientseed,
      Serverseed: sha512(provability[0].Serverseed),
      NextServerseed:sha512( provability[0].NextServerseed),
      Nonce: provability[0].Nonce,
    })
  }
})

const provabilityChange = asyncHandler(async(req,res)=>{
  const GServerseed = crypto.randomBytes(256).toString('hex');
  const GNextServerseed = crypto.randomBytes(256).toString('hex');
  const provability = await Provability.find({user:req.user._id})
  const {newseed} = req.body
  
  provability[0].Clientseed = newseed
  provability[0].Serverseed = GServerseed
  provability[0].NextServerseed = GNextServerseed
  provability[0].Nonce = 0
  provability[0].save()
  if(provability){
      res.json({
        msg: "seed changed succesfuly"
      })
  }
})



/*export {
    registerUser,
    authUser,
    getUserProfile,
    provabilityDetail,
    provabilityChange,
  }
*/
module.exports ={
  registerUser,
  authUser,
  getUserProfile,
  provabilityDetail,
  provabilityChange,
}
