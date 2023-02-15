type StateType = {
    age: number
    cats: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: any
}
export const userReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            return {
                ...state,
                age: state.age + 1
            }
        case 'INCREMENT-CATS':
            return {
                ...state,
                cats: state.cats + 1
            }
        case 'CHANGE-NAME':
            return {
                ...state,
                name: state.name = action.newName
            }
        default:
            throw new Error('I Dont understand this type')
    }
}