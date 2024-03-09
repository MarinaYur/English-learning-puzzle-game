import { resolve, join } from 'path'; // Импортируем модуль "path" для работы с путями файлов
import HtmlWebpackPlugin from 'html-webpack-plugin';

export const entry = './src/index.ts';
export const output = {
  filename: 'bundle.js', // Имя выходного файла сборки
  path: resolve(__dirname, 'dist'), // Путь для выходного файла сборки
};
export const module = {
  rules: [
    {
      test: /\.css$/, // Регулярное выражение для обработки файлов с расширением .css
      use: ['style-loader', 'css-loader'], // Загрузчики, используемые для обработки CSS-файлов
    },
    { test: /\.ts$/i, use: 'ts-loader' },
  ],
};
export const plugins = [
  new HtmlWebpackPlugin({
    template: './src/index.html',
  }),
];
export const devServer = {
  static: {
    directory: join(__dirname, 'dist'), // Каталог для статики
  },
  open: true, // Автоматически открывать браузер
};
export const mode = 'development';
