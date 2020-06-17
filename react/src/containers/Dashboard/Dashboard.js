import React from 'react';
import Game from '../Game';
import { base } from '../../hocs';

class Dashboard extends React.Component {
    async componentDidMount() {
     
    }

    render() {
        return <Game />;
    }
}


export default base((Dashboard));
