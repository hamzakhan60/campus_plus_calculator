import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { validateCourseField } from '@/utils/validation';

export const useCourses = () => {
    const [courses, setCourses] = useState([{
        id: 1,
        subjectName: '',
        creditHours: '',
        hasLab: false,
        isExpanded: true,
        theory: {
            quizzes: [{ id: uuidv4(), totalMarks: '', obtainedMarks: '' }],
            assignments: [{ id: uuidv4(), totalMarks: '', obtainedMarks: '' }],
            midterm: { totalMarks: '', obtainedMarks: '' },
            finalterm: { totalMarks: '', obtainedMarks: '' }
        },
        lab: {
            quizzes: [{ id: uuidv4(), totalMarks: '', obtainedMarks: '' }],
            assignments: [{ id: uuidv4(), totalMarks: '', obtainedMarks: '' }],
            midterm: { totalMarks: '', obtainedMarks: '' },
            finalterm: { totalMarks: '', obtainedMarks: '' }
        }
    }]);

    // Functions
    const addCourse = useCallback(() => {
        const newCourse = {
            id: Date.now(),
            subjectName: '',
            creditHours: '',
            hasLab: false,
            isExpanded: true,
            theory: {
                quizzes: [{ id: uuidv4(), totalMarks: '', obtainedMarks: '' }],
                assignments: [{ id: uuidv4(), totalMarks: '', obtainedMarks: '' }],
                midterm: { totalMarks: '', obtainedMarks: '' },
                finalterm: { totalMarks: '', obtainedMarks: '' }
            },
            lab: {
                quizzes: [{ id: uuidv4(), totalMarks: '', obtainedMarks: '' }],
                assignments: [{ id: uuidv4(), totalMarks: '', obtainedMarks: '' }],
                midterm: { totalMarks: '', obtainedMarks: '' },
                finalterm: { totalMarks: '', obtainedMarks: '' }
            }
        };
        setCourses(prev => [...prev, newCourse]);
    }, []);
    const toggleCourse = useCallback((courseId) => {
        setCourses(prevCourses =>
            prevCourses.map(course => ({
                ...course,
                isExpanded: course.id === courseId ? !course.isExpanded : false
            }))
        );
    }, []);
    const updateCourse = useCallback((courseId, field, value) => {
        let validatedCreditHrs = null;
        if(field==='creditHours')
            validatedCreditHrs=validateCourseField({ field, value });
        console.log("Validated Credit Hours:", validatedCreditHrs);
        setCourses(prev => prev.map(course =>
            course.id === courseId ? { ...course, [field]: field==='creditHours' ? validatedCreditHrs.value :value} : course
        ));
    }, []);
    const updateAssessment = useCallback((courseId, section, type, itemId, field, value) => {
       let validatedvalue =null
        setCourses(prevCourses =>
            prevCourses.map(course => {
                if (course.id !== courseId) return validatedvalue;

                // For quizzes & assignments (array types)
                if (type === "quizzes" || type === "assignments") {
                    const currentItems = course[section][type];
                    let hasChanged = false;

                    const updatedItems = currentItems.map(item => {
                        if (item.id === itemId && item[field] !== value) {
                            validatedvalue= validateCourseField({ field: 'marks', value: value, relatedValue: field === 'obtainedMarks' ? item['totalMarks'] : null });
                            hasChanged = true;
                            console.log("Validated Value:", validatedvalue);
                            return { ...item, [field]:validatedvalue.error ? validatedvalue.value : value};
                            
                        }
                        return item;
                    });

                    // Only return updated course if something actually changed
                    if (!hasChanged) {
                        return course;
                    }

                    return {
                        ...course,
                        [section]: {
                            ...course[section],
                            [type]: updatedItems,
                        },
                    };
                }

                // For midterm & finalterm (single objects)
                if (type === "midterm" || type === "finalterm") {
                    const currentValue = course[section][type][field];
                    validatedvalue= validateCourseField({ field: 'marks', value: value, relatedValue: field === 'obtainedMarks' ? course[section][type]['totalMarks'] : null });

                    // Only update if value actually changed
                    if (currentValue === value) {
                        return validatedvalue;
                    }
                  
                    return {
                        ...course,
                        [section]: {
                            ...course[section],
                            [type]: {
                                ...course[section][type],
                                [field]: validatedvalue.error ? validatedvalue.value : value
                            }
                        }
                    };
                }

                return validatedvalue;
            })
        );
    }, []);
    const addAssessmentRow = useCallback((courseId, section, type) => {
        setCourses(prev => prev.map(course => {
            if (course.id === courseId) {
                const newItem = { id: uuidv4(), totalMarks: '', obtainedMarks: '' };
                return {
                    ...course,
                    [section]: {
                        ...course[section],
                        [type]: [...course[section][type], newItem]
                    }
                };
            }
            return course;
        }));
    }, []);
    const removeAssessmentRow = useCallback((courseId, section, type, assessmentId) => {
        setCourses(prev => prev.map(course => {
            if (course.id === courseId) {
                return {
                    ...course,
                    [section]: {
                        ...course[section],
                        [type]: course[section][type].filter(item => item.id !== assessmentId)
                    }
                };
            }
            return course;
        }));
    }, []);

    const removeCourse = useCallback((courseId) => {
        setCourses(prev => prev.filter(course => course.id !== courseId));
    }, []);


    return {
        courses,
        addCourse,
        toggleCourse,
        updateCourse,
        updateAssessment,
        addAssessmentRow,
        removeAssessmentRow,
        removeCourse,
    };
};
