import { baseUrl } from "./index";

export default {
    getAllForms: async () => {
        try {
            const responseAsBlob = await fetch(`${baseUrl}/form`, {
                credentials: 'include',
            });
            const response = await responseAsBlob.json();
            return response
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    getOneForm: async (id) => {
        try {
            const responseAsBlob = await fetch(`${baseUrl}/form/${id}`, {
                credentials: 'include',
            });
            const response = await responseAsBlob.json();
            return response
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    createNewForm: form => {
        fetch(`${baseUrl}/form`, {
            method: 'POST',
            body: form
          })
            .then(response => {
              if (response.ok) {
                console.log('File uploaded successfully');
                
              } else {
                console.error('Error uploading file:', response.statusText);
                
              }
            })
            .catch(error => {
              console.error('Error uploading file:', error);
              
            });
    },
    createImg: async form => {
        try {
            const responseAsBlob = await fetch(`${baseUrl}/form`, {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(form),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const response = await responseAsBlob.json();
            return response
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    editForm: async (form, id) => {
        try {
            const responseAsBlob = await fetch(`${baseUrl}/form/${id}`, {
                credentials: 'include',
                method: 'PUT',
                body: JSON.stringify(form),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const response = await responseAsBlob.json();
            return response
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    deleteForm: async (id) => {
        try {
            await fetch(`${baseUrl}/form/${id}`, {
                credentials: 'include',
                method: 'DELETE'
            });
            
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}