import { IWriting } from './writing.type';

export const writingES: IWriting = {
  goBackText: 'Regresar',
  menuTop: {
    home: 'Inicio',
    instructions: 'Instrucciones',
    support: 'Ayuda',
  },
  authHeader: {
    myTickets: 'Mis Tickets',
    myProfile: 'Mi perfil',
    logout: 'Cerrar sesión',
    confirmModal: {
      title: 'Cerrar sesión',
      description: '¿ Estas seguro de que quieres cerrar tu sesión ?',
      confirmButton: 'Cerrar sesión',
      cancelButton: 'Cancelar',
    },
  },
  user: {
    login: {
      title: 'Iniciar sesión',
      successMessage: 'Sesión iniciada',
      errorMessage: 'Error al iniciar sesión',
    },
    logout: 'Cerrar sesión',
    register: {
      title: 'Registrarse',
      createNew: 'Crear una cuenta nueva',
      successMessage: 'Cuenta creada',
      errorMessage: 'Error al crear cuenta',
    },
    forgotPassword: {
      title: '¿Olvidaste la contraseña?',
      successMessage:
        'Te hemos enviado a tu correo las instrucciones para restablecer tu contraseña.',
      errorMessage: 'Error al restablecer contraseña',
      submit: 'Recuperar contraseña',
      description:
        'Por favor ingresa tu correo electronico y recibiras las instrucciones para recuperar tu contraseña',
    },
    inputs: {
      name: 'Nombre',
      lastname: 'Apellido',
      password: 'Contraseña',
      confirmPassword: 'Confirmar contraseña',
      email: 'Correo eléctronico',
    },
    errorResponse: {
      password: {
        minLength: 'La contraseña debe tener como minimo 8 caracteres',
        minOneNumber: 'La contraseña debe tener al menos 1 número',
        minOneLetter: 'La contraseña debe tener al menos 1 letra',
      },
    },
  },
  resetPassword: {
    title: 'Restablecer contraseña',
    description: 'Ingresa tu nueva contraseña',
    successMessage: 'Tu contraseña fue cambiada exitosamente',
    errorMessage: 'Error al cambiar contraseña',
    expiredToken: 'El token expiró. Por favor genera un nuevo token',
  },
  errorTryLater:
    'Lo sentimos, ocurrio un error. Por favor intentalo de nuevo mas tarde.',
  instructions: {
    title: 'Instrucciones',
    rules: {
      general: [
        'Cada acierto en las predicciones suma 1 punto.',
        'El 90% de la recaudación total de tickets de cada fecha se otorgará al usuario poseedor del ticket con mayor puntuación en dicha fecha.',
        'El 10% restante se destinará a gastos de servicios de mantenimiento y comisiones del sitio.',
        'En caso de empate, si hay múltiples tickets con la misma puntuación más alta, la recaudación se distribuirá equitativamente entre los poseedores de esos tickets.',
        'El valor del ticket de cada fecha puede variar a lo largo del torneo.',
        'Cada usuario debe adquirir uno o más tickets para participar en la fecha.',
        'Los tickets pueden ser adquiridos hasta 5 minutos antes del inicio del primer partido de la fecha.',
        'Para que un ticket sea considerado válido, el usuario debe completar todos los resultados y abonar la totalidad del costo.',
        'No se permitirá la modificación de los resultados una vez que el ticket ha sido creado y confirmado.',
        'Si algún partido del ticket en curso se suspende y se posterga a una fecha distinta al último partido programado de la fecha, el partido se descartará y no sumará puntos en el ticket, independientemente del resultado parcial.',
      ],
    },
  },
  support: {
    title: 'Ayuda',
  },
  home: {
    fixtureSection: {
      buttonBuy: 'Confirmar Resultados',
    },
    buyModal: {
      title: 'Comprar Ticket',
      description:
        'Elegi tu metodo de pago para comprar tu ticket y participar de la fecha',
      confirmButton: 'Comprar ahora',
      cancelButton: 'Cancelar',
      collapsable: [
        {
          key: '1',
          label: 'Mercado Pago (Solo para Argentina)',
        },
        {
          key: '2',
          label: 'Transferencia (Solo para Argentina)',
        },
        {
          key: '3',
          label: 'Paypal',
        },
      ],
    },
    alertResultsError: {
      title: 'Error en tus resultados',
      description: 'Porfavor completa todos los resultados para continuar',
    },
  },
  confirmResults: {
    title: 'Confirmar Resultados',
    description:
      'Porfavor revisa tus resultados, una vez que el Ticket se envie no podras realizar cambios',
    button: 'Confirmar Ticket',
    success: {
      title: 'Resultados Confirmados',
      description:
        'Ya estas participando de la fecha con tu ticket, buena suerte!',
    },
    error: {
      title: 'Error al crear el Ticket',
    },
    alert: {
      description: 'Inicia sesión o Registrate para confirmar tu ticket',
    },
  },
  userTickets: {
    title: 'Mis Tickets',
    modal: {
      title: 'Mis resultados',
    },
  },
  userProfile: {
    title: 'Mi Perfil',
    button: 'Editar Usuario',
    error: 'Error al editar los datos. Porfavor intentelo nuevamente mas tarde',
    success: 'Datos actualizado exitosamente',
  },
};

export default writingES;
