import moment from 'moment-timezone';

/** Convierte la fecha recibida a formato UTC
 * @date fecha en cualquier formato.
 */
export const parseUTCDate = (date?: Date) => {
  if (!date) return undefined;
  const momentUtc = moment.utc(date).format();
  return new Date(momentUtc);
};

/** Valida que la fecha actual sea menor a la fecha de inicio. Devuelve true si la fecha es validad
 *  o false si la fecha no es valida
 * @date fecha de inicio
 */
export const validateStartDate = (date?: Date) => {
  if (!date) return false;
  const serverUTCDateTime = moment().utc(); // Obtiene la fecha y hora actual del servidor en UTC

  // Restar 5 minutos a la fecha recibida (date)
  const startDateUTC = moment.utc(date);
  const limitStartDate = startDateUTC.subtract(5, 'minutes');
  // Comparar si la fecha actual del servidor es menor que la fecha recibida menos 5 minutos
  if (serverUTCDateTime.isBefore(limitStartDate)) {
    return true; // La fecha actual es menor que la fecha recibida menos 5 minutos
  }
  return false; // La fecha actual es mayor o igual que la fecha recibida menos 5 minutos
};
