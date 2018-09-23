import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import Read from './components/Read'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/read" component={Read} />
    </div>
  </Router>,
  document.getElementById('root')
)
registerServiceWorker()
