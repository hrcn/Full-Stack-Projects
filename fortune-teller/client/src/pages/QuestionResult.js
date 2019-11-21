import React, { Component } from 'react';
import axios from 'axios';

// Material UI
import Container from '@material-ui/core/Container';

class QuestionResult extends Component {
    constructor() {
        super();
        this.state = {
            questionResult: ''
        }
    }

    componentDidMount() {
        axios.post('http://localhost:5000/api/questionresult')
        .then(response => {
            this.setState({questionResult: response.data})
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        return (
            <div>
                <Container>
                    <h1>{this.state.questionResult}</h1>
                </Container>
            </div>
        )
    }
}

export default QuestionResult;
