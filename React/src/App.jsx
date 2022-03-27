import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CityCookie from './CityCookie';
import DetailCookie from './DetailCookie';
import Category from './Category';
import Dishes from './Dishes';

function App() {
    return (
        <div className="App">
            <CityCookie />
            <DetailCookie />
            <Category />
            <Dishes />
        </div>
    );
}
export default App;
