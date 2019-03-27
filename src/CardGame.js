import React, { Fragment } from "react";
import axios from "axios";
import Card from "./Card";

class CardGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hits: [],
      count: 0,
      isLoading: false,
      clickedCard: [],
      countEqualsCard: 0
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://pixabay.com/api/?key=5707439-576ba9bbcdefa781f30c1cc40&image_type=photo&per_page=5&safesearch=true"
      )
      .then(res => {
        let concatHits = res.data.hits.slice();
        let hits = res.data.hits.concat(concatHits);
        let newHits = [];
        hits.map((hit, id) => {
          newHits.push({
            idImage: "hit_" + id,
            id: hit.id,
            src: hit.largeImageURL,
            active: true
          });
        });
        hits = this.shuffle(newHits);
        this.setState({ hits: hits, isLoading: true });
      })
      .catch(e => {
        throw e;
      });
  }

  shuffle = a => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.hits !== prevState.hits && this.state.isLoading) {
      setTimeout(() => {
        let stateHits = this.state.hits;
        this.state.hits.map((hit, index) => {
          stateHits[index].active = false;
        });

        this.setState({ isLoading: false, hits: stateHits });
      }, 3000);
    }
  }

  onClickCard = card => {
    let count = this.state.count;
    let stateHits = this.state.hits.slice();
    let clickedCard = this.state.clickedCard;
    if (count < 2) {
      this.state.hits.map((hit, index) => {
        if (card.idImage === hit.idImage) {
          stateHits[index].active = true;
          clickedCard.push(card.id);
        }
      });
      count++;
    }

    if (count === 2) {
      setTimeout(() => {
        stateHits = this.compareImage(clickedCard);
        this.setState({
          count: 0,
          clickedCard: [],
          hits: stateHits.newHit,
          countEqualsCard: stateHits.countEqualsCard
        });
      }, 2000);
    }
    this.setState({
      count: count,
      clickedCard: clickedCard,
      hits: stateHits
    });
  };

  compareImage = clickedCard => {
    let newHit = this.state.hits.slice();
    let countEqualsCard = this.state.countEqualsCard;
    if (clickedCard[0] === clickedCard[1]) {
      this.state.hits.map((hit, index) => {
        if (hit.id === clickedCard[0]) {
          newHit[index].active = true;
          countEqualsCard++;
        }
      });
    } else {
      this.state.hits.map((hit, index) => {
        clickedCard.map(id => {
          if (id === hit.id) {
            newHit[index].active = false;
          }
        });
      });
    }

    return { newHit: newHit, countEqualsCard: countEqualsCard };
  };

  render() {
    return (
      <Fragment>
        {this.state.hits.length > 0 && (
          <div>
            <div className="cardContainer">
              {this.state.countEqualsCard < 10 &&
                this.state.hits.map((card, index) => {
                  return (
                    <Fragment key={"card" + index}>
                      <Card
                        src={card.src}
                        isActive={card.active}
                        cardInfo={card}
                        count={this.state.count}
                        onClickCard={this.onClickCard}
                      />
                    </Fragment>
                  );
                })}
              {this.state.countEqualsCard === 10 && (
                <h1 style={{ color: "green" }}>YOU WIN !</h1>
              )}
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default CardGame;
