import React, { Component } from 'react';
import axios from 'axios';
import { Options } from '../templates';

class Breeds extends Component {
  state = {
    breeds: [],
    imgLabel: '',
    imgUrl: ''
  };

  getBreeds = this.getBreeds.bind(this);
  getFirstImage = this.getFirstImage.bind(this);

  filterBreeds(breeds) {
    const choiceBreeds = {
      hound: 'hound',
      retriever: 'retriever',
      terrier: 'terrier',
      poodle: 'poodle',
      setter: 'setter'
    };

    return breeds.filter(breed => choiceBreeds[breed]);
  }

  render() {
    return (
      <div>
        <Options
          title="Breeds"
          imgLabel={this.state.imgLabel}
          imgUrl={this.state.imgUrl}
          list={this.state.breeds}
        />
      </div>
    );
  }

  getBreeds() {
    axios
      .get('https://dog.ceo/api/breeds/list')
      .then(response => response.data.message)
      .then(breeds => this.filterBreeds(breeds))
      .then(filteredBreeds => {
        this.setState({
          breeds: filteredBreeds
        });
        return filteredBreeds;
      })
      .then(this.getFirstImage);
  }

  getFirstImage(dogs) {
    const firstDog = dogs[0];
    this.setState({ imgLabel: firstDog });
    axios
      .get(`https://dog.ceo/api/breed/${firstDog}/images/random`)
      .then(response => this.setState({ imgUrl: response.data.message }))
      .catch(error => console.log(error));
  }

  componentDidMount() {
    this.getBreeds();
  }
}

export default Breeds;
