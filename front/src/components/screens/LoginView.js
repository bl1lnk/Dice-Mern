import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import "./loginStyles.css";
import {login} from '../../actions/userAction'

const LoginView = ({location, history}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
  
    const { loading, error, userInfo } = userLogin
    const redirect = location.search ? location.search.split('=')[1] : '/'
    useEffect(() => {
      if (userInfo) {
        history.push(redirect)
      }
    }, [history, userInfo, redirect])
    const connect = (e) => {
      e.preventDefault()
      dispatch(login(email, password))
    }

    return (
        <>
             <header>

    <nav className="navbar navbar-expand-lg  fixed-top">
        <div className="container" >
          <a className="navbar-brand" href="#">Dice</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home
                      <span className="sr-only">(current)</span>
                    </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Register</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">FAQ</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
 </header>
 <div className="main">
        <div className="container">
            <div className="row" id="login">
                <div className="col-sm-6" id="wallpaper">
                </div>
                <div className="col-sm-6" >
                    <h2> Connexion </h2>
                   <div className="container centered">
                    <form onSubmit={connect}>
                        <div className="form-group">
                          <label for="exampleInputEmail1">Email address</label>
                          <input type="email" className="form-control"
                             id="exampleInputEmail1"
                             aria-describedby="emailHelp"
                             placeholder="Enter email"
                             value={email}
                             onChange={(e) => setEmail(e.target.value)}
                               />
                          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                          <label for="exampleInputPassword1">Password</label>
                          <input type="password"
                           className="form-control"
                            id="exampleInputPassword1"
                             placeholder="Password"
                             value={password}
                             onChange={(e) => setPassword(e.target.value)}
                             />
                        </div>
                      
                        <button type="submit" className="btn btn-primary">Submit</button>
                      </form>

                   </div>
                </div>
            </div>
          </div>
    </div>
            
        </>
    )
}

export default LoginView
