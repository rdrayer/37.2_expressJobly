const { sqlForPartialUpdate } = require('./sql');
const { BadRequestError } = require('../expressError');

describe('sqlForPartialUpdate', function () {
    test('should take in input and update sql', function () {
        const dataToUpdate = { firstName: 'Aliya', age: 32 } 
        const jsToSql = { firstName: 'first_name' }
        const result = sqlForPartialUpdate(dataToUpdate, jsToSql);

        expect(result).toEqual({
            setCols: '"first_name"=$1, "age"=$2',
            values: ['Aliya', 32]
        });
    });

    test('throw BadRequestError if data is insufficient', function () {
        const dataToUpdate = {};
        const jsToSql = {};

        expect(function () {
            sqlForPartialUpdate(dataToUpdate, jsToSql);
        }).toThrow(BadRequestError);
    });
});