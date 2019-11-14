# Setup

##### Instalação de dependecias (MySQL, Node.js, Yarn, etc.)
```sudo apt install build-essential mysql-server mysql-client libmysqlclient-dev nodejs yarn```

##### Inicia o MySQL sempre que iniciar o linux
```
sudo service mysql start
systemctl enable mysql
```

##### Download
```git clone https://github.com/ODevBolsomito/projeto_fascista_opressor.git ccdc```
##### Entra no diretório
```cd ccdc```
##### Instala dependencias
```yarn```
##### Inicia o MYSQL
```sudo service mysql start```

##### Inicia a interface WEB
```yarn client```
##### Inicia o servidor HTTP
```yarn server```
##### Inicia o servidor MQTT e o Subscriber
```yarn mqtt```
##### Inicia os 3 (Alternativa)
```yarn start```

Em ```build/``` está o codigo JS compilado
Em ```src/firmware``` está o codigo da nodemcu
É necessário alterar a configuração da rede
```
ssid
password
mqtt_server
```