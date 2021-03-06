import {combineReducers} from 'redux';
import testReducer from '../../features/sandbox/testReducer';
import inventoryItemsReducer from '../../features/inventory/inventoryItemsReducer';
import modalReducer from '../common/modals/modalReducer';
import authReducer from '../../features/auth/authReducer';
import asyncReducer from '../async/asyncReducer';
import inventoryCategoriesReducer from '../../features/inventory/inventoryCategoriesReducer';
import inventoryNavReducer from '../../features/inventory/inventoryNavReducer';
import appointmentsReducer from '../../features/appointments/appointmentsReducer';
import reasonsReducer from '../../features/appointments/reasonsReducer';
import profileReducer from '../../features/profiles/profileReducer';
import clientsReducer from '../../features/clients/clientsReducer';
import expensesReducer from '../../features/expenses/expensesReducer';


const rootReducer = combineReducers({
    test: testReducer,
    item: inventoryItemsReducer,
    category: inventoryCategoriesReducer,
    modals: modalReducer,
    auth: authReducer,
    async: asyncReducer,
    addClass: inventoryNavReducer,
    appointment: appointmentsReducer,
    reason: reasonsReducer,
    profile: profileReducer,
    client: clientsReducer,
    expense: expensesReducer
})

export default rootReducer;