// Declara que arquivos com extensão .png são módulos e podem ser importados
declare module '*.png' {
    const value: string;
    export default value;
  }
  