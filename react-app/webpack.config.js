const path = require('path');

module.exports = {
    target: 'node',
    entry: path.resolve(__dirname, 'src/index.tsx'),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-react',
                                [
                                    '@babel/preset-env',
                                    {
                                        targets: {
                                            node: '22'
                                        }
                                    }
                                ]
                            ]
                        }
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            compilerOptions: {
                                module: 'ESNext'
                            }
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
};