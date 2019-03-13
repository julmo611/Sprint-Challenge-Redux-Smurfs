import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { getSmurfs } from '../actions/index'
import { addSmurf } from '../actions/index'
import uuidv4 from 'uuid'

/*
 to wire this component up you're going to need a few things.
 I'll let you do this part on your own. 
 Just remember, `how do I `connect` my components to redux?`
 `How do I ensure that my component links the state to props?`
 */
class App extends Component {
  state = {
    name: '',
    age: null,
    height: '',
    update: {},
  }
  componentDidMount() {
      this.props.getSmurfs()
  }

  handleChange = e => {
    const target = e.target
    const name = target.name
    const value =
        //eslint-disable-next-line
        target.name === 'age' ? parseInt(target.value) : target.value

    this.setState({
        [name]: value,
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.addSmurf(this.state)
    window.location.reload()
  }


  render() {
    return (
      <div className="App">
        {this.props.gettingSmurfs ? (
        <p>Loading...</p>
        ) : (
        <div>
          <div className="smurf-container">
            {this.props.smurfs.map(smurf => {
                return (
                  <div className="smurf-box" key={uuidv4()}>
                    <h3> {smurf.name}</h3>
                    <p><strong>Age:</strong> {smurf.age}</p>
                    <p><strong>Height:</strong> {smurf.height}</p>
                  </div>                     
                )
              })}                    
          </div>
           <form onSubmit={this.handleSubmit}>
            <h2>Add a New Smurf</h2>
              <input
                  type="text"
                  name="name"
                  placeholder="Smurf Name"
                  onChange={this.handleChange}
              />
              
              <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  onChange={this.handleChange}
              />
            
              <input
                  type="text"
                  name="height"
                  placeholder="Height"
                  onChange={this.handleChange}
              />
              <button type="submit" value="submit" >Add Smurf</button>
          </form>
          
         </div>
          )}
        {this.props.error !== '' ? <p>{this.props.error}</p> : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
      smurfs: state.smurfs,
      error: state.error,
      gettingSmurfs: state.gettingSmurfs,
      addingSmurf: state.addingSmurf,
  }
}

export default connect(
  mapStateToProps,
  { getSmurfs, addSmurf }
)(App)
