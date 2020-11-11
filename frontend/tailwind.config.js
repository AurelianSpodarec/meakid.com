module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
    purge: {
    content: ['./src/components/**/*.{js,ts,jsx,tsx}', './src/pages/**/*.{js,ts,jsx,tsx}'],
    options: {
        safelist: [/lg:w-/,'lg:w-1/4','lg:w-1/3'],
      }
    },
    theme: {
        extend: {
            width: {
                "68": "17rem",
                "94": "23.5rem",
                "100": "25rem",
                "104": "26rem", 
                "106": "26.5rem"
            },
            spacing: {
                '2/3': '66.666667%',
                'full': '100%'
            },
            inset: {
                '0': 0,
                auto: 'auto',
                '1/2': '50%',
                '5': '5px'
            }
        }
    },
    variants: {
        borderStyle: ['responsive', 'hover'],
    },
    plugins: [],
}