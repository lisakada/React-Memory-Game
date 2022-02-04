import React from 'react';
import './MemoryCardBack.css'; 
import './MemoryCard.css'


class MemoryCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isFlipped: false };
    }
    clickHandler = () => {
    this.setState({isFlipped:!this.state.isFlipped});
    }
  
    render(){
        var memoryCardInnerClass='MemoryCardInner';
        if(this.props.isFlipped ){ memoryCardInnerClass += " flipped"}
            
  return(
      <div className='MemoryCard' onClick={this.props.pickCard}>
          <div className={memoryCardInnerClass}>
             <div className='MemoryCardBack'>
             <img src="https://www.digitalcrafts.com/img/digitalcrafts-logo-white-y.png"  alt=""/>
             </div>
             <div className='MemoryCardFront'>{this.props.symbol}</div>
           </div>
        </div>
  );
};
clickHandler() {
    this.setState({isFlipped: !this.state.isFlipped});
    console.log(this.state);
}
}

export default MemoryCard;
