import formApi from './form'
import authorApi from './author'
import bookApi from './book'

export const baseUrl = 'http://localhost:3000'

export default {
    form: formApi,
    author: authorApi,
    book: bookApi
}
