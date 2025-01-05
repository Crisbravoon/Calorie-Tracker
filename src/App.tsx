
import { useEffect, useMemo } from "react";

import { ArrowPathIcon } from '@heroicons/react/24/outline'
import ActivityList from "./components/ActivityList";

import CalorieTracker from "./components/CalorieTracker";
import { useActivity } from "./hooks/useActivity";
import Form from "./components/Form";



function App() {


  const {state, dispatch} = useActivity()

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities));
  }, [state.activities])

  const resetAppState = () => useMemo(() => state.activities.length > 0, [state.activities]);


  return (
    <>
      <header className="bg-lime-600 p-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className=" text-center text-lg font-bold text-white uppercase">
            Contador de Calorias
          </h1>

          <button
            className=" flex items-center gap-2 text-white font-bold uppercase bg-gray-800 hover:bg-gray-900 p-2 rounded-lg text-sm cursor-pointer disabled:opacity-65"
            disabled={!resetAppState()}
            onClick={() => dispatch({ type: 'restart-activity' })}
          >Reiniciar APP
            <ArrowPathIcon className="w-6 text-white" />

          </button>
        </div>
      </header>

      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form />
        </div>
      </section>

      <section className="bg-gray-800 py-10">
        <div className="mx-auto max-w-4xl">
          <CalorieTracker/>
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList/>
      </section>

    </>
  )
}

export default App
