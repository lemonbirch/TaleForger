// utils.ts

// utils.ts

export const sendFormData = async (formData: FormData) => {
    try {
        const response = await fetch('http://localhost:3001/api/submitFormData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Failed to submit form data');
        }

        console.log('Form data submitted successfully!');
        return await response.json(); // If expecting JSON response
    } catch (error) {
        console.error('Error submitting form data:', error);
        throw error; // Propagate the error to handle in calling component
    }
};

