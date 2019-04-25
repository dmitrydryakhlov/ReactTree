export const ADD_NODE = 'ADD_NODE';
export const REMOVE_NODE = 'REMOVE_CHILD';
export const CHANGE_NODE = 'CHANGE_NODE';

export function addNode(parentId, child) {
    return dispatch => {
        dispatch({
            type: ADD_NODE,
            payload: {
                id: parentId,
                child: child
            }
        })
    }
}

export function removeNode(id) {
    return dispatch => {
        dispatch({
            type: REMOVE_NODE,
            payload: id
        })
    }
}

export function changeNode(id, newName) {
    return dispatch => {
        dispatch({
            type: CHANGE_NODE,
            payload: {
                id: id,
                newName: newName
            }
        })
    }
}