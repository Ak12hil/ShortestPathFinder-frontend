import React, { useState } from 'react';
import axios from 'axios';
import './GridLayout.css';

const GridLayout = () => {
    const rows = 20;
    const cols = 20;
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [path, setPath] = useState([]);
    const [algorithm, setAlgorithm] = useState('dfs'); 

    const handleCellClick = async (row, col) => {
        if (!start) {
            setStart([row, col]); 
        } else if (!end) {
            setEnd([row, col]);
            await fetchPath([row, col]);
        }
    };

    const fetchPath = async (end) => {
        try {
            const response = await axios.post('http://localhost:8080/find-path', {
                start,
                end,
                algorithm,
            });
            setPath(response.data.path);
        } catch (error) {
            console.error('Error fetching path:', error);
        }
    };

    const getClassCellBasedOnType = (rowIndex, colIndex) => {
        let className = 'cell';

        if (start && start[0] === rowIndex && start[1] === colIndex) {
            className += ' start';
        }

        if (end && end[0] === rowIndex && end[1] === colIndex) {
            className += ' end';
        }

        if (path.some(point => point[0] === rowIndex && point[1] === colIndex)) {
            className += ' path';
        }

        return className;
    };

    const resetGrid = () => {
        setStart(null);
        setEnd(null);
        setPath([]);
    };

    const handleAlgorithmChange = (event) => {
        setAlgorithm(event.target.value);
    };

    const runGrid = () => {
        const gridBoard = [];
        
        for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
            for (let colIndex = 0; colIndex < cols; colIndex++) {
                const cellClassName = getClassCellBasedOnType(rowIndex, colIndex);
                const isCellPresentInPath = path.some(point => point[0] === rowIndex && point[1] === colIndex);
                const pathIndex = isCellPresentInPath ? path.findIndex(point => point[0] === rowIndex && point[1] === colIndex) + 1 : null; // Get path index

                gridBoard.push(
                    <div
                        key={`${rowIndex}-${colIndex}`}
                        className={cellClassName}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                    >
                        {pathIndex}
                    </div>
                );
            }
        }

        return gridBoard;
    };

    return (
        <div className="wrapper">
            <div className="grid-container">
                <div className="controls">
                    <select value={algorithm} onChange={handleAlgorithmChange}>
                        <option value="bfs">BFS</option>
                        <option value="dfs">DFS</option>
                    </select>
                    <button className="btn" onClick={resetGrid}>
                        Reset Grid
                    </button>
                </div>
                <div className="grid">
                    {runGrid()}
                </div>
            </div>
        </div>
    );
};

export default GridLayout;
