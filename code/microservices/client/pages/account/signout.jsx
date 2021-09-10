import Router from 'next/router';
import { useEffect } from 'react';
import useRequest from '../../hooks/use-request';

const Signout = () => {
    const { doRequest } = useRequest({
        url: '/api/account/sign_out',
        method: 'post',
        body: {},
        onSuccess: () => Router.push('/')
    });

    useEffect(() => {
        doRequest();
    }, []);

    return <div>Saindo...</div>;
}

export default Signout;