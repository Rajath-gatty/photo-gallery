import React, { Component } from 'react';
import axios from 'axios';
import './Photos.css'
import Photo from './Photo/Photo';
import Spinner from '../Components/UI/Spinner';

class Photos extends Component {
    state = {
        photo: [],
        text: ' ',
        loading: false,
        default: 'nature',
        noResults: false
    }

    componentDidMount() {
        this.setState({ loading: true })
        axios.get(`https://pixabay.com/api/?key=8164128-0523e5af06f5e320b4e252357&q=${this.state.default}&per_page=50`)
            .then(res => {
                this.setState({ photo: res.data.hits, loading: false })
            })
            .catch(err => {
                console.log(err)
                this.setState({ loading: false, error: true })
            })
    }


    formSubmitHandler = (e) => {
        e.preventDefault();
        this.setState({ loading: true })
        axios.get(`https://pixabay.com/api/?key=8164128-0523e5af06f5e320b4e252357&q=${this.state.text}&per_page=50`)
            .then(res => {
                if (res.data.hits.length === 0) {
                    this.setState({ noResults: true })
                } else {
                    this.setState({ photo: res.data.hits, noResults: false })
                }
                this.setState({ loading: false })
            })
            .catch(err => {
                console.log(err)
                this.setState({ loading: false, error: true })
            })
    }

    render() {
        let photos = <Spinner />
        let footer = <footer className="footer"> &copy; Image Gallery - Rajath | All rights reserved </footer>

        if (!this.state.loading) {

            photos = this.state.photo.map(photo => {
                return <Photo key={photo.id}
                    image={photo.largeImageURL}
                    downloads={photo.downloads}
                    likes={photo.likes}
                    visitPage={photo.pageURL} />
            })
        } else {
            footer = null;
        }
        if (this.state.noResults) {
            footer = null;
            photos = <p className="noResults">No results Found</p>

        }

        if (this.state.error) {
            footer = null;
            photos = <p className="noResults">Error! Check your internet connection</p>
        }


        return (
            <div>
                <div className="grid">
                    {photos}
                </div>
                <form onSubmit={this.formSubmitHandler}>
                    <input type="text" placeholder="Search" onChange={(e) => this.setState({ text: e.target.value })} />
                    <button>Search</button>
                </form>
                {footer}
            </div>
        );

    }
}

export default Photos;