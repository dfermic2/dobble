import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./RulesPage.css";

function RulesPage() {
  return (
    <div className="rules-page-container">
      <Navbar />
      <section className="rules-page-hero-container">
        <div className="rules-page-hero">
          <div className="rules-page-hero-text">
            <h1 className="header-font">Learn the rules!</h1>
            <p>
              Dobble is simple to play, but there are a few things you should
              know before getting started. Luckily you're in the right place!
              This page will teach you everything you need to know in just a
              couple of minutes.
            </p>
          </div>
          <div className="rules-page-hero-img">
            <img src="../../../images/rules/rules-book.png" alt="rules book" />
          </div>
        </div>
      </section>
      <div className="basic-rules-container-bg">
        <section className="basic-rules-container">
          <div className="basic-rules">
            <div className="basic-rules-info">
              <h1 className="header-font">Classic rules</h1>
              <p>
                Let's start with the essentials: how to set up the game, play
                each round, and keep score. In this section, you'll find
                everything you need to enjoy a traditional game of Dobble.
              </p>
            </div>
            <div className="basic-rules-cards-container">
              <div className="rules-card">
                <h1 className="header-font">Setup</h1>
                <p>
                  Each player gets a card that is placed face down in front of
                  them. The rest of the deck is then placed face-up in the
                  center of the table.
                </p>
              </div>
              <div className="rules-card">
                <h1 className="header-font">Gameplay</h1>
                <p>
                  All players turn their cards at the same time and start
                  matching. The goal is to find the symbol that is identical
                  between their card and the card on top of the deck.
                </p>
              </div>
              <div className="rules-card">
                <h1 className="header-font">Scoring</h1>
                <p>
                  The first player to correctly match their card to the one in
                  the middle of the table, calls out their symbol and takes the
                  card from the deck. At the end, whoever has the most cards
                  wins!
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="game-illustration-container">
        <div className="game-illustration">
          <div className="rules-dobble-card">
            <img
              src="../../../images/rules/rules-card1.png"
              alt="dobble card"
            />
          </div>
          <div className="rules-dobble-card">
            <img
              src="../../../images/rules/rules-card2.png"
              alt="dobble card"
            />
          </div>
        </div>
      </section>

      <div className="online-rules-container-bg">
        <section className="online-rules-container">
          <div className="online-rules">
            <div className="online-rules-text">
              <h1 className="header-font">Online rules</h1>
              <p>
                Dobble can also be played online with friends! The basic rules
                stay the same: spot the matching symbol faster than anyone else
                to score points. But, there are a few differences you should
                know.
              </p>
            </div>
            <div className="online-rules-cards-container">
              <div className="rules-card">
                <h1 className="header-font">The rooms</h1>
                <p>
                  The first step of online Dobble is creating a room. You simply
                  type a username, pick out a fun avatar and click the "Create
                  room" button. If you are joining instead, paste your room code
                  and click "Join room".
                </p>
              </div>
              <div className="rules-card">
                <h1 className="header-font">Friends</h1>
                <p>
                  If you want, you can play alone. But, the game is much more
                  exciting with some competition. To get your friends to join,
                  copy the room code and share it. Then set the number of rounds
                  and icons and you are ready to play!
                </p>
              </div>
              <div className="rules-card">
                <h1 className="header-font">Points</h1>
                <p>
                  You will all get the same set of cards each round. Whoever
                  guesses the matching icon the fastest gets one point. But, be
                  careful, guessing inocorrectly will cost you 0.5 point.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default RulesPage;
