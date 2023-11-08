import { DefaultTheme } from 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    name: string,
    background: {
      color: {
        primary: string,
        secondary: string,
        tertiary: string,
        transparent: string,
      }
    },
    button: {
      background: {
        primary: string,
        secondary: string,
        tertiary: string,
        transparent: string,
      },
      color: {
        primary: string,
        secondary: string,
        tertiary: string,
        transparent: string,
      },
      border: {
        primary: string,
        secondary: string,
        tertiary: string,
        transparent: string,
      }
    },
    input: {
      background: {
        primary: string,
        secondary: string,
        tertiary: string,
        transparent: string,
      },
      color: {
        primary: string,
        secondary: string,
        tertiary: string,
        transparent: string,
      },
      border: {
        primary: string,
        secondary: string,
        tertiary: string,
        transparent: string,
      },
    },
    text: {
      color: {
        primary: string,
        secondary: string,
        tertiary: string,
        transparent: string,
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
      transparent: 'transparent',
    }
  },
  button: {
    background: {
      primary: '#379691',
      secondary: '#edfaf9',
      tertiary: '#d7c1c9',
      transparent: 'transparent',
    },
    color: {
      primary: '#FFFFFF',
      secondary: '#0e161f',
      tertiary: '#0e161f',
      transparent: 'transparent',
    },
    border: {
      primary: '#379691',
      secondary: '#edfaf9',
      tertiary: '#d7c1c9',
      transparent: 'transparent',
    }
  },
  input: {
    background: {
      primary: '#fafafa',
      secondary: '#98a0ce',
      tertiary: '#6e7285',
      transparent: 'transparent',
    },
    color: {
      primary: '#2C3D4F',
      secondary: '#38373F',
      tertiary: '#AFF9F4',
      transparent: 'transparent',
    },
    border: {
      primary: '#379691',
      secondary: '#edfaf9',
      tertiary: '#d7c1c9',
      transparent: 'transparent',
    },
  },
  text: {
    color: {
      primary: '#2C3D4F',
      secondary: '#38373F',
      tertiary: '#AFF9F4',
      transparent: 'transparent',
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
      transparent: 'transparent',
    }
  },
  button: {
    background: {
      primary: '#379691',
      secondary: '#edfaf9',
      tertiary: '#d7c1c9',
      transparent: 'transparent',
    },
    color: {
      primary: '#FFFFFF',
      secondary: '#0e161f',
      tertiary: '#0e161f',
      transparent: 'transparent',
    },
    border: {
      primary: '#379691',
      secondary: '#edfaf9',
      tertiary: '#d7c1c9',
      transparent: 'transparent',
    }
  },
  input: {
    background: {
      primary: '#1f3145',      
      secondary: '#38373F',
      tertiary: '#14141b',
      transparent: 'transparent',
    },
    color: {
      primary: '#AFF9F4',
      secondary: '#2C3D4F',
      tertiary: '#38373F',
      transparent: 'transparent',
    },
    border: {
      primary: '#AFF9F4',
      secondary: '#2C3D4F',
      tertiary: '#38373F',
      transparent: 'transparent',
    },
  },
  text: {
    color: {
      primary: '#AFF9F4',
      secondary: '#2C3D4F',
      tertiary: '#38373F',
      transparent: 'transparent',
    }
  }
}
