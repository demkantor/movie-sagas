import React, {Component} from 'react';
import '../App/App.css';
import swal from 'sweetalert';

class Header extends Component {
  

  adminLogIn=()=>{
    swal({
      content: {
        element: "input",
        attributes: {
          placeholder: "User Name",
          type: "password",
        },
      },
    }).then(function (username){
        if(username !== 'camera'){
          swal("sorry, wrong username");
      }else{
        swal({
              content: {
                element: "input",
                attributes: {
                  placeholder: "Type your password",
                  type: "password",
                },
              },
            }).then(function (pass) {  
              if(pass !== 'action'){
                swal("sorry, wrong username or password");
              }else{
                swal("Welcome!", "We have been waiting for you!", "success");
                this.props.history.push('/admin');
              }
          });
      }
    })  
  }
    
  render() {
    console.log('in header', this.props.history)
    return (
      <div className="header">
       <span><h1>Next Flicks</h1>
        <img src="/images/admin.png" alt="admin" className="adminIcon" onClick={this.adminLogIn} />
        </span> 
      </div>
    );
  }
}

export default Header;