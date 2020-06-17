import { combineReducers } from 'redux';
import tipo from './tipoReducer';
import common from './commonReducer';
import game from './game';

const rootReducer = combineReducers({
    tipo,
    common,
    game
});

export default rootReducer;
