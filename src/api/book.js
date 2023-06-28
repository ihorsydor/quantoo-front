import { baseUrl } from "./index";

export default {
    getAllBooks: async () => {
        try {
            const responseAsBlob = await fetch(`${baseUrl}/book`, {
                credentials: 'include',
            });
            const response = await responseAsBlob.json();
            return response
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    getOneBook: async (id) => {
        try {
            const responseAsBlob = await fetch(`${baseUrl}/book/${id}`, {
                credentials: 'include',
            });
            const response = await responseAsBlob.json();
            return response
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    createNewBook: async book => {
        try {
            const responseAsBlob = await fetch(`${baseUrl}/book`, {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(book),
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
    editBook: async (book, id) => {
        try {
            const responseAsBlob = await fetch(`${baseUrl}/book/${id}`, {
                credentials: 'include',
                method: 'PUT',
                body: JSON.stringify(book),
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
    deleteBook: async (id) => {
        try {
            await fetch(`${baseUrl}/book/${id}`, {
                credentials: 'include',
                method: 'DELETE'
            });
            
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}