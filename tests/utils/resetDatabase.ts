import shell from 'shelljs';

const resetDatabase = (): void => {
  shell.exec("NODE_ENV=test npx sequelize db:drop && NODE_ENV=test npx sequelize db:create && NODE_ENV=test npx sequelize db:migrate && NODE_ENV=test npx sequelize db:seed:all")
}

export default resetDatabase;