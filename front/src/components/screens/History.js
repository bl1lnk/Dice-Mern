import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {rollDice, listHistory} from '../../actions/diceActions'
import Message from '../Message'
import Loading from '../Loading'
import smallBtc from './images/smallBtc.png'

const History = () => {
  const dispatch = useDispatch()
  const historyList = useSelector(state => state.historyList)
  const {errorlhr, loadinglhr,rollbet} = historyList
  console.log(rollbet)
  
  useEffect(() => {
    dispatch(listHistory())
 
  }, [dispatch])
    return (
        <>
          <nav className="navbar navbar-expand-lg navbar-light ">
                    <div className="collapse navbar-collapse" id="navbarNav">
                      <ul className="navbar-nav">
                        <li className="nav-item active">
                          <a className="nav-link" href="#">my bets <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#">all bets</a>
                        </li>
                      </ul>
                    </div>
                  </nav>
       
                  <table className="table table-dark" id="historyTable">
             
                    <thead>
                      <tr>
                        <th scope="col">game</th>
                        <th scope="col">hour</th>
                        <th scope="col">bet</th>
                        <th scope="col">Multiplier</th>
                        <th scope="col">Payment</th>
                      </tr>
                    </thead>
                    <tbody>


                    {loadinglhr ? (<Loading ></Loading>) : errorlhr ?
                             (<Message variant='danger text-center'>{errorlhr}</Message>)
                              :(rollbet) ? (<>
                                {rollbet.map((bet)=>(
                                  <tr>
                                  <th scope="row"><svg id="icon-stake-game-dice" width="25" fill="white" viewBox="0 0 32 32">
                                      <path d="M28.067 7.613l-9.827-5.68c-0.643-0.377-1.415-0.6-2.24-0.6s-1.597 0.223-2.261 0.612l0.021-0.011-9.76 5.68c-0.78 0.412-1.308 1.208-1.333 2.13l-0 0.003v12.2c0 0.002 0 0.004 0 0.006 0 1.105 0.6 2.070 1.492 2.587l0.014 0.008 9.56 5.52c0.643 0.377 1.415 0.6 2.24 0.6s1.597-0.223 2.261-0.612l-0.021 0.011 9.56-5.52c0.929-0.513 1.551-1.483 1.56-2.599v-12.201c-0.011-0.912-0.514-1.705-1.254-2.127l-0.012-0.006zM9.013 21.84c-0.733 0.093-1.453-0.92-1.6-2.253s0.32-2.48 1.053-2.56 1.453 0.92 1.6 2.253-0.307 2.48-1.053 2.56zM16.107 11.173c-1.4 0-2.533-0.6-2.533-1.333s1.133-1.333 2.533-1.333 2.533 0.6 2.533 1.333-1.133 1.28-2.533 1.28zM16.107 6.307c-1.4 0-2.533-0.587-2.533-1.333s1.133-1.333 2.533-1.333 2.533 0.6 2.533 1.333-1.133 1.28-2.533 1.28zM22.227 24.8c-0.267 1.253-1.040 2.147-1.733 1.987s-1.040-1.333-0.76-2.533 1.040-2.147 1.733-2 1.040 1.24 0.76 2.493zM22.227 18.013c-0.267 1.253-1.040 2.147-1.733 2s-1.040-1.333-0.76-2.547 1.040-2.147 1.733-1.987 1.040 1.227 0.76 2.48zM27.107 22.013c-0.267 1.253-1.053 2.147-1.747 2s-1.027-1.333-0.76-2.547 1.053-2.147 1.747-1.987 1.027 1.253 0.76 2.507zM27.107 15.227c-0.267 1.253-1.053 2.147-1.747 2s-1.027-1.333-0.76-2.533 1.053-2.147 1.747-2 1.027 1.253 0.76 2.507z"></path>
                                      </svg>Dice</th>
                                  <td>00:00 AM</td>
                                  <td>{bet.betAmount}     <img src={smallBtc}  width="20"/>  </td>
                                  <td>{bet.Multiplier}×</td>
                                  <td>{bet.Payout} <img src={smallBtc} width="20" /> </td>
                                </tr>
       
                             ))}</>) :""
                              
                                }

                   
                     

                    
                      
                    </tbody>
                  </table>
        </>
    )
}

export default History
