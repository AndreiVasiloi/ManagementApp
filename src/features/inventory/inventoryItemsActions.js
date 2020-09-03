import { CREATE_ITEM, UPDATE_ITEM, DELETE_ITEM } from "./inventoryConstants";

export function createItem(item) {
    return {
        type: CREATE_ITEM,
        payload: item
    }
}

export function updateItem(item) {
    return {
        type: UPDATE_ITEM,
        payload: item
    }
}

export function deleteItem(itemId) {
    return {
        type: DELETE_ITEM,
        payload: itemId
    }
}