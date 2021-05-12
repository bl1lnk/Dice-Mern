import React, {useEffect, useState} from 'react'
import "./dashboardStyles.css";
import diceLogo from './images/diceLogo.svg'
import smallBtc from './images/smallBtc.png'
import startRolling from './audio/startRolling.mp3'
import win from './audio/win.mp3'
import barchange from './audio/barchange.mp3'
import {Howl, Howler} from 'howler'
import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux'
import {getProvabilityDetails, changeProvability} from '../../actions/provabilityActions'
import {Form} from 'react-bootstrap'
import Message from '../Message'
import Loading from '../Loading'
import {rollDice, createHistory, listHistory} from '../../actions/diceActions'
import {getUserDetails} from '../../actions/userAction'
import History from './History'
import Chatglobal from './Chatglobal'
const Dashboard = () => {

  

    const dispatch = useDispatch()
    const provList = useSelector((state) => state.provabilityDetail)
    const {loadingpdr,provability, errorpdr} = provList

    const rollList = useSelector((state) => state.rollBet)
    const {loadingrbr,rollbet, errorrbr} = rollList

    const profileDetailList = useSelector(state => state.userDetail)
    const {loadingudr, errorudr, user} = profileDetailList

    const rollLists = JSON.parse(localStorage.getItem('rollsList')) || [];
    const listItems = rollLists.map((number) =>
    <li key={number} id="rollLi">{number}</li>
  );


    useEffect(()=>{
     dispatch(getUserDetails('profile'))
     dispatch(getProvabilityDetails('provability'))
     dispatch(listHistory())
    },[dispatch, rollDice])


    const audioclips = [
      {sound: startRolling,},
      {sound: win},
      {sound:barchange},
    ]
    const  SoundPlay = (src)=> {
      const sound = new Howl({
        src
      })
      sound.play()
    }
  

    const [diceBar, setDiceBar] = useState(50)
    const [betAmount, setBetAmount] = useState(0)
    const [profitAmount, setProfitAmount] = useState(0)
    const [newSeed, SetNewSeed] = useState('ABCD123')
    const [lastbetAnimation, setLastbetAnimation] = useState("50")

    const diceBarHandler = (e)=>{
        setDiceBar(e.target.value)
        SoundPlay(audioclips[2].sound)
        document.getElementById('slider').style.background=`linear-gradient(to right, #1FFF20 ${diceBar}%, #FF1F44 0%)`;  
    }

    const betAmountHandler = (e)=> {
      setBetAmount(e.target.value)
      const multiplier =(100/diceBar).toFixed(2)
      const winAmount =e.target.value*multiplier
      setProfitAmount(winAmount.toFixed(8))
    }


   const RollDiceHandler = (e)=> {
   
      e.preventDefault();

      dispatch(rollDice(diceBar, betAmount))
      
  

      SoundPlay(audioclips[0].sound)

      function myFunction() {
        setTimeout(()=>{
          dispatch(getUserDetails('profile'))
          dispatch(listHistory())
          }, 500);
      }
      myFunction()

    }

    
  
   const provabilityMenuHandlerSeed= ()=>{

     $('.provability-verify').hide()
     $('.wrap-provability-setting').show();
     document.getElementById('seeds').style.color="#0069D9"
     document.getElementById('verify').style.color="#fff"
    }
   const provabilityMenuHandlerVerify = ()=>{
    $('.wrap-provability-setting').hide();
    $('.provability-verify').show()
    document.getElementById('seeds').style.color="#fff"
    document.getElementById('verify').style.color="#0069D9"
   }

 /* Form Handler */
  const newSeedHandler  = (e) =>{
    e.preventDefault()
    dispatch(changeProvability(newSeed))
    dispatch(getProvabilityDetails('provability'))
  }

  const [Result, setResult] = useState('0')

  const animateDice = (result)=>{
    setTimeout(() => {
      const betNumber=localStorage.getItem('betNumber')
      ? JSON.parse(localStorage.getItem('betNumber'))
      : null

      if(rollbet){
        $("#diceResult").css({
          "left": `${rollbet.rolledNumber}%`
      }).animate({
          "left": `${betNumber.rolledNumber}%`
      }, "fast");
    }
    dispatch(createHistory(betNumber._id))
    }, 500);
 


   
    
  }
  const newSeedInputHandler =(e)=>{
    SetNewSeed(e.target.value)
  }

  function SaveDataToLocalStorage(data)
{
    var a = [];
    // Parse the serialized data back into an aray of objects
    a = JSON.parse(localStorage.getItem('rollsList')) || [];
    // Push the new data (whether it be an object or anything else) onto the array
    a.push(data);
    // Alert the array value

    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem('rollsList', JSON.stringify(a));
}

 
    return (
        <>
        <div className="row">

        <div className="col-sm-9" id="app" className="ex1">

            <nav className="navbar navbar-expand-lg">
                <div className="container" >
                  <a className="navbar-brand" href="#">Dice</a>
         
               
                 
                  <div className="collapse navbar-collapse" id="navbarResponsive">
                  <button className="btn btn-primary" id="wallet"> wallet</button>
                    <div className="dropdown price-drop-drown-centered">
                      <button className="btn btn-secondary dropdown-toggle" type="button" id="balance" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">  
                      {loadingudr ? (<Loading ></Loading>) : errorudr ?
                             (<Message variant='danger text-center'>{errorudr}</Message>)
                              : user ?(user.balance ): "..."
                                }
                                <img src={smallBtc}  width="20"/> 
                      </button>
                    
                      <div className="dropdown-menu" id="balanceMenu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#"> 0.00000001 doge</a>
                        <a className="dropdown-item" href="#"> 0.00000001 eth</a>
                        <a className="dropdown-item" href="#">0.00000001 ltc</a>
                      </div>
                    </div>
               
                    <ul className="navbar-nav ml-auto">
        
                      <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i id="userIcon" className="fas fa-user"></i> 
                        </a>
                        <div className="dropdown-menu"  id="profileMenu"aria-labelledby="navbarDropdown">
                          <a className="dropdown-item" href="#">Welcome,    {loadingudr ? (<Loading ></Loading>) : errorudr ?
                             (<Message variant='danger text-center'>{errorudr}</Message>)
                              : user ? (user.name ): "..."
                                }</a>
                          <a className="dropdown-item" href="#">Another action</a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="#">Logout</a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>

        
                <div className="row" id="wrapFulldice">
                    <div className="col-sm-3" id="betSetting">
                      
                          <form action="" id="formsetting" onSubmit={(e)=>RollDiceHandler(e)}> 
                    
                              <button id="manuel"> Manuel</button>
                              <div>
                                <span id="betSettingText">Bet Amount </span>
                                <input id="number" type="number" value={betAmount} step="0.00000001" onChange={(e)=>betAmountHandler(e)} />
                                <span id="shortCutBalanceEditor"> ½</span><span id="shortCutBalanceEditor">2x</span> 
                              </div>
                              <div>
                                <span id="betSettingText" >Win Profit  </span>
                                <input id="betamount" type="text"  value={profitAmount} readonly />
                              </div>
                             
                              {loadingrbr ? (<Loading width={5}></Loading>) : errorrbr ?
                             (<Message variant='danger text-center'>{errorrbr}</Message>)
                              :  
                              (<input type="submit" className="btn btn-bet" value="Bet"  onClick={()=>animateDice(rollbet.rolledNumber)}/> )}
                             
                                 
                             {loadingrbr ? (<Loading width={5}></Loading>) : errorrbr ?
                             (<Message variant='danger text-center'>{errorrbr}</Message>)
                              :
                               ( localStorage.setItem('betNumber', JSON.stringify(rollbet)))
                            
                       
                                }
                             
                          </form>
                          
                    </div>
                    <div className="col-sm-9" id="dicewrap">
                             <div id="scrollingBets">
                                <ul id="rollList">   
                            
                                </ul>
                               </div>
                      <div className="dice">
                        <div className="diceResult" id="diceResult">
                            <img src={diceLogo} width="50" id="resultImage"/>
                            <span className="resultText" id="resultText">{loadingrbr ? (<Loading width={5}></Loading>) : errorrbr ?
                             (<Message variant='danger text-center'>{errorrbr}</Message>)
                              :
                               (rollbet.rolledNumber)
                            
                       
                                }</span>

                                
                        </div>
                        <div className="dice-border">
                            <span id="zero">0</span>
                            <span id="twentyfive">25</span>
                            <span id="fifty">50</span>
                            <span id="seventyfive">75</span>
                            <span id="oneHundred">100</span>
                            <input className="slider" id="slider"
                             type="range"
                              min="0.01"
                              max="98"
                              step="0.1"
                              value={diceBar}
                              onChange={(e)=>diceBarHandler(e)}
                              />



                        </div>
                    </div>
                        <div id="betFooterSettingsWrap">
                            <div className="row" id="betFooterSettings">

                            
                          
                                <div className="col-sm-4">
                                    <span>Multiplier</span>
                                    <div><input type="number" value={(100/diceBar).toFixed(2)} /></div>
                                </div>
                                <div className="col-sm-4">
                                    <span>Bet on low</span>
                                    <div><input type="type" value={diceBar} readonly /></div>
                                </div>
                                <div className="col-sm-4">
                                    <span>Chance</span>
                                    <div><input type="number" value={diceBar} /></div>
                                </div>
                            </div>
                        </div>
                    </div>
          
                    <div className="col-sm-12">
                        <h5 id="provability" data-toggle="modal" data-target="#exampleModal"><i className="fas fa-balance-scale"></i>Provability</h5>
                    
                        
    
                        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div className="modal-dialog" role="document" >
                            <div className="modal-content" id="provability">
                              <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">fairness</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body" > 
                                {/* provability Fair*/}
                                    <span id="seeds" onClick={provabilityMenuHandlerSeed}>Seeds </span> <span id="verify" onClick={provabilityMenuHandlerVerify}>Verify</span>
                                   <div class="wrap-provability-setting">
                                     <div class="provability-container">
                                       <div class="provability-row" id="provability-info">
                                            <div class="Clientseed py-2">

                                                <label for="Clientseed">Active Client Seed</label>
                                                {loadingpdr ? (<Loading></Loading>) : errorpdr ? (<Message variant='danger text-center'>{errorpdr}</Message>) :( <Form.Control id="provabilityInput" class="form-control" type="text"  value={provability.Clientseed} readOnly />)}
                                            </div>
                                            <div class="Serverseed py-1">
                                                <label for="Serverseed">Active Server Seed (Hashed)</label>
                                                {loadingpdr ? (<Loading></Loading>) : errorpdr ? (<Message variant='danger text-center'>{errorpdr}</Message>) :( <Form.Control id="provabilityInput" class="form-control" type="text"  value={provability.Serverseed} readOnly />)}
                                            </div>
                                            <div class="Nonce py-2">
                                                <label for="Nonce">Total bets made with pair</label>
                                                {loadingpdr ? (<Loading></Loading>) : errorpdr ? (<Message variant='danger text-center'>{errorpdr}</Message>) :( <Form.Control id="provabilityInput" class="form-control" type="text"  value={provability.Nonce} readOnly />)}
                                            </div>
                                       </div>
                                       <div class="provability-row" id="provability-input">
                                         <h5 class="py-3">Rotate Seed Pair</h5>

                                           
                          


                                          <form onSubmit={(e)=>newSeedHandler(e)}>
                                          <div class="Serverseed py-1">
                                                <label for="Serverseed">New Client Seed</label>
                                               <input id="provabilityInput"className="form-control"  type="text" onChange={(e)=> newSeedInputHandler(e)} value={newSeed} /><input  type="submit" className="btn btn-success" value="Change"/>
                                            </div>
                                          <div class="Serverseed py-1">
                                                <label for="Serverseed">Next Server Seed (Hashed)</label>
                                                {loadingpdr ? (<Loading></Loading>) : errorpdr ? (<Message variant='danger text-center'>{errorpdr}</Message>) :( <Form.Control id="provabilityInput" class="form-control" type="text"  value={provability.NextServerseed} readOnly />)}
                                            </div>
                                          </form>
                                       </div>
                                     </div>
                                   </div>
                                    <div class="provability-verify provability-container">

                                    </div>
                        
                              </div>
                              <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                     
                              </div>
                            </div>
                          </div>
                        </div>

                    </div>

                  </div>

            
         
              <div id="history">
               <History />

                  
                  <table className="table table-dark" id="historyTable" id="allHistory">
                  
                    <thead>
                      <tr>
                        <th scope="col">game</th>
                        <th scope="col">hour</th>
                        <th> user</th>
                        <th scope="col">bet</th>
                        <th scope="col">Multiplier</th>
                        <th scope="col">Payment</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row"><svg id="icon-stake-game-dice" width="25" fill="white" viewBox="0 0 32 32">
                            <path d="M28.067 7.613l-9.827-5.68c-0.643-0.377-1.415-0.6-2.24-0.6s-1.597 0.223-2.261 0.612l0.021-0.011-9.76 5.68c-0.78 0.412-1.308 1.208-1.333 2.13l-0 0.003v12.2c0 0.002 0 0.004 0 0.006 0 1.105 0.6 2.070 1.492 2.587l0.014 0.008 9.56 5.52c0.643 0.377 1.415 0.6 2.24 0.6s1.597-0.223 2.261-0.612l-0.021 0.011 9.56-5.52c0.929-0.513 1.551-1.483 1.56-2.599v-12.201c-0.011-0.912-0.514-1.705-1.254-2.127l-0.012-0.006zM9.013 21.84c-0.733 0.093-1.453-0.92-1.6-2.253s0.32-2.48 1.053-2.56 1.453 0.92 1.6 2.253-0.307 2.48-1.053 2.56zM16.107 11.173c-1.4 0-2.533-0.6-2.533-1.333s1.133-1.333 2.533-1.333 2.533 0.6 2.533 1.333-1.133 1.28-2.533 1.28zM16.107 6.307c-1.4 0-2.533-0.587-2.533-1.333s1.133-1.333 2.533-1.333 2.533 0.6 2.533 1.333-1.133 1.28-2.533 1.28zM22.227 24.8c-0.267 1.253-1.040 2.147-1.733 1.987s-1.040-1.333-0.76-2.533 1.040-2.147 1.733-2 1.040 1.24 0.76 2.493zM22.227 18.013c-0.267 1.253-1.040 2.147-1.733 2s-1.040-1.333-0.76-2.547 1.040-2.147 1.733-1.987 1.040 1.227 0.76 2.48zM27.107 22.013c-0.267 1.253-1.053 2.147-1.747 2s-1.027-1.333-0.76-2.547 1.053-2.147 1.747-1.987 1.027 1.253 0.76 2.507zM27.107 15.227c-0.267 1.253-1.053 2.147-1.747 2s-1.027-1.333-0.76-2.533 1.053-2.147 1.747-2 1.027 1.253 0.76 2.507z"></path>
                            </svg>Dice</th>
                        <td>00:00</td>
                        <th> Guest</th>
                        <td>0.0000001 <image src="images/small-btc.png" width="20" /> </td>
                        <td>1,94×</td>
                        <td>0.0000002 <image src="images/small-btc.png" width="20" /></td>
                      </tr>
                      
                    </tbody>
                  </table>
              </div>
        </div>

       <Chatglobal  username={user}/>
        
    </div>


            
        </>
    )
}

export default Dashboard
