import { combineReducers } from "redux";
import CurrencyReducer from "./currency";
import UriReducer from './uri';

const appReducer = combineReducers({ CurrencyReducer, UriReducer })
export default appReducer