export interface IWriting {
  goBackText: string;
  menuTop: {
    home: string;
    instructions: string;
    support: string;
  };
  authHeader: {
    myTickets: string;
    myProfile: string;
    logout: string;
    confirmModal: {
      title: string;
      description: string;
      confirmButton: string;
      cancelButton: string;
    };
  };
  user: {
    login: {
      title: string;
      successMessage: string;
      errorMessage: string;
    };
    register: {
      title: string;
      createNew: string;
      successMessage: string;
      errorMessage: string;
    };
    forgotPassword: {
      title: string;
      description: string;
      successMessage: string;
      errorMessage: string;
      submit: string;
    };
    logout: string;
    inputs: {
      name: string;
      lastname: string;
      password: string;
      confirmPassword: string;
      email: string;
    };
    errorResponse: {
      password: {
        minLength: string;
        minOneLetter: string;
        minOneNumber: string;
      };
    };
  };
  resetPassword: {
    title: string;
    description: string;
    successMessage: string;
    errorMessage: string;
    expiredToken: string;
  };
  errorTryLater: string;
  instructions: {
    title: string;
    rules: {
      general: string[];
    };
  };
  support: {
    title: string;
  };
  home: {
    fixtureSection: {
      buttonBuy: string;
    };
    buyModal: {
      title: string;
      description: string;
      confirmButton: string;
      cancelButton: string;
      collapsable: {
        key: string;
        label: string;
      }[];
    };
    alertResultsError: {
      title: string;
      description: string;
    };
  };
  confirmResults: {
    title: string;
    description: string;
    alert: {
      description: string;
    };
    button: string;
    success: {
      title: string;
      description: string;
    };
    error: {
      title: string;
    };
  };
  userTickets: {
    title: string;
    modal: {
      title: string;
    };
  };
  userProfile: {
    title: string;
    button: string;
    success: string;
    error: string;
  };
}
