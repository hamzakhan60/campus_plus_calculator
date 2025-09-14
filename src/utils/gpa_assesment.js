// GPA Calculation Functions
export const calculateSectionPercentage = (section) => {
    // Calculate total and obtained marks for each assessment type
    const getAssessmentTotal = (assessments) => {
        return assessments.reduce((sum, item) => {
            const total = parseFloat(item.totalMarks) || 0;
            const obtained = parseFloat(item.obtainedMarks) || 0;
            return {
                total: sum.total + total,
                obtained: sum.obtained + obtained
            };
        }, { total: 0, obtained: 0 });
    };

    const quizzes = getAssessmentTotal(section.quizzes);
    const assignments = getAssessmentTotal(section.assignments);
    const midterm = {
        total: parseFloat(section.midterm.totalMarks) || 0,
        obtained: parseFloat(section.midterm.obtainedMarks) || 0
    };
    const finalterm = {
        total: parseFloat(section.finalterm.totalMarks) || 0,
        obtained: parseFloat(section.finalterm.obtainedMarks) || 0
    };

    // Calculate percentage for each component
    const quizPercentage = quizzes.total > 0 ? (quizzes.obtained / quizzes.total) * 100 : 0;
    const assignmentPercentage = assignments.total > 0 ? (assignments.obtained / assignments.total) * 100 : 0;
    const midtermPercentage = midterm.total > 0 ? (midterm.obtained / midterm.total) * 100 : 0;
    const finaltermPercentage = finalterm.total > 0 ? (finalterm.obtained / finalterm.total) * 100 : 0;

    // Apply weightage
    const weightedPercentage = (assignmentPercentage * 0.10) +
        (quizPercentage * 0.15) +
        (midtermPercentage * 0.25) +
        (finaltermPercentage * 0.50);

    return weightedPercentage;
};


export const calculateLabPercentage = (labSection) => {
    // For lab: 25% assignments, 25% mids, 50% finals (no quizzes in lab weightage)
    const getAssessmentTotal = (assessments) => {
        return assessments.reduce((sum, item) => {
            const total = parseFloat(item.totalMarks) || 0;
            const obtained = parseFloat(item.obtainedMarks) || 0;
            return {
                total: sum.total + total,
                obtained: sum.obtained + obtained
            };
        }, { total: 0, obtained: 0 });
    };

    const assignments = getAssessmentTotal(labSection.assignments);
    const midterm = {
        total: parseFloat(labSection.midterm.totalMarks) || 0,
        obtained: parseFloat(labSection.midterm.obtainedMarks) || 0
    };
    const finalterm = {
        total: parseFloat(labSection.finalterm.totalMarks) || 0,
        obtained: parseFloat(labSection.finalterm.obtainedMarks) || 0
    };

    const assignmentPercentage = assignments.total > 0 ? (assignments.obtained / assignments.total) * 100 : 0;
    const midtermPercentage = midterm.total > 0 ? (midterm.obtained / midterm.total) * 100 : 0;
    const finaltermPercentage = finalterm.total > 0 ? (finalterm.obtained / finalterm.total) * 100 : 0;

    // Lab weightage: 25% assignments, 25% mids, 50% finals
    const labWeightedPercentage = (assignmentPercentage * 0.25) +
        (midtermPercentage * 0.25) +
        (finaltermPercentage * 0.50);

    return labWeightedPercentage;
};

export const calculateCourseGPA = (course) => {
    const creditHours = parseInt(course.creditHours) || 0;
    if (creditHours === 0) return 0;

    let finalPercentage = 0;

    if (!course.hasLab) {
        // No lab, theory is 100%
        finalPercentage = calculateSectionPercentage(course.theory);
    } else {
        // Has lab
        const theoryPercentage = calculateSectionPercentage(course.theory);
        const labPercentage = calculateLabPercentage(course.lab);

        if (creditHours === 4) {
            // Theory 75%, Lab 25%
            finalPercentage = (theoryPercentage * 0.75) + (labPercentage * 0.25);
        } else if (creditHours === 3) {
            // Theory 67%, Lab 33%
            finalPercentage = (theoryPercentage * 0.67) + (labPercentage * 0.33);
        } else {
            // Default to equal weightage for other credit hours
            finalPercentage = (theoryPercentage * 0.5) + (labPercentage * 0.5);
        }
    }

    // Convert percentage to GPA based on grading criteria
    return percentageToGPA(finalPercentage);
};

export const calculateCGPA = (courses) => {
    let totalGradePoints = 0;
    let totalCreditHours = 0;

    courses.forEach(course => {
        const creditHours = parseInt(course.creditHours) || 0;
        const gpa = calculateCourseGPA(course);

        if (creditHours > 0) {
            totalGradePoints += gpa * creditHours;
            totalCreditHours += creditHours;
        }
    });

    return totalCreditHours > 0 ? (totalGradePoints / totalCreditHours) : 0;
};


export const percentageToGPA = (percentage) => {
    if (percentage >= 85) return 4.00;
    if (percentage >= 80) return 3.66;
    if (percentage >= 75) return 3.33;
    if (percentage >= 71) return 3.00;
    if (percentage >= 68) return 2.66;
    if (percentage >= 64) return 2.33;
    if (percentage >= 61) return 2.00;
    if (percentage >= 58) return 1.66;
    if (percentage >= 54) return 1.33;
    if (percentage >= 50) return 1.00;
    return 0.00;
};