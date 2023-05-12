

const config = {
    input:"src/index.js",
    output:{
        file:`dist/${name.output}.js`,
        name: "test_name",
        format: "umd",
    },
    plugins: []
};

export default[
    config,
    {
      ...config,
      output{

      }    
    }
]

