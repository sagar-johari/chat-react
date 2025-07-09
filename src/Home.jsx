import React from 'react';
import Cookies from 'js-cookie';

const Home = () => {
    return <h2>Hello {Cookies.get('username')}</h2>;
}
export default Home;