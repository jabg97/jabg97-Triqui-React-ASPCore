import { createStore,compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../reducers';

function configureStore() {
    const enhancer = compose(
      applyMiddleware(thunk),
    );
  
    const store = createStore(reducers, enhancer);
  
    return store;
  }
  
  export default configureStore;
  