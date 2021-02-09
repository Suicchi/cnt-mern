import { combineReducers } from 'redux'

import signup from './signup'
import error from './error'

export default combineReducers({ signup, error })
