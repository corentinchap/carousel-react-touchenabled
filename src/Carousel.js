import React, {Component} from 'react';


// Data for carousel

// Component for left arrow
const CarouselLeftArrow = (props) => {
  const {onClick} = props;
 
    return (
      <button onClick={onClick} className="control prev"></button>
    );
  
}

// Component for right arrow
const CarouselRightArrow = (props) => {
  return (
    <button onClick={props.onClick} className="control next"></button>
  );
  
}

// Component for slide
const CarouselSlide = (props) => {
    return props.slide
}

// Carousel component
class Carousel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      threshold: 100,
      index: 0,
      allowShift: true,
      cloneFirst: React.cloneElement(this.props.children[this.props.children.length - 1]),
      cloneLast: React.cloneElement(this.props.children[0])
    };    

    this.posX1 = 0;
    this.posX2 = 0;
    this.slides = this.props.children;
    this.slidesLength = 0;
    this.slideSize = 0;
    this.posInitial = 0;
    this.posFinal = 0;
    this.items = "";
  }
  componentDidMount(){
    this.items = document.getElementById("slides");
    this.slidesLength = this.slides.length;
    this.slideSize = this.items.children[0].offsetWidth;
  }

  dragStart = (e) => {
    e = e || window.event;
    e.preventDefault();
    
    this.posInitial = this.items.offsetLeft;
   
    if (e.type === 'touchstart') {
      this.posX1 = e.touches[0].clientX;
    } else {
      this.posX1 = e.clientX;
      document.onmouseup = this.dragEnd;
      document.onmousemove = this.dragAction;
    }
  }

  dragAction = (e) => {
    e = e || window.event;
    
    if (e.type === 'touchmove') {
      this.posX2 = this.posX1 - e.touches[0].clientX;
      this.posX1 = e.touches[0].clientX;
    } else {
      this.posX2 = this.posX1 - e.clientX;
      this.posX1 = e.clientX;
    }
    this.items.style.left = (this.items.offsetLeft - this.posX2) + "px";
  }

  dragEnd = (e) => {
    this.posFinal = this.items.offsetLeft;
    if (this.posFinal - this.posInitial < -this.state.threshold) {
      this.shiftSlide(1, 'drag');
    } else if (this.posFinal - this.posInitial > this.state.threshold) {
      this.shiftSlide(-1, 'drag');
    } else {
      this.items.style.left = (this.posInitial) + "px";
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }

  shiftSlide = (dir, action) => {

    this.items.classList.add('shifting');

    if (this.state.allowShift) {
      if (!action) { this.posInitial = this.items.offsetLeft; }

      if (dir === 1) {
        this.items.style.left = (this.posInitial - this.slideSize) + "px";
        this.setState((prev) => {
          prev.index++
        });      
      } else if (dir === -1) {
        this.items.style.left = (this.posInitial + this.slideSize) + "px";
        this.setState((prev) => {
          prev.index--
        });      
      }
    };
    
    this.setState({allowShift : false});
  }
  

  checkIndex = () => {
    this.items.classList.remove('shifting');

    if (this.state.index === -1) {
      this.items.style.left = -(this.slidesLength * this.slideSize) + "px";
      let index = this.slidesLength - 1;
      this.setState({index});
    }

    if (this.state.index === this.slidesLength) {
      this.items.style.left = -(1 * this.slideSize) + "px";
      this.setState({index:0});
    }
    
    this.setState({allowShift: true});
  }

  render() {
    return (
      <div id="slider" className="slider">
        <div className="wrapper">
          <div onMouseDown={(e) => this.dragStart(e)} 
            onTouchStart={(e) => this.dragStart(e)} id="slides" className="slides"
            onTouchEnd={(e) => this.dragStart(e)}
            onTouchMove={(e) => this.dragStart(e)}
            onTransitionEnd={this.checkIndex}
            >
            {this.state.cloneFirst}
            {this.props.children.map((slide, index) =>
              <CarouselSlide
                key={index}
                index={index}
                activeIndex={this.state.activeIndex}
                slide={slide}
              />
            )}
            {this.state.cloneLast}
          </div>
        </div>

        <CarouselLeftArrow onClick={e => this.shiftSlide(-1)} />
        <CarouselRightArrow onClick={e => this.shiftSlide(1)} />

      </div>
    );
  }
}

// Render Carousel component
export default Carousel;