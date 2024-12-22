
import { Activity } from "../types";


const localStorageActivities = () => {
    // Obtiene las actividades guardadas en el local storage
    return JSON.parse(localStorage.getItem('activities') || '[]');
};


// Estado inicial de las Actividades
export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeID: ''
};

export type ActivityActions =
    { type: 'save-activity', payload: { newActivity: Activity } } |
    { type: 'set-activeID', payload: { id: Activity['id'] } } |
    { type: 'delete-activity', payload: { id: Activity['id'] } } |
    { type: 'restart-activity' }

// Interfaz del estado de las Actividades
export type ActivityState = {
    activities: Activity[],
    activeID: Activity['id'];
};

// Reducer para las Actividades
export const activityReducer = (

    state: ActivityState = initialState, action: ActivityActions) => {

    switch (action.type) {
        //Guardamos la actividad en el listado
        case 'save-activity':
            return {
                ...state,
                activities: state.activeID
                // Actualiza la lista de actividades, reemplazando la actividad activa con la nueva
                ? state.activities.map(activity => activity.id === state.activeID ? action.payload.newActivity : activity)
                // Actualiza la lista de actividades
                : [...state.activities, action.payload.newActivity],
            }

        //Se crea ese activeID para luego poder eliminar o modificar la actividad.
        case 'set-activeID':
            console.log('activeID', action.payload.id);
            return {
                ...state,
                // Actualiza el ID activo
                activeID: action.payload.id,
            }

        //Eliminamos la actividad
        case 'delete-activity':
            return {
                ...state,
                activities: state.activities.filter(activity => activity.id !== action.payload.id),
            }

        //Reiniciamos la lista de actividades
        case 'restart-activity':
            return {
                activities: [],
                activeID: ''
            }
    }
};