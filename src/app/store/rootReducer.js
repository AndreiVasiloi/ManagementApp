import {combineReducers} from 'redux';
import testReducer from '../../features/sandbox/testReducer';
import inventoryItemsReducer from '../../features/inventory/inventoryItemsReducer';

const rootReducer = combineReducers({
    test: testReducer,
    item: inventoryItemsReducer
})

export default rootReducer;