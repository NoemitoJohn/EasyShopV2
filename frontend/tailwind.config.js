export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'red': '#AF1B3F',
        'black': '#0F0F0F',
        'darkgray': '#1E1E24',
        // 'body': '#FBFBFB',
      
      },
      boxShadow:{
          'Custom1':  '4px 4px 4px #d6d6c2',
      },
      borderWidth:{
        DEFAULT: '1px',
        '0': '0',
        '1': '1px',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      }

    },
  }
}

