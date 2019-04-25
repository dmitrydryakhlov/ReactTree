export function uniqId() {
    return `_${Math.random().toString(36)}`.substr(3, 10);
}

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('redux-store');
        if (serializedState === null) {
            return undefined
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined
    }
}

export const saveState = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('redux-store', serializedState);
    } catch (err) {
        //Ignore
    }
}