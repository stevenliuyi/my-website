import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import asyncComponent from './components/AsyncComponent'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import registerServiceWorker from './registerServiceWorker'
import 'react-app-polyfill/ie11'

const Read = asyncComponent(() => import('./components/Read'))
const Resume = asyncComponent(() => import('./components/Resume'))
const Portfolio = asyncComponent(() => import('./components/Portfolio'))

ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/read" component={Read} />
        <Route exact path="/resume" component={Resume} />
        <Route exact path="/portfolio" component={Portfolio} />
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
      </Switch>
    </div>
  </Router>,
  document.getElementById('root')
)
registerServiceWorker()
