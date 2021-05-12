const jwt =  require ('jsonwebtoken')
const generate = (id) => {
  return jwt.sign({ id }, process.env.SEC, {
    expiresIn: '30d',
  })
}
//export default generate
module.exports = generate
