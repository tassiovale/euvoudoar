import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/account/sign_in',
        method: 'post',
        body: { email, password },
        onSuccess: () => Router.push('/')
    });

    const onSubmit = async (event) => {
        event.preventDefault();

        doRequest();
    };

    return (
        <div className="container">
            <form onSubmit={onSubmit}>
                <h1>Login</h1>
                <div className="form-group">
                    <label>E-mail</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Senha</label>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" />
                </div>
                {errors}
                <div className="form-group">
                    <button className="btn btn-primary">Entrar</button>
                </div>
            </form>
        </div>
    );
};

export default Signin;