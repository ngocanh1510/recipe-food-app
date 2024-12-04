
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('recipes.db');

export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Create recipes table
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, image TEXT);',
        [],
        () => {
          // Create steps table with foreign key to recipes
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS steps (id INTEGER PRIMARY KEY AUTOINCREMENT, recipeId INTEGER, stepNumber INTEGER, title TEXT, description TEXT, image TEXT, FOREIGN KEY(recipeId) REFERENCES recipes(id));',
            [],
            () => resolve(),
            (_, error) => reject(error)
          );
        },
        (_, error) => reject(error)
      );
    });
  });
};

export const saveRecipe = (recipe, steps) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO recipes (title, description, image) VALUES (?, ?, ?);',
        [recipe.title || '', recipe.description || '', recipe.image || ''],
        (_, { insertId }) => {
          const stepPromises = steps.map((step, index) => {
            return new Promise((resolveStep, rejectStep) => {
              tx.executeSql(
                'INSERT INTO steps (recipeId, stepNumber, title, description, image) VALUES (?, ?, ?, ?, ?);',
                [insertId, index + 1, step.title, step.description, step.image || ''],
                () => resolveStep(),
                (_, error) => rejectStep(error)
              );
            });
          });

          Promise.all(stepPromises)
            .then(() => resolve(insertId))
            .catch(error => reject(error));
        },
        (_, error) => reject(error)
      );
    });
  });
};