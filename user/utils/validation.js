// utils/validation.js
export const validateCourseField = ({ field, value, relatedValue }) => {
    const numValue = Number(value);
    const numRelated = relatedValue != null ? Number(relatedValue) : null;

    let error = false;
    let errorMessage = '';
    let validatedValue = numValue;
    

    switch (field) {
        case 'creditHours':
            if (numValue < 0) {
                validatedValue = 0;
                error = true;
                errorMessage = 'Credit hours cannot be negative';
            } else if (numValue > 4) {
                validatedValue = 4;
                error = true;
                errorMessage = 'Credit hours cannot exceed 4';
            }
            break;

        case 'gpa':
        case 'cgpa':
            if (numValue < 0) {
                validatedValue = 0;
                error = true;
                errorMessage = `${field.toUpperCase()} cannot be negative`;
            } else if (numValue > 4) {
                validatedValue = 4;
                error = true;
                errorMessage = `${field.toUpperCase()} cannot exceed 4.0`;
            }
            break;
        case 'toalCredits':
            if(numValue<0){
                validatedValue=0;
                error=true;
                errorMessage='Total credits cannot be negative';
            }
            else if(numValue>200){
                validatedValue=200;
                error=true;
                errorMessage='Total credits seems too high';
            }

        case 'marks':
            if (numValue < 0) {
                validatedValue = 0;
                error = true;
                errorMessage = 'Marks cannot be negative';
            } else if (numRelated != null && numValue > numRelated) {
                validatedValue = numRelated;
                error = true;
                errorMessage = 'Obtained marks cannot exceed total marks';
            } else if (numValue > 1200) {
                validatedValue = 1200;
                error = true;
                errorMessage = 'Marks cannot exceed 1200';
            }
            break;

        default:
            validatedValue = value;
            break;
    }

    return { value: validatedValue, error, errorMessage };
};
