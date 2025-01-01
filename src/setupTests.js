// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

module.exports = {
    presets: [
      '@babel/preset-env',  // 최신 JavaScript 문법을 지원
      '@babel/preset-react' // JSX 문법을 처리
    ],
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',  // JavaScript 및 JSX 파일을 babel-jest로 변환
      },
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],  // 지원하는 파일 확장자 설정
};
  