# Taskit Mobile

## Setup: Install & Run

1. Instale as dependências rodando um dos comandos abaixo:

    ```sh
    yarn
    ```

    ou

    ```sh
    npm install
    ```

2. Inicie a aplicação web
3. Inicie a aplicação mobile

    ```sh
    yarn android # para android
    ```

    ou

    ```sh
    yarn ios     # para ios
    ```

> É necessário ter o emulador aberto ou um dispositivo conectado via USB, e com a depuração USB ativada.

> Para dispositivos iOS, é necessário o sistema macOS e ter o XCode instalado.


## Setup: Build

1. Instale a dependência de build

    ```sh
    npm install -g eas-cli
    ```

2. Faça o login na sua conta do expo

    ```sh
    eas login
    ```

3. Faça o build da aplicação

    ```sh
    yarn build:android # para android
    ```

    ou

    ```sh
    yarn build:ios     # para ios
    ```
