const formatearFecha = fecha => {
    const nuevaFecha = new Date(fecha);
    const opciones = {
        dateStyle: 'long'
    }
    return new Intl.DateTimeFormat('es-ES', opciones).format();
}

export default formatearFecha;