import React from "react";
import NavBar from "../NavBar";
import "../../App.css";
import "../../assets/css/material-kit.min.css";

function About() {
  return (
    <>
      <NavBar />
      <div className="experience-page sidebar-collapse">
        <div className="coppa-page page-header header-filter" data-parallax="true"></div>

        <div className="main main-raised">
          <div className="container">
            <div className="section text-center">
              <div className="row">
                <div className="col-md-8 ml-auto mr-auto">
                  <h2 className="title">About Us</h2>
                  <div className="description">
                    <div className="pull-left">
                      <h3>J-BOT's vision is to build the must-have web app for kids to LEARN, HAVE FUN, and STAY SAFE in an increasingly complex digital and social media age. Designed to supervise, manage, and protect your child's learning in a Monitored Online Learning Environment (M.O.L.E.).</h3>
                      <h3>The J-BOT web app is a Child Onlline Privacy Protection Act (COPPA) compliant learning application for kids under the age of 12. J-BOT is simple to use! With the help of their parent or guardian, children quickly begin their educational journey. Stay up to date with your child’s progress with J-BOT's Parental Dashboard. See up to date improvements and skill completions.</h3>
                      <h3>STAY INVOLVED!</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
