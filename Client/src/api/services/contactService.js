// contactService.js
import api from '../axios';

// Submit contact form
const submitContactForm = async (contactData) => {
    return await api.post('/contact', contactData);
};

export default {
    submitContactForm
};
