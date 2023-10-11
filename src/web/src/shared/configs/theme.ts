import { DefaultTheme } from 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    name: string,
    background: {
      color: {
        primary: string,
        secondary: string,
        tertiary: string,
      }
    },
    button: {
      background: {
        primary: string,
        secondary: string,
        transparent: string,
        warning: string,
      },
      color: {
        primary: string,
        secondary: string,
        warning: string,
      },
      border: {
        primary: string,
        secondary: string,
        warning: string,
      }
    },
    input: {
      background: {
        primary: string,
        secondary: string,
        tertiary: string,
      },
      color: {
        primary: string,
        secondary: string,
        tertiary: string,
      },
      border: {
        primary: string,
        secondary: string,
        tertiary: string,
      },
    },
    text: {
      color: {
        primary: string,
        secondary: string,
        tertiary: string,
      }
    }
  }
}

export const defaultTheme: DefaultTheme = {
  name: 'default',
  background: {
    color: {
      primary: '#d9dee9',
      secondary: '#0e161f',
      tertiary: '#000000',
    }
  },
  button: {
    background: {
      primary: '#379691',
      secondary: '#edfaf9',
      transparent: 'transparent',
      warning: '#d7c1c9',
    },
    color: {
      primary: '#FFFFFF',
      secondary: '#0e161f',
      warning: '#0e161f',
    },
    border: {
      primary: '#379691',
      secondary: '#edfaf9',
      warning: '#d7c1c9',
    }
  },
  input: {
    background: {
      primary: '#fafafa',
      secondary: '#98a0ce',
      tertiary: '#6e7285',
    },
    color: {
      primary: '#2C3D4F',
      secondary: '#38373F',
      tertiary: '#AFF9F4',
    },
    border: {
      primary: '#379691',
      secondary: '#edfaf9',
      tertiary: '#d7c1c9',
    },
  },
  text: {
    color: {
      primary: '#2C3D4F',
      secondary: '#38373F',
      tertiary: '#AFF9F4',
    }
  }
}

export const darkTheme: DefaultTheme = {
  name: 'dark',
  background: {
    color: {
      primary: '#0e161f',
      secondary: '#d9dee9',
      tertiary: '#000000',
    }
  },
  button: {
    background: {
      primary: '#379691',
      secondary: '#edfaf9',
      transparent: 'transparent',
      warning: '#d7c1c9',
    },
    color: {
      primary: '#FFFFFF',
      secondary: '#0e161f',
      warning: '#0e161f',
    },
    border: {
      primary: '#379691',
      secondary: '#edfaf9',
      warning: '#d7c1c9',
    }
  },
  input: {
    background: {
      primary: '#1f3145',      
      secondary: '#38373F',
      tertiary: '#14141b',
    },
    color: {
      primary: '#AFF9F4',
      secondary: '#2C3D4F',
      tertiary: '#38373F',
    },
    border: {
      primary: '#AFF9F4',
      secondary: '#2C3D4F',
      tertiary: '#38373F',
    },
  },
  text: {
    color: {
      primary: '#AFF9F4',
      secondary: '#2C3D4F',
      tertiary: '#38373F',
    }
  }
}
