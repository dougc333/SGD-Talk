https://dev.to/alexeagleson/how-to-create-and-publish-a-react-component-library-2oe

1) npm init
2) npm i react typescript @types/react --save-dev
3) npx tsc --init
add to tsconfig.json

{
  "compilerOptions": {
    // Default
    "target": "es5", 
    "esModuleInterop": true, 
    "forceConsistentCasingInFileNames": true,
    "strict": true, 
    "skipLibCheck": true,

    // Added
    "jsx": "react", 
    "module": "ESNext",  
    "declaration": true,
    "declarationDir": "types",
    "sourceMap": true,
    "outDir": "dist",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "emitDeclarationOnly": true,
  }
}

npm install rollup @rollup/plugin-node-resolve @rollup/plugin-typescript
@rollup/plugin-commonjs rollup-plugin-dts --save-dev



3) mske compobnebnts

4) npm run rollup


