import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';
import swal from 'sweetalert'

class MovieEdit extends Component {

    state={
        edits: {
            title: '',
            description: ''
        },
        select: {
          newGenre: 1
        }
    }

    componentDidMount=()=>{
      this.getGenres();
      this.getConnections();
      this.getSpecifics();
    }
  
    getGenres=()=>{
      this.props.dispatch({type: 'GET_GENRES'});
    }

    getConnections=()=>{
      this.props.dispatch({type: 'GET_COMBOS'});
    }

    goHome=()=>{
      this.props.history.push('/')
    }

    removeMe=(row)=>{
      this.props.dispatch({type: 'REMOVE_COMBO', payload: row});
      this.getSpecifics();
    }

    getSpecifics=()=>{
      this.props.dispatch({type: 'GET_SPECIFICS', payload: this.props.location.state.id});
    }

    addNewGenre=()=>{
      console.log('add new genre:', this.state.select, this.props.location.state.id);
      this.props.dispatch({
        type: 'ATTACH_GENRE', 
        payload: {
          newGenreId: {
            sendGenre: this.state.select, 
            sendMovie: this.props.location.state.id
          }
        }
      });
      this.getSpecifics();
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

    handleChangeSelect=(propertyName, event)=>{
        console.log(propertyName, event.target.value);
        this.setState({
            ...this.state,
            select:{
            newGenre: event.target.value
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
        <div className="edit">
          <div className="editColumnOne">
            <div className="posterDisplay" key={this.props.location.state.id}>
                <img className="poster" alt="poster" src={this.props.location.state.poster} />
            </div>
          </div>
          <div className="editColumnTwo">
            <table className="genreList">
              <thead>
                <tr>
                  <th>Genres</th>
                  <th></th>
                </tr>
              </thead>
              {this.props.reduxState.comboReducer && (
                <tbody>
              {this.props.reduxState.specificReducer.map(genre => (
                  <tr className="genreList" key={genre.id}>
                    <td>{genre.name}</td>
                    <td><button className="removeButton" onClick={()=>this.removeMe(genre.id)}>remove</button></td>
                  </tr>
                  ))}
                </tbody>
                )}
            </table>
          </div>
        </div>
          <div className="editColumnThree">
            <select className="genreList" >
              {this.props.reduxState.genreReducer.map(dropdown => { 
                  return <option dropdown={dropdown} key={dropdown.id} value={dropdown.id} onClick={(event) => this.handleChangeSelect(dropdown.id, event)}>
                      {dropdown.name} </option>;
                  })
              }
            </select>
            <br/>
            <button className="genreButton" onClick={(event)=>this.addNewGenre(event)}>
              Add New Genre
            </button>
          </div>
        <br/>
          <div className="editBelow">
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
      </div>
    );
  }
}

const putReduxStateOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxStateOnProps)(MovieEdit);