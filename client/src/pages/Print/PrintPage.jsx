import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./PrintPage.css";

function PrintPage() {
  return (
    <div>
      <div className="print-container">
        <div className="print-hero-nav">
          <Navbar />
          <section className="print-hero">
            <h1 className="header-font">Print the deck!</h1>
            <p>Get your own Dobble deck here</p>
            <button className="btn header-font play-button">Download</button>
          </section>
        </div>

        <section className="download">
          <div className="print-text">
            <h1 className="header-font">Download</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
              amet adipisci mollitia cum distinctio vero iure reprehenderit
              nesciunt dolores quasi aut magni in, debitis placeat earum ullam
              dicta autem at?
            </p>
          </div>
          <div className="print-img">
            <img src="../../../images/print/download.svg" alt="illustration" />
          </div>
        </section>

        <section className="print">
          <div className="print-img">
            <img src="../../../images/print/print.svg" alt="illustration" />
          </div>
          <div className="print-text">
            <h1 className="header-font">Print</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
              amet adipisci mollitia cum distinctio vero iure reprehenderit
              nesciunt dolores quasi aut magni in, debitis placeat earum ullam
              dicta autem at?
            </p>
          </div>
        </section>

        <section className="cut-out">
          <div className="print-text">
            <h1 className="header-font">Cut out</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
              amet adipisci mollitia cum distinctio vero iure reprehenderit
              nesciunt dolores quasi aut magni in, debitis placeat earum ullam
              dicta autem at?
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
