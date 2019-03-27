import React, { Fragment } from "react";

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      turnCard: this.props.isActive
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isActive !== prevProps.isActive) {
      this.setState({ turnCard: this.props.isActive });
    }
  }

  render() {
    return (
      <Fragment>
        <div className="scene scene--card">
          <div
            onClick={
              this.props.count < 2
                ? () => this.props.onClickCard(this.props.cardInfo)
                : null
            }
            className={`card ${!this.state.turnCard ? "is-flipped" : ""}`}
          >
            <div className="card__face card__face--front">
              <img className="cardImage" src={this.props.src} />
            </div>
            <div className="card__face card__face--back" />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Card;
