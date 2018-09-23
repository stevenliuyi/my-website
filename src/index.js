import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import Read from './components/Read'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/read" component={Read} />
      {/* redirect to https://go.yliu.io for shortened URLs */}
      <Route
        path="/:id"
        component={({ match }) => (
          <Helmet>
            <meta
              http-equiv="refresh"
              content={`0;URL=https://go.yliu.io/${match.params.id}`}
            />
          </Helmet>
        )}
      />
    </div>
  </Router>,
  document.getElementById('root')
)
registerServiceWorker()
