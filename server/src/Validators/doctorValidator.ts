import { body, CustomValidator } from 'express-validator';
import { parsePhoneNumber } from 'libphonenumber-js';

// Custom validator for phone numbers
const isValidPhoneNumber: CustomValidator = (value) => {
    try {
        const phoneNumber = parsePhoneNumber(value, 'BD');
        return phoneNumber.isValid();
    } catch (error) {
        return false;
    }
};

// Custom validator to check for duplicates
const hasNoDuplicates: CustomValidator = (value) => {
    return Array.isArray(value) && new Set(value).size === value.length;
};

export const doctorValidationRules = [
    body('name').notEmpty().withMessage('Name is required').isLength({ min: 6 }).withMessage('Name should be at least 6 characters'),
    body('degrees')
        .isArray({ min: 1 }).withMessage('Degrees must be an array with at least one value')
        .custom(hasNoDuplicates).withMessage('Degrees must not contain duplicates'),
    body('degrees.*').isString().withMessage('Each degree must be a string'),
    body('designation').notEmpty().withMessage('Designation is required'),
    body('specialization').notEmpty().withMessage('Specialization is required'),
    body('phone')
        .isArray({ min: 1 }).withMessage('Phone must be an array with at least one value')
        .custom(hasNoDuplicates).withMessage('Phone numbers must not contain duplicates')
        .custom((phones) => phones.every(isValidPhoneNumber)).withMessage('Invalid phone number format'),
    body('phone.*').isString().withMessage('Each phone number must be a string'),
    body('bmdcNumber').notEmpty().withMessage('BMDC number is required'),
    body('digitalSignature').isString().withMessage('Digital signature must be a string'),
];
