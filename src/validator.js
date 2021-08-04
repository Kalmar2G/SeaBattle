import { body, query } from 'express-validator';

const SHIPSCOUNT = 2;
const idValidator = [
  query('id', 'Identifier consists of 8 digits').exists().isNumeric().isLength({ min: 8, max: 8 }),
];

const fieldValidator = [
  body().exists().isArray({ min: SHIPSCOUNT }).withMessage(`You must send array with ${SHIPSCOUNT} ships`),
];

const hitValidator = [
  query('x', 'X is a number between 0 and 9').exists().isNumeric().isLength({ min: 1, max: 1 }),
  query('y', 'Y is a number between 0 and 9').exists().isNumeric().isLength({ min: 1, max: 1 }),
];
export { idValidator, fieldValidator, hitValidator };
