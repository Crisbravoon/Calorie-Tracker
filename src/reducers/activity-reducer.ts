
import { Activity } from "../types";

// Estado inicial de las Actividades
export const initialState: ActivityState = {
    activities: []
};

export type ActivityActions = {
    type: 'save-activity',
    payload: { newActivity: Activity },
};

// Interfaz del estado de las Actividades
type ActivityState = {
    activities: Activity[];
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
    }
};