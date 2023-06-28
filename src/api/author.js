import { baseUrl } from "./index";

export default {
    getAllAuthors: async () => {
        try {
            const responseAsBlob = await fetch(`${baseUrl}/author`, {
                credentials: 'include',
            });
            const response = await responseAsBlob.json();
            return response
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    getOneAuthor: async (id) => {
        try {
            const responseAsBlob = await fetch(`${baseUrl}/author/${id}`, {
                credentials: 'include',
            });
            const response = await responseAsBlob.json();
            return response
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    createNewAuthor: async author => {
        try {
            const responseAsBlob = await fetch(`${baseUrl}/author`, {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(author),
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
    editAuthor: async (author, id) => {
        try {
            const responseAsBlob = await fetch(`${baseUrl}/author/${id}`, {
                credentials: 'include',
                method: 'PUT',
                body: JSON.stringify(author),
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
    deleteAuthor: async (id) => {
        try {
            await fetch(`${baseUrl}/author/${id}`, {
                credentials: 'include',
                method: 'DELETE'
            });
            
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    searchAuthors: async (query) => {
        try {
          const responseAsBlob = await fetch(`${baseUrl}/author/search?query=${query}`, {
            credentials: 'include',
          });
          const response = await responseAsBlob.json();
          return response;
        } catch (error) {
          console.log(error);
          return [];
        }
      },
}