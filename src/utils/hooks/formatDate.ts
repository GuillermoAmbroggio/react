const formatDateTime = (date?: Date) => {
  if (!date) return { date: null, time: null };
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
  };
  const formattedDate = new Date(date).toLocaleDateString('es-ES', options);

  // Obtiene la abreviatura del día de la semana (ejemplo: Sab) y capitaliza la primera letra
  const weekdayAbbreviation =
    formattedDate.slice(0, 3).charAt(0).toUpperCase() +
    formattedDate.slice(1, 3);

  // Formatea la fecha en el nuevo formato (Sab, 22/10)
  const formattedDateResult = `${weekdayAbbreviation}, ${formattedDate.slice(
    4,
  )}`;

  // Obtiene la hora de la fecha de entrada en formato HH:mm
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const time = `${hours}:${minutes}`;

  // Devuelve el objeto con la fecha y la hora
  return { date: formattedDateResult, time: time };
};

export default formatDateTime;
