export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      
      'XSmobile': '100px',
      
      'Smobile': '250px',
       
      'mobile': '445px',

      'tablet': '640px',

      'notebook': '840px',

      'laptop': '1124px',

      'desktop': '1280px',
    },
    extend: {
      colors:{
        'red': '#AF1B3F',
        'black': '#0F0F0F',
        'darkgray': '#1E1E24',
        'backgray': '#d3d3d3',
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

