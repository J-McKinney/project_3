import React, { Component } from 'react';

class ChildDashboard extends Component {
    render() {
        return (
            <>
            <div className="features-3">
          <div className="row">
            <div className="col-md-4">
              <div className="phone-container">
                  <div>Placeholder Image</div>
                <img src="./assets/img/sections/iphone.png" alt="placeholder"/>
              </div>
            </div>
            <div className="col-md-8">
            <div className="row">
              <div className="bd-example">
            <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="../assets/img/bg0.jpg" className="d-block w-100" alt="game"/>
                    <div className="carousel-caption d-none d-md-block">
                    <h5>First slide label</h5>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </div>
                </div>
                <div className="carousel-item">
                <img src="../assets/img/dg2.jpg" className="d-block w-100" alt="game"/>
                    <div className="carousel-caption d-none d-md-block">
                    <h5>Second slide label</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                </div>
                <div className="carousel-item">
                <img src="../assets/img/dg6.jpg" className="d-block w-100" alt="game"/>
                    <div className="carousel-caption d-none d-md-block">
                    <h5>Third slide label</h5>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </div>
                </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
                </a>
            </div>
            </div>
            </div>
            <div className="row">
              <div className="info info-horizontal">
                <div className="icon icon-primary">
                  <i className="material-icons">extension</i>
                </div>
                <div className="description">
                  <h4 className="info-title">Stats</h4>
                  <p>Check your gaming history and stats.</p>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>    
            
            </>
        );
    }
}

export default ChildDashboard;