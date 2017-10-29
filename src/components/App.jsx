import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Profile from './github/Profile.jsx';
import Search from './github/Search.jsx';

class App extends Component{
  constructor(props){
      super(props);
      this.state = {
        username: 'odedahay',
        userData: [],
        userRepos: [],
        perPage: 10
      }
  }

  // Get User datae from Github
  getUserData(){
    $.ajax({
      url: 'https://api.github.com/users/' +this.state.username+'?client_id='+this.props.clientId+'&client_sercret='+this.props.clientSecret,
      dataType:'json',
      cache: false,
      success: function(data){

        this.setState({userData:data});

      }.bind(this),
      error: function(xhr, status, err){

        this.setState({username: null});
        alert(err);

      }.bind(this)
    });
  }

  // Get User Repos from Github
  getUserRepos(){
    $.ajax({
      url: 'https://api.github.com/users/' +this.state.username+'/repos?per_page='+this.state.perPage+'&client_id='+this.props.clientId+'&client_sercret='+this.props.clientSecret+'&sort=created',
      dataType:'json',
      cache: false,
      success: function(data){

        this.setState({userRepos: data});
        console.log(data);

      }.bind(this),
      error: function(xhr, status, err){

        this.setState({username: null});
        alert(err);

      }.bind(this)
    });
  }

  handleFormSubmit(username){
    this.setState({username: username}, function() {
      this.getUserData();
      this.getUserRepos();
    });
  }

  componentDidMount(){
    this.getUserData();
    this.getUserRepos();
  }

  render(){
      return(
        <div>
          <Search onFormSubmit = {this.handleFormSubmit.bind(this)} />
          <Profile {...this.state} />
        </div>
      );
  }
}

//Homepage_URL: http://localhost:8080
//Authorization_callback_URL: http://localhost:8080/_oauth/github

// Application description

App.propTypes = {
  clientId: React.PropTypes.string,
  clientSecret: React.PropTypes.string
};
App.defaultProps = {
  clientId: '',
  clientSecret: ''
};

export default App;
