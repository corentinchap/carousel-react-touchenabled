import React from 'react';
import logo from './logo.svg';
import Carousel from './Carousel';
import './styles.scss';


function App() {
  return (
    <div className="App">
      <Carousel>
      <>
      <span className="slide">Slide 1</span>
      </>
      <>
      <span className="slide">Slide 2</span>
      </>
      <>
      <span className="slide">Slide 3</span>
      </>
      <>
      <span className="slide">Slide 4</span>
      </>
      </Carousel>
    </div>
  );
}



export default App;
