import {userReducer} from "./user-reducer";
import exp from "constants";

test('user reducer should increment only age', () => {
    const startState = {age: 36, cats: 4, name: 'Rin'};

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(37);
    expect(endState.cats).toBe(4);
    expect(endState.name).toBe('Rin')
})

test('user reducer should increment only cats', () => {
    const startState = {age: 36, cats: 4, name: 'Rin'};

    const endState = userReducer(startState, {type: 'INCREMENT-CATS'})

    expect(endState.cats).toBe(5);
    expect(endState.age).toBe(36);
    expect(endState.name).toBe('Rin');
})

test('user reducer should change name of user', () => {
    const startState = {age: 36, cats: 4, name: 'Rin'};
    const newName = 'Dar';

    const endState = userReducer(startState, {type: 'CHANGE-NAME', newName: newName})

    expect(endState.name).toBe(newName)
})