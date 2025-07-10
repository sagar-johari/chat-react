import React, { useState } from 'react';
import Cookies from 'js-cookie';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loggedIn, setLoggedIn] = useState(!!Cookies.get('accessToken'));

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        fetch('https://chat-express-production.up.railway.app/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ email, password }).toString(),
            credentials: 'include'
        })
        .then(async res => {
            const data = await res.json();
            if (res.status === 200) {
                Cookies.set('accessToken', data.accessToken, { expires: 1 });
                // console.log(data.user.name);
                Cookies.set('username', data.user.name );
                setSuccessMessage('Successfully logged in');
                setLoggedIn(true);
                setTimeout(() => {
                    setIsLogin(true);
                    setSuccessMessage('');
                }, 5000);
            } else if (data.error) {
                setErrorMessage(data.error);
                setTimeout(() => setErrorMessage(''), 5000);
            } else {
                setErrorMessage(data.message || 'An error occurred.');
                setTimeout(() => setErrorMessage(''), 5000);
            }
        })
        .catch(err => {
            setErrorMessage(err.message);
        });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const confirmPassword = e.target[3].value;
        fetch('https://chat-express-production.up.railway.app/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ name, email, password, confirmPassword }).toString()
        })
        .then(async res => {
            const data = await res.json();
            if (res.status === 201) {
                setSuccessMessage('Successfully registered');
                setTimeout(() => {
                    setIsLogin(true);
                    setSuccessMessage('');
                }, 5000);
            } else if (data.error) {
                setErrorMessage(data.error);
                setTimeout(() => setErrorMessage(''), 5000);
            } else {
                setErrorMessage(data.message || 'An error occurred.');
                setTimeout(() => setErrorMessage(''), 5000);
            }
        })
        .catch(err => {
            setErrorMessage(err.message);
        });
    };

    const handleLogout = () => {
        Cookies.remove('accessToken');
        Cookies.remove('username');
        setLoggedIn(false);
        setSuccessMessage('Logged out successfully');
        setTimeout(() => setSuccessMessage(''), 3000);
    };
    const user = Cookies.get('username') ;

    return (
      <>
        {errorMessage && <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{errorMessage}</div>}
        {successMessage && <div style={{ color: 'green', textAlign: 'center', marginTop: '20px' }}>{successMessage}</div>}
        {loggedIn ? (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <h3>{user|| 'User'} is logged in</h3>
            <button onClick={handleLogout} style={{ width: '100px', height: '30px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px' }}>Logout</button>
          </div>
        ) : successMessage ? null : isLogin ? (
          <form style={{ display: 'flex', flexDirection: 'column', gap: '10px',maxWidth: '300px',margin: '50px auto',padding: '20px',border: '1px solid #000',borderRadius: '5px' }} onSubmit={handleLogin} id="login-form"> 
            <h3>Login</h3>
            <input id="email" name="email" type="email" placeholder="Email" autoComplete="username" />
            <input id="password" name="password" type="password" placeholder="Password" autoComplete="current-password" />
            <button type="submit" style={{ width: '100px', height: '30px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>Login</button>
            <button type="button" style={{ width: '100px', height: '30px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }} onClick={() => setIsLogin(false)}>Register</button>
          </form>
        ) : (
          <form style={{ display: 'flex', flexDirection: 'column', gap: '10px',maxWidth: '300px',margin: '50px auto',padding: '20px',border: '1px solid #000',borderRadius: '5px' }} onSubmit={handleRegister} id="register-form"> 
            <h3>Register</h3>
            <input id="name" name="name" type="text" placeholder="Username" autoComplete="username" />
            <input id="email" name="email" type="email" placeholder="Email" autoComplete="email" />
            <input id="password" name="password" type="password" placeholder="Password" autoComplete="current-password" />
            <input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" autoComplete="new-password" />
            <button type="button" style={{ width: '100px', height: '30px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }} onClick={() => setIsLogin(true)}>Login</button>
            <button type="submit" style={{ width: '100px', height: '30px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>Register</button>
          </form>
        )}
      </>
    );
}

export default Login;