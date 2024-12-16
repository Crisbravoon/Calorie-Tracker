
import { Activity } from "../types";

// Estado inicial de las Actividades
export const initialState: ActivityState = {
    activities: [],
    activeID: ''
};

export type ActivityActions =
    { type: 'save-activity', payload: { newActivity: Activity } } |
    { type: 'set-activeId', payload: { id: Activity['id'] } }

// Interfaz del estado de las Actividades
export type ActivityState = {
    activities: Activity[],
    activeID: Activity['id'];
};

// Reducer para las Actividades
export const activityReducer = (


    state: ActivityState = initialState, action: ActivityActions) => {

    switch (action.type) {
        case 'save-activity':
            return {
                ...state,
                activities: [...state.activities, action.payload.newActivity],
            }
        case 'set-activeId':
            return {
                ...state,
                // Actualiza el ID activo
                activeID: action.payload.id,
            }
    }
};