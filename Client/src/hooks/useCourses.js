// src/hooks/useCourses.js
import { useContext } from 'react';
import { CourseContext } from '../context/CourseContextCreator';

export const useCourses = () => {
    const context = useContext(CourseContext);

    if (!context) {
        throw new Error('useCourses must be used within a CourseProvider');
    }

    return context;
};
