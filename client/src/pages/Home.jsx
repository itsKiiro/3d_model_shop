import React from 'react';
import Start from '../components/Start';
import Featured from '../components/Featured';
import SearchBar from '../components/SearchBar';
import NewArrivals from '../components/NewArrivals';
import Ad from '../components/Ad';

const Home = () => {

    return (
        <div className='Home'>
            <Start />
            <Featured />
            <SearchBar />
            <NewArrivals />
            <Ad />
        </div>
    );
}

export default Home;