import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import './Login.css'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const { login } = useContext(UserContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:4000/users?email=${email}&password=${password}`);
            if (response.data.length > 0) {
                const user = response.data[0];
                login(user);
                if (user.role === 'admin') {
                    history.push('/');
                } else {
                    history.push('/profiles');
                }
            } else {
                alert('Invalid email or password');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div>
          
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:   </label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div style={{ marginTop: '25px' }}>  {/* This moves Password below Email */}
                    <label>Password:   </label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div style={{ marginTop: '25px' }}> {/* Space above buttons */}
                    <button type="submit">Login</button>
                    <button onClick={() => history.push('/signup')} style={{ marginLeft: '20px' }}>Sign Up</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
