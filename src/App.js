import React, { Component } from 'react';
// import Hello from './hello.green'
// import Hello from './hello.white'
import Hello from './hello'
import gemmafy from './gemmafy.macro'

class App extends Component {
    render() {
        console.log(gemmafy("this is a pup load of mistakes"))
        return (
            <div className="App">
                <Hello />
            </div>
        );
    }
}

export default App;
