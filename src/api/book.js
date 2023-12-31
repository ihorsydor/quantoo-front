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
    createNewBook: book => {
      console.log(book)
        fetch(`${baseUrl}/book`, {
                      method: 'POST',
            body: book
          })
          .then(response => {
            if (response.ok) {
                console.log('File uploaded successfully');
                return response.json();
            } else {
                throw new Error('Error uploading file: ' + response.statusText);
            }
        })
        .then(data => {
            // Tutaj otrzymasz dane JSON z serwera po przekonwertowaniu
            console.log(data);
        })
        .catch(error => {
            // Obsługa błędu
            console.error(error);
        });
    },
    editBook: async (_id, updatedBook) => {
        try {
          const response = await fetch(`${baseUrl}/book/${_id}`, {
            method: "POST",
            body: updatedBook,
          });
      
          if (response.ok) {
            console.log("Book edited successfully");
          } else {
            console.error("Error editing book:", response.statusText);
          }
        } catch (error) {
          console.error("Error editing book:", error);
        }
      },
    deleteBook: async (id, filename) => {
        try {
            await fetch(`${baseUrl}/book/${id}/${filename}`, {
                credentials: 'include',
                method: 'DELETE'
            });
            
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}