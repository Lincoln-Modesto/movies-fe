import { legacy_createStore as createStore, applyMiddleware, Store } from 'redux'
import { DispatchType, IAction, MovieState } from '../models/redux'
import thunk from "redux-thunk"
import reducer from './reducers'

const store: Store<MovieState, IAction> & {
    dispatch: DispatchType
  } = createStore(reducer, applyMiddleware(thunk))

export default store