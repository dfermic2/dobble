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
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus
              porro, quidem praesentium, voluptatem neque aperiam repellat est
              cupiditate quam id blanditiis non ullam quibusdam iste unde quas
              soluta ipsam nihil.
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
              <h1 className="header-font">Basic rules</h1>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est
                adipisci, quia ullam quaerat nam unde commodi iusto incidunt
                consequuntur recusandae minus repellat suscipit. At facere
                inventore cupiditate ipsam nam quam!
              </p>
            </div>
            <div className="basic-rules-cards-container">
              <div className="rules-card">
                <h1 className="header-font">Setup</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Quasi nobis fuga fugit tempora earum blanditiis expedita
                  aperiam, non vero perspiciatis accusamus omnis debitis
                  quisquam error veritatis dicta modi enim maxime!
                </p>
              </div>
              <div className="rules-card">
                <h1 className="header-font">Gameplay</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Quasi nobis fuga fugit tempora earum blanditiis expedita
                  aperiam, non vero perspiciatis accusamus omnis debitis
                  quisquam error veritatis dicta modi enim maxime!
                </p>
              </div>
              <div className="rules-card">
                <h1 className="header-font">Scoring</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Quasi nobis fuga fugit tempora earum blanditiis expedita
                  aperiam, non vero perspiciatis accusamus omnis debitis
                  quisquam error veritatis dicta modi enim maxime!
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
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum
                minus voluptatum iusto corporis sequi, dolor accusamus, debitis
                voluptas molestiae provident neque quo delectus et optio
                cupiditate laudantium, nesciunt quam maiores!
              </p>
            </div>
            <div className="online-rules-cards-container">
              <div className="rules-card">
                <h1 className="header-font">The rooms</h1>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Soluta animi voluptatum ex, quo voluptate quibusdam corporis
                  porro est fugiat in, ducimus magni cumque voluptates ad fugit
                  ullam facilis. Ratione, ut.
                </p>
              </div>
              <div className="rules-card">
                <h1 className="header-font">Friends</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nesciunt quaerat consequuntur temporibus quae excepturi ad
                  unde corrupti sunt sequi, laborum, perspiciatis aliquid
                  reiciendis atque ipsum, voluptate harum esse nam libero?
                </p>
              </div>
              <div className="rules-card">
                <h1 className="header-font">Points</h1>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo
                  vel cum modi, doloremque nobis adipisci voluptatem saepe quis
                  mollitia in distinctio, quaerat magni commodi temporibus sequi
                  reprehenderit, eos unde neque!
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
