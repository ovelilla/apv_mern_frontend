
const Alerta = ({ alerta }) => {
    return (
        <div className={`${alerta.error ? 'bg-red-500' : 'bg-indigo-500'} text-center p-3 rounded-lg uppercase text-white font-bold mb-10 text-sm`}>
            {alerta.msg}
        </div>
    )
}

export default Alerta