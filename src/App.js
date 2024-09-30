import React from 'react';
import './App.css'; 
import GridLayout from './components/GridLayout';

const App = () => {
    return (
        <div className="App">
            <h1>Akhil's Shortest Path Finder</h1>
            <div className="warning">
                Depth-First Search (DFS) is generally not the most suitable algorithm for finding the shortest path in a grid. Please select BFS to find your shortest path precisely.
            </div>
            <GridLayout/>
        </div>
    );
};

export default App;
