
import { useState, ChangeEvent, FormEvent, Dispatch } from "react";

import { ActivityActions } from "../reducers/activity-reducer";
import { categories } from "../data/categories";
import { Activity } from "../types";

type FormProps = {
    dispatch: Dispatch<ActivityActions>
}

const initialState = {
    category: 1,
    name: '',
    calories: 0
}
const Form = ({ dispatch }: FormProps) => {

    const [activity, setActivity] = useState<Activity>(initialState);

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {

        // Verifica si el campo es de tipo numérico comparando el ID del campo con 'category' o 'calories'
        const isNumberField = ['category', 'calories'].includes(e.target.id);
        console.log(isNumberField)

        // Actualiza el estado 'activity' manteniendo los valores anteriores
        setActivity({
            ...activity, [e.target.id]:
                isNumberField
                    ? +e.target.value
                    : e.target.value
        })
    };


    //Validamos que no esten vacios los campos
    const isValidActivity = () => {
        const { name, calories } = activity;
        // Devuelve verdadero si no están vacíos los campos name y calories
        return name.trim() !== '' && calories > 0;

    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Activamos nuestro dispatch 
        dispatch({ type: 'save-activity', payload: { newActivity: activity } })

        // Resetea el formulario
        setActivity(initialState);

    };

    return (
        <form className="space-y-5 bg-white shadow p-10 rounded-xl"
            onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap 3">
                <label htmlFor="category" className="font-bold">Categoria:</label>
                <select
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    id="category"
                    value={activity.category}
                    onChange={handleChange}
                >
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap 3">
                <label htmlFor="name" className="font-bold">Actividad:</label>
                <input
                    id="name"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Ej. Comida, Jugo de Naranja , Ensalada, Pesas , Bicicletas"
                    value={activity.name}
                    onChange={handleChange}

                />
            </div>

            <div className="grid grid-cols-1 gap 3">
                <label htmlFor="calories" className="font-bold">Calorias:</label>
                <input
                    id="calories"
                    type="number"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Calorias. Ej. 300 po 500"
                    value={activity.calories}
                    onChange={handleChange}
                />
            </div>

            <input
                className="bg-gray-800 hover:bg-gray-900 text-white font-bold uppercase w-full py-2 rounded-lg cursor-pointer disabled:opacity-10"
                type="submit"
                value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
                // Desabilita el botón guardar si no se cumplen las condiciones de validación (campos vacíos o calorías negativas)
                disabled={!isValidActivity()}
            />
        </form>
    )
}

export default Form