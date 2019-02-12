import React, { Component } from 'react';

import importFlavored from './importFlavored.macro'
importFlavored(Hello, "./hello")
// import Hello from './hello.green'

class App extends Component {
    render() {
        console.log("HEL - ", Hello)
        return (
            <div className="App">
                <Hello />
            </div>
        );
    }
}

export default App;