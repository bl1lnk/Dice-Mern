import React,{useState, useEffect} from 'react'
import { Container} from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Dashboard from './components/screens/Dashboard'

import LoginView from './components/screens/LoginView'
import RegisterView from './components/screens/RegisterView'
import History from './components/screens/History'
import  Chatglobal from './components/screens/Chatglobal'

const App = () => {

  return (
    <Router>
      <main className="py-3">
      <Container>
     

       <Route path='/login' component={LoginView} exact/>
          <Route path='/register' component={RegisterView} exact/>
          <Route path="/"  component={Dashboard} exact/>
          <Route path="/chat" component={Chatglobal} exact/>

        </Container>
      </main>
      
    </Router>
  )
}

export default App
