import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ScrollToTop from "../../utils/SrollToTop";
import "./PrintPage.css";

function PrintPage() {
  return (
    <div>
      <ScrollToTop />
      <div className="print-container">
        <div className="print-hero-bg">
          <div className="print-hero-nav">
            <Navbar />
            <section className="print-hero">
              <div className="print-hero-text">
                <h1 className="header-font">Print the deck!</h1>
                <p>
                  Get your own Dobble card deck and enjoy a fun game with family
                  and friends. Just download the PDF, print it, cut out the
                  cards, and start matching!
                </p>
                <button className="btn header-font play-button">
                  <a
                    href="https://github.com/dfermic2/dobble-assets/releases/download/v1.0.0/DobbleDeck.pdf"
                    download="DobbleDeck.pdf"
                  >
                    Download
                  </a>
                </button>
              </div>
            </section>
          </div>
        </div>

        <section className="download">
          <div className="print-text">
            <h1 className="header-font">Download</h1>
            <p>
              Start by downloading your free Dobble deck in PDF format. Click
              the button above and you'll have everything you need to play the
              game at home.
            </p>
          </div>
          <div className="print-img">
            <img src="../../../images/print/download.svg" alt="illustration" />
          </div>
        </section>

        <div className="dash">
          <img src="../../../images/print/dash1.svg" alt="dashed line" />
        </div>

        <section className="print">
          <div className="print-img">
            <img src="../../../images/print/print.svg" alt="illustration" />
          </div>
          <div className="print-text">
            <h1 className="header-font">Print</h1>
            <p>
              Once you've got the PDF, it's time to bring the cards to life!
              Print the deck at home or at a print shop. For a sturdier feel, we
              recommend using thicker paper.
            </p>
          </div>
        </section>

        <div className="dash">
          <img src="../../../images/print/dash2.svg" alt="dashed line" />
        </div>

        <section className="cut-out">
          <div className="print-text">
            <h1 className="header-font">Cut out</h1>
            <p>
              Your final step is cutting out your cards! Take your time and
              follow the outlines. Once you're done, you'll have your own
              physical Dobble deck, ready play, and enjoy with friends and
              family.
            </p>
          </div>
          <div className="print-img">
            <img src="../../../images/print/cut.svg" alt="illustration" />
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default PrintPage;
