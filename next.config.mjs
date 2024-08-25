// /** @type {import('next').NextConfig} */
// const nextConfig = {
    
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      // Add a rule for handling video files
      config.module.rules.push({
        test: /\.(mp4|webm|ogg|swf|ogv)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/_next/static/videos/', // The path where videos will be served from
              outputPath: 'static/videos/', // The path where videos will be stored in the build
              name: '[name].[hash].[ext]', // Naming convention for output files
              esModule: false, // Ensures compatibility with Phaser
            },
          },
        ],
      });
  
      return config;
    },
  };
  
  export default nextConfig;
  