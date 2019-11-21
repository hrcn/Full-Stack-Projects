import React, { Component } from 'react';
import axios from 'axios';

class QuestionResult extends Component {
    constructor() {
        super();
        this.state = {
            questionResult: ''
        }
    }

    componentDidMount() {
        const config = {
            headers: {'Access-Control-Allow-Origin': '*'}
        };

        axios.post('http://localhost:5000/api/newquestion', config)
        .then(response => {
            console.log(response)
            this.setState({questionResult: response.data})
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        const {questionResult} = this.state

        return (
            <div>
                <h1>{questionResult}</h1>
            </div>
        )
    }
}

export default QuestionResult;
