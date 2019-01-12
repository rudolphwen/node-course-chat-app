const expect = require('expect');

const {isRealString} = require('./validation');

// isRealString
    // should reject non-string values
    // should reject string with only spaces
    // should allow string with non-space characters
describe('isRealString', () => {
    it('should reject non-string values', () => {
        let params = 123;
        let result = isRealString(params);
        expect(result).toBe(false);
    });

    it('should reject string with only spaces', () => {
        let response = isRealString('     ');
        expect(response).toBe(false);
    });

    it('should allow string with non-space characters', () => {
        let res = isRealString('   Peter      ');
        expect(res).toBe(true);
    });
});