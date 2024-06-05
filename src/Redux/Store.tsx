import { createStore, applyMiddleware, compose } from 'redux';

import indexReducer from './Index';
import ReduxThunk from 'redux-thunk';

const middleware = applyMiddleware(ReduxThunk);

export const store = createStore(indexReducer, compose(middleware))
// export const store = createStore(indexReducer)