import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             name: '',
             gender: '',
             age: ''
        }
    }
    
    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    handleGenderChange = (event) => {
        this.setState({
            gender: event.target.value
        })
    }

    handleAgeChange = (event) => {
        this.setState({
            age: event.target.value
        })
    }

    handleSubmit = (event) => {
        alert('Form submitted!')
        event.prevetDefault() // prevent page refresh after submit
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Name: </label>
                    <input 
                        type='text' 
                        value={this.state.name} 
                        onChange={this.handleNameChange}
                    />
                </div>
                <div>
                <label>Gender: </label>
                    <select value={this.state.gender} onChange={this.handleGenderChange}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div>
                <label>Age: </label>
                    <input 
                        type='number' 
                        value={this.state.age} 
                        onChange={this.handleAgeChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default Form;