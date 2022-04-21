import axios from "axios";


export default class NewsApiService {
    constructor () {
        this.userInput = '';
        this.page = 1;
    }
    async getImage () {

        const BASE_URL = 'https://pixabay.com/api/';
        const options = `?key=26835433-5e813848e8d233e22f218db79&q=${this.userInput}&image_type=photo&orientation=horizontal&safesearch=true`;
        const pagination = `page=${this.page}&per_page=40`
        

        if (this.userInput !== "")
        try {
          const response = await axios.get(`${BASE_URL}${options}&${pagination}`);

        this.page += 1;

        const data = response.data
        console.log(data)
        return data;
           
        } catch (error) {
          console.error(error);
        }
    }
    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.userInput;
    }

    set query(newQuerry) {
        this.userInput = newQuerry;
    }
}