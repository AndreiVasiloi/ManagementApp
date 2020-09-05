import {combineReducers} from 'redux';
import testReducer from '../../features/sandbox/testReducer';
import inventoryItemsReducer from '../../features/inventory/inventoryItemsReducer';
import modalReducer from '../common/modals/modalReducer';
import authReducer from '../../features/auth/authReducer';

const rootReducer = combineReducers({
    test: testReducer,
    item: inventoryItemsReducer,
    modals: modalReducer,
    auth: authReducer
})

export default rootReducer;