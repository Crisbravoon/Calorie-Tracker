
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Dispatch, useMemo } from "react"

import { ActivityActions } from "../reducers/activity-reducer";
import { categories } from "../data/categories"
import { Activity } from "../types"

// Proporcionamos las props necesarias para renderizar la lista de actividades
type ActivityListProps = {
    // Proporcionamos las Activity
    activities: Activity[],
    dispatch: Dispatch<ActivityActions>
};


const ActivityList = ({ activities, dispatch }: ActivityListProps) => {

    // Obtenemos el name según la actividad que esta registrada.
    const categoryName = useMemo(() => {
        return (category: Activity['category']) => {
            return categories.map(cat => cat.id === category ? cat.name : '')
        };
    }, [activities]);

    const isEmptyActivity = useMemo(() => activities.length === 0, [activities]);

    return (
        <>
            <h2 className=" text-4xl font-bold text-slate-600 text-center">
                Comida y Actividades
            </h2>

            {isEmptyActivity
                ? <p className='text-center mt-5 font-bold'> Sin Actividades...</p>
                : activities.map(activity => (
                    <div className="px-5 py-10 bg-white mt-5 flex justify-between" key={activity.id}>
                        <div className="space-y-2 relative">
                            <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold
                        ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                                {categoryName(+activity.category)}</p>
                            <p className="text-2xl font-bold pt-5">{activity.name}</p>
                            <p className="text-4xl font-bold text-lime-600">{activity.calories}{' '}
                                <span> Calorias </span>
                            </p>
                        </div>
                        <div className=" flex gap-5 items-center">
                            <button
                                className="h-8 w-8 text-slate-600 hover:text-lime-600"
                                onClick={() => dispatch({ type: "set-activeId", payload: { id: activity.id } })}
                            >
                                <PencilSquareIcon />
                            </button>
                            <button
                                className="h-8 w-8 text-slate-600 hover:text-red-700"
                                onClick={() => dispatch({ type: "delete-activity", payload: { id: activity.id } })}
                            >
                                <TrashIcon />
                            </button>
                        </div>

                    </div>
                ))}

        </>
    )
}

export default ActivityList