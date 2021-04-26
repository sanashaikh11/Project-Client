import './App.css';
import Navigation from './Navigation'
import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import About from './About'
import Dinos from './Dinos'
import NewHome from './NewHome'
import Login from './Login';
import AppTopBar from './AppTopBar';
import Footer from './Footer';
import ForgotPassword from './ForgotPassword';
import Question from './Question';
import AddQuestion from './AddQuestion';
import Tag from './Tag';
import Tags from './Tags';
import Category from './Category';
import AddTags from './AddTags';
import AddCategory from './AddCategory';
import Answer from './Answer';
import Jobs from './Jobs';
import Companies from './Companies';
import AddCompany from './AddCompany';
import AddJobs from './AddJobs';








function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppTopBar />
        <div style={{ minHeight: '500px' }}>
          <Switch>
            <Route path="/about" component={Dinos} />
            <Route path="/dinos" component={Dinos} />
            <Route path="/newhome" component={NewHome} />
            <Route path="/login" component={Login} />
            <Route path="/ForgotPassword" component={ForgotPassword} />
            <Route path="/question" component={Question} />
            <Route path="/add-question" component={AddQuestion} />
            <Route path="/answers/:id" exact component={Answer} />

            <Route path="/companies" exact component={Companies} />
            <Route path="/add-company" exact component={AddCompany} />
            <Route path="/edit-company/:id" exact component={AddCompany} />


            <Route path="/jobs" exact component={Jobs} />
            <Route path="/add-job" exact component={AddJobs} />
            <Route path="/edit-job/:id" exact component={AddJobs} />






            <Route path="/tag" component={Tag} />
            <Route path="/category" component={Category} />
            <Route path="/tags" component={Tags} />
            <Route path="/add-tag" component={AddTags} />
            <Route path="/add-category" component={AddCategory} />



          </Switch>
        </div>
        <div style={{ clear: 'both' }}>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
