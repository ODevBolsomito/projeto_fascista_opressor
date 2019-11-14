# Setup

##### Instalação de dependecias (MySQL, Node.js, Yarn, etc.)
```sudo apt install build-essential mysql-server mysql-client libmysqlclient-dev nodejs yarn```

##### Inicia o MySQL sempre que iniciar o linux
```
sudo service mysql start
systemctl enable mysql
```

##### Download e instalação
```git clone https://github.com/ODevBolsomito/projeto_fascista_opressor.git ccdc```
```cd ccdc```
```yarn```
```sudo service mysql start```

```yarn client```
```yarn server```
```yarn mqtt```
ou
```yarn start```

em build/ está o codigo JS compilado

No src/firmware está o codigo da nodemcu
É necessário alterar a configuração da rede

ssid
password
mqtt_server