import { buildClient } from '../api/build-client';

const LandingPage = ({ currentUser }) => {
    return currentUser ? (
        <h1>Você está conectado</h1>
    ) : (
        <h1>Você NÃO está conectado</h1>
    );
};

LandingPage.getInitialProps = async (context) => {
    const { data } = await buildClient(context).get('/api/account/current_user');
    return data;
};

export default LandingPage;