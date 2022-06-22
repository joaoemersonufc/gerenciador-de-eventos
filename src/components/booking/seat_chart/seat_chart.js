import React from 'react';
import './seat_chart.css';

class seat_chart extends React.Component {
  
    constructor() {
      super();
        this.state = {
        seat: [],
        seatAvailable: [],
        seatReserved: [],
        seatUnavailable:[]
      }
    }

    componentDidMount(){
      setTimeout(() => {
        this.setState({
        seat: [this.props?.seats?.seatsAvailability?.map(seats => seats.seatKey)],
        seatAvailable: [this.props?.seats?.seatsAvailability?.map(seats => seats.available === true && seats.seatKey)],
        seatReserved: [],
        seatUnavailable:[ this.props?.seats?.seatsAvailability?.map(seats => seats.available !== true && seats.seatKey)]
      })
      }, 1000);
    }
    
    onClickData(seat) {
      if(this.state.seatReserved.indexOf(seat) > -1 ) {
        this.setState({
          seatAvailable: this.state.seatAvailable.concat(seat),
          seatReserved: this.state.seatReserved.filter(res => res !== seat)
        })
      } else {
        this.setState({
          seatReserved: this.state.seatReserved.concat(seat),
          seatAvailable: this.state.seatAvailable.filter(res => res !== seat)
        })
      }
    }
    
    render() {
      localStorage.setItem('@seats', this.state.seatReserved);
      console.log(this.state.seatUnavailable)
      return (
        <div>
          <h4>Reserve seu lugar</h4>
          <DrawGrid 
            seat = { this.state.seat }
            available = { this.state.seatAvailable }
            reserved = { this.state.seatReserved }
            unavailable = {this.state.seatUnavailable}
            onClickData = { this.onClickData.bind(this) }
            />
        </div>
      )
    }
  }

  export default seat_chart
  
  class DrawGrid extends React.Component {
    render() {
      return (
         <div className="container">
          <table className="grid">
            <tbody>
              { this.props?.seat?.map((numList,i) => (
                <tr key={i}>
                { numList?.map ( seat_no =>
                {
                  return <td 
                    className={this.props.unavailable[0]?.includes(seat_no) ? 'unavailable': this.props.reserved.indexOf(seat_no) > -1? 'reserved': 'available'}
                    key={seat_no} onClick = {e => this.onClickSeat(seat_no)}>{seat_no} 
                  </td>
                }
                )}
                </tr>
              ))
              }
            </tbody>
          </table>
          
          {/* <AvailableList available = { this.props.available } />
          <ReservedList reserved = { this.props.reserved } /> */}
         </div>
      )
    }
    
    onClickSeat(seat) {
      this.props.onClickData(seat);
    }
  }
