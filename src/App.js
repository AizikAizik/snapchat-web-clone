import React from 'react';
import './App.css';
import WebcamCapture from './components/WebcamCapture';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Preview from './components/Preview';
import Chats from './components/Chats';
import ChatView from './components/ChatView';

function App() {
  return (
    <div className="app">
      <Router>
        <div className="app__body">
          <Switch>
            <Route path="/" exact>
              <WebcamCapture />
            </Route>
            <Route path="/preview">
              <Preview />
            </Route>
            <Route path="/chats/view">
              <ChatView />
            </Route>
            <Route path="/chats">
              <Chats />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
