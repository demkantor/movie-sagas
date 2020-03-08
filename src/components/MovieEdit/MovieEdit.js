import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';
import swal from 'sweetalert'

class MovieEdit extends Component {

    state={
        edits: {
            title: '',
            description: ''
        }
    }

    goHome=()=>{
      this.props.history.push('/')
    }
    
  editThis=(text, id)=>{
      swal({
        title: "Are you sure? Once edit is submitted it is forever!",
        text: `NEW TITLE: ${text.edits.title}. NEW DESCRIPTION: ${text.edits.description}`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willEdit) => {
        if (willEdit) {
          swal("And just like that you are now an editor!", {
            icon: "success",
          });
          this.props.dispatch({ type: "EDIT_TITLE", payload: {sendId: id, change: text} });
          this.props.history.goBack();
        } else {
          swal("Keeping you safe, heading back to detail page!");
          this.props.history.goBack();
        }
      });

  }

  handleChangeFor=(propertyName, event)=>{
    this.setState({
        edits: {
          ...this.state.edits,
          [propertyName]: event.target.value
        }
      })
  }
    
  render() {
    // console.log('in edit', this.props.location.state)
    return (
      <div className="movieEdit">
        <button className="homeButton" onClick={this.goHome}>
            Home
        </button>
        <h1 className="title">
            Curent Title: {this.props.location.state.title}
        </h1>
        <div className="posterDisplay" key={this.props.location.state.id}>
            <img className="poster" alt="poster" src={this.props.location.state.poster} />
        </div>
        <h3 className="title" >Current Description:</h3>
        <div className="descriptionEdit">
            {this.props.location.state.description}
        </div>
        <button className="editButton" onClick={() => this.editThis(this.state, this.props.location.state.id)}>
            Submit Edit
        </button>
        <form className="edit">
            <textarea placeholder={this.props.location.state.title} onChange={(event) => this.handleChangeFor('title', event)}/>
                 <br/>
            <textarea className="largeEdit" placeholder={this.props.location.state.description} onChange={(event) => this.handleChangeFor('description', event)}/>
       </form>
      </div>
    );
  }
}

export default connect()(MovieEdit);