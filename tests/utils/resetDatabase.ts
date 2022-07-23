import shell from 'shelljs';

const resetDatabase = (): void => {
  shell.exec("npx sequelize db:drop && npx sequelize db:create && npx sequelize db:migrate && npx sequelize db:seed:all")
}

export default resetDatabase;