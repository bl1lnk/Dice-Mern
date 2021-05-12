const express = require ('express')
const {
  authUser,
  registerUser,
  getUserProfile,
  provabilityDetail,
  provabilityChange,
}  = require ('../controllers/userController.js')
const {createHistory, rollDice, listHistory} = require( '../controllers/DiceController.js')

const { guard } = require ('../middleware/authMidleware.js')

const router = express.Router()
router.route('/register').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(guard, getUserProfile)
router.route('/provability').get(guard, provabilityDetail)
router.route('/changeProvability').post(guard, provabilityChange)
router.route('/rollDice').post(guard, rollDice)
router.route('/createHistoryBet').post(guard, createHistory)
router.route('/listHistory').get(guard,listHistory)

//export default router
module.exports = router
