import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Main = () => {
    const [data, setData] = useState({ name: '', password: '', avatar: '' });
    const [showPass, setShowPass] = useState(true);

    const fetcData = async () => {
        let response;
        try {
            response = await axios.get('https://randomuser.me/api/');

            console.log(`response=${JSON.stringify(response.data)}`);
        } catch (error) {
            console.log(`response=${JSON.stringify(error)}`);
        }
        const userData = {
            name: response?.data?.results[0]?.name.first,
            password: response.data.results[0].login.password,
            avatar: response.data.results[0].picture.medium,
        };
        console.log(`uData=${JSON.stringify(userData)}`);
        setData(userData);
    };

    const getPassword = () => {
        if (showPass) {
            return data.password;
        } else {
            return '*'.repeat(data.password.length);
        }
    };

    const togglePassword = () => {
        setShowPass(!showPass);
    };

    useEffect(() => {
        fetcData();
    }, []);

    const clickHandler = (event) => {
        event.preventDefault();
        fetcData();
    };

    return (
        <>
            <div>
                <h1>Hello {data.name}</h1>
                <p name='password'>Password {getPassword()}</p>
                <img src={data.avatar}></img>
                {/*TODO: <h1>Hello {data.name}</h1>*/}
                <button name='GO' onClick={clickHandler}>
                    GO
                </button>
                <button name='Toggle' onClick={togglePassword}>
                    {!showPass ? 'Show' : 'Hide'}
                </button>
            </div>
        </>
    );
};

export default Main;
