# Setup

##### Instalação de dependecias (MySQL, Node.js, Yarn, etc.)
```sudo apt install build-essential mysql-server mysql-client libmysqlclient-dev nodejs yarn```

##### Inicia o MySQL sempre que iniciar o linux
```
sudo service mysql start
systemctl enable mysql
```

##### Download do repositório
```git clone https://github.com/EduardoFRRZ/EngComp_TCC_v1.git```

##### Instalação de dependecias do repositório (express, sequelize, etc.)
```
cd EngComp_TCC_v1
yarn
```

##### Inicia o servidor web(express) e a conexão com o banco de dados(sequelize)
```yarn dev```