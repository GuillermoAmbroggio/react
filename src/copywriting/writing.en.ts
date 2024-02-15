import { IWriting } from './writing.type';

export const writingEn: IWriting = {
  goBackText: 'Go back',
  menuTop: {
    home: 'Home',
    instructions: 'Instructions',
    support: 'Help',
  },
  authHeader: {
    myTickets: 'My Tickets',
    myProfile: 'Profile',
    logout: 'Logout',
    confirmModal: {
      title: 'Logout',
      description: 'Are you sure you want to log out?',
      confirmButton: 'Logout',
      cancelButton: 'Cancel',
    },
  },
  user: {
    login: {
      title: 'Sign in',
      successMessage: 'Session started',
      errorMessage: 'Failed to sign in',
    },
    logout: 'Logout',
    register: {
      title: 'Sign up',
      createNew: 'Create a new account',
      successMessage: 'Account created',
      errorMessage: 'Error creating account',
    },
    forgotPassword: {
      title: '¿Forgot password?',
      successMessage:
        'We have sent you instructions to reset your password to your email.',
      errorMessage: 'Error resetting password',
      submit: 'Reset password',
      description:
        'Please enter your email and you will receive instructions to recover your password',
    },
    inputs: {
      name: 'Name',
      lastname: 'Lastname',
      password: 'Password',
      confirmPassword: 'Confirm password',
      email: 'Email',
    },
    errorResponse: {
      password: {
        minLength: 'Password must be at least 8 characters',
        minOneNumber: 'Password must have at least 1 number',
        minOneLetter: 'Password must be at least 1 letter',
      },
    },
  },
  resetPassword: {
    title: 'Reset password',
    description: 'Insert your new password',
    errorMessage: 'Error to change password',
    successMessage: 'Password changed succefuly',
    expiredToken: 'Token expired. Please regenerate a new token',
  },
  errorTryLater: 'Error. Please try later',
  instructions: {
    title: 'Instructions',
    rules: {
      general: [
        'Each correct prediction earns 1 point.',
        '90% of the total ticket revenue for each date will be awarded to the user holding the ticket with the highest score on that date.',
        'The remaining 10% will be allocated to maintenance service expenses and site commissions.',
        'In the event of a tie, if multiple tickets have the same highest score, the revenue will be evenly distributed among the holders of those tickets.',
        'The ticket value for each date may vary throughout the tournament.',
        'Each user must purchase one or more tickets to participate in the date.',
        'Tickets can be purchased up to 5 minutes before the start of the first match of the date.',
        'For a ticket to be considered valid, the user must complete all results and pay the full cost.',
        'Results cannot be modified in any way once the ticket has been created and confirmed.',
        'If any match on the current ticket is suspended for any reason and is rescheduled to a date other than the last scheduled match of the date, it will be completely discarded, and that match will not contribute any points, regardless of its partial result.',
      ],
    },
  },
  support: {
    title: 'Support',
  },
  home: {
    fixtureSection: {
      buttonBuy: 'Confirm Results',
    },
    buyModal: {
      title: 'Buy Ticket',
      description: 'choose your payment method',
      confirmButton: 'Buy now',
      cancelButton: 'Cancel',
      collapsable: [
        {
          key: '1',
          label: 'Mercado Pago (Only Argentina)',
        },
        {
          key: '2',
          label: 'Transferencia (Only Argentina)',
        },
        {
          key: '3',
          label: 'Paypal',
        },
      ],
    },
    alertResultsError: {
      title: 'Error in your results',
      description: 'Please complete all the results to continue',
    },
  },
  confirmResults: {
    title: 'Confirm Results',
    description:
      'Please confirm you results, once the payment is completed you will be participating with the next ticket on the date',
    button: 'Buy Ticket',
    success: {
      title: 'Confirmed Results',
      description:
        'You are already participating in the date with your ticket, good luck!',
    },
    error: {
      title: 'Error creating Ticket',
    },
    alert: {
      description: 'Login or Register to confirm your ticket',
    },
  },
  userTickets: {
    title: 'My Tickets',
    modal: {
      title: 'My results',
    },
  },
  userProfile: {
    title: 'Profile',
    button: 'Edit User',
    error: 'Error when editing data. Please try again later',
    success: 'Data successfully updated',
  },
};

export default writingEn;
