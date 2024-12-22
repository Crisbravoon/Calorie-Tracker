
type CalorieDisplayProps = {
  text: string,
  calories: number,
};

export const CalorieDisplay = ({ calories, text }: CalorieDisplayProps) => {
  return (
    <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
      <span className=" text-6xl text-white-600">{calories}</span>
      {text}
    </p>


  )
}
