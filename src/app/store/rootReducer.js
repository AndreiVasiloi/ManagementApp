import {combineReducers} from 'redux';
import testReducer from '../../features/sandbox/testReducer';
import inventoryItemsReducer from '../../features/inventory/inventoryItemsReducer';
import modalReducer from '../common/modals/modalReducer';
import authReducer from '../../features/auth/authReducer';
import asyncReducer from '../async/asyncReducer';
import inventoryCategoriesReducer from '../../features/inventory/inventoryCategoriesReducer';

const rootReducer = combineReducers({
    test: testReducer,
    item: inventoryItemsReducer,
    category: inventoryCategoriesReducer,
    modals: modalReducer,
    auth: authReducer,
    async: asyncReducer
})

export default rootReducer;