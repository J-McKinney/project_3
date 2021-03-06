import React from "react";
import axios from "axios";
import NavBar from "../NavBar";
// react plugin used to create charts
import { Bar } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";

class KidsProgressCharts extends React.Component {
  state = {
    user: "",
    gamesArray: {
      math: [0],
      add: [0],
      sub: [0],
      multi: [0],
      div: [0],
      unknowGame: [0]
    },
    highScoreArray: [0],
    allHighScores: [0]
  };

  componentDidMount() {
    this.getUserInfo();
    this.getAllHighScores();
  }

  componentDidUpdate() {}

  getUserInfo() {
    axios
      .get(`/api/user/${this.props.match.params.id}`)
      .then(user => {
        this.setState({
          user: user.data,
          gamesArray: this.organizeGamesByName(user.data.history)
        });
        let mathHS = this.highScoresByGame(this.state.gamesArray.math);
        let addHS = this.highScoresByGame(this.state.gamesArray.add);
        let subHS = this.highScoresByGame(this.state.gamesArray.sub);
        let multiHS = this.highScoresByGame(this.state.gamesArray.multi);
        let divHS = this.highScoresByGame(this.state.gamesArray.div);

        this.setState({
          highScoreArray: [mathHS, addHS, subHS, multiHS, divHS]
        });
      })
      .catch(err => {
        // console.log(err);
      });
  }

  getAllHighScores() {
    axios
      .get("/api/user")
      .then(data => {
        let highScoresAllUsers = [];
        for (let i = 0; i < Object.keys(data.data).length; i++) {
          let name = data.data[i].username;
          let array = this.organizeGamesByName(data.data[i].history);
          highScoresAllUsers.push({ name: name, history: array });
        }
        let finalHS = {
          math: [],
          add: [],
          sub: [],
          multi: [],
          div: []
        };
        for (let i = 0; i < highScoresAllUsers.length; i++) {
          let name = highScoresAllUsers[i].name;
          finalHS.math.push({
            name: name,
            score: this.highScoresByGame(highScoresAllUsers[i].history.math)
          });
          finalHS.add.push({
            name: name,
            score: this.highScoresByGame(highScoresAllUsers[i].history.add)
          });
          finalHS.sub.push({
            name: name,
            score: this.highScoresByGame(highScoresAllUsers[i].history.sub)
          });
          finalHS.multi.push({
            name: name,
            score: this.highScoresByGame(highScoresAllUsers[i].history.multi)
          });
          finalHS.div.push({
            name: name,
            score: this.highScoresByGame(highScoresAllUsers[i].history.div)
          });
        }
        let math = finalHS.math.sort(
          (a, b) => parseFloat(b.score) - parseFloat(a.score)
        );
        let add = finalHS.add.sort(
          (a, b) => parseFloat(b.score) - parseFloat(a.score)
        );
        let sub = finalHS.sub.sort(
          (a, b) => parseFloat(b.score) - parseFloat(a.score)
        );
        let multi = finalHS.multi.sort(
          (a, b) => parseFloat(b.score) - parseFloat(a.score)
        );
        let div = finalHS.div.sort(
          (a, b) => parseFloat(b.score) - parseFloat(a.score)
        );
        this.setState({
          allHighScores: [
            {
              game: "Math",
              history: math,
              highScore: math[0].score,
              user: math[0].name
            },
            {
              game: "Addition",
              history: add,
              highScore: add[0].score,
              user: add[0].name
            },
            {
              game: "Subtract",
              history: sub,
              highScore: sub[0].score,
              user: sub[0].name
            },
            {
              game: "Multiplication",
              history: multi,
              highScore: multi[0].score,
              user: multi[0].name
            },
            {
              game: "Division",
              history: div,
              highScore: div[0].score,
              user: div[0].name
            }
          ]
        });
      })
      .catch(err => {
        // console.log(err);
      });
  }

  highScoresByGame(data) {
    let highScore = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].score > highScore) {
        highScore = data[i].score;
      }
    }
    return highScore;
  }

  organizeGamesByName(data) {
    let math = [0];
    let add = [0];
    let sub = [0];
    let multi = [0];
    let div = [0];
    let unknowGame = [0];
    for (let i = 0; i < data.length; i++) {
      if (data[i].game.name === "Math Quiz") {
        math.unshift(data[i]);
      } else if (data[i].game.name === "Add Quiz") {
        add.unshift(data[i]);
      } else if (data[i].game.name === "Subtract Quiz") {
        sub.unshift(data[i]);
      } else if (data[i].game.name === "Multiply Quiz") {
        multi.unshift(data[i]);
      } else if (data[i].game.name === "Divide Quiz") {
        div.unshift(data[i]);
      } else {
        unknowGame.unshift(data[i]);
      }
    }
    return {
      math,
      add,
      sub,
      multi,
      div,
      unknowGame
    };
  }

  allTimeScore() {
    var mathAllTime =
      (this.state.gamesArray.math[0].score /
        this.state.gamesArray.math[0].time) *
      100;
    var addAllTime =
      (this.state.gamesArray.add[0].score / this.state.gamesArray.add[0].time) *
      100;
    var subAllTime =
      (this.state.gamesArray.sub[0].score / this.state.gamesArray.sub[0].time) *
      100;
    var multiAllTime =
      (this.state.gamesArray.multi[0].score /
        this.state.gamesArray.multi[0].time) *
      100;
    var divAllTime =
      (this.state.gamesArray.div[0].score / this.state.gamesArray.div[0].time) *
      100;
    var allScores =
      mathAllTime + addAllTime + subAllTime + multiAllTime + divAllTime;
    this.setState({
      allTimeScoreArray: [
        mathAllTime,
        addAllTime,
        subAllTime,
        multiAllTime,
        divAllTime
      ]
    });
  }
  render() {
    // ##############################
    // // // Function that converts a hex color number to a RGB color number
    // #############################
    function hexToRGB(hex, alpha) {
      var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
      if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
      } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
      }
    }
    // ##############################
    // // // Dashboard view - High Scores
    // #############################
    const dashboardHighScores = {
      data: canvas => {
        var ctx = canvas.getContext("2d");
        var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
        gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
        gradientFill.addColorStop(1, hexToRGB("#008000", 0.6));
        return {
          labels: [
            "MathQuiz",
            "Addition",
            "Subtraction",
            "Multiplication",
            "Division"
          ],
          datasets: [
            {
              label: "High Score",
              /////////////////////////////////////////////////////////////////
              backgroundColor: [
                "rgba(255, 99, 132, 0.8)",
                "rgba(54, 162, 235, 0.8)",
                "rgba(255, 206, 86, 0.8)",
                "rgba(75, 192, 192, 0.8)",
                "rgba(153, 102, 255, 0.8)"
              ],
              borderColor: [
                "rgba(255, 99, 132, 0.8)",
                "rgba(54, 162, 235, 0.8)",
                "rgba(255, 206, 86, 0.8)",
                "rgba(75, 192, 192, 0.8)",
                "rgba(153, 102, 255, 0.8)"
              ],
              pointBorderColor: [
                "rgba(255, 99, 132, 0.8)",
                "rgba(54, 162, 235, 0.8)",
                "rgba(255, 206, 86, 0.8)",
                "rgba(75, 192, 192, 0.8)",
                "rgba(153, 102, 255, 0.8)"
              ],
              pointBackgroundColor: [
                "rgba(255, 99, 132, 0.8)",
                "rgba(54, 162, 235, 0.8)",
                "rgba(255, 206, 86, 0.8)",
                "rgba(75, 192, 192, 0.8)",
                "rgba(153, 102, 255, 0.8)"
              ],
              /////////////////////////////////////////////////////////////////
              pointBorderWidth: 2,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 1,
              pointRadius: 4,
              fill: true,
              borderWidth: 1,
              //user high score for each game
              //   Math/ Add/ Sub/ Multi/ Div
              data: this.state.highScoreArray
            }
          ]
        };
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          bodySpacing: 4,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
          xPadding: 10,
          yPadding: 10,
          caretPadding: 10
        },
        responsive: 1,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                zeroLineColor: "transparent",
                drawBorder: false
              }
            }
          ],
          xAxes: [
            {
              display: 0,
              ticks: {
                display: false
              },
              gridLines: {
                zeroLineColor: "transparent",
                drawTicks: false,
                display: false,
                drawBorder: false
              }
            }
          ]
        },
        layout: {
          padding: { left: 20, right: 0, top: 15, bottom: 15 }
        }
      }
    };
    // ##############################
    // // // Dashboard view - All Products - Card
    // ############################################################################################################
    const dashboardTimesPerGame = {
      data: canvas => {
        var ctx = canvas.getContext("2d");
        var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
        gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
        gradientFill.addColorStop(1, hexToRGB("#008000", 0.6));
        return {
          labels: [
            "MathQuiz",
            "Addition",
            "Subtraction",
            "Multiplication",
            "Division"
          ],
          datasets: [
            {
              label: "Seconds finished",
              /////////////////////////////////////////////////////////////////
              backgroundColor: [
                "rgba(255, 99, 132, 0.8)",
                "rgba(54, 162, 235, 0.8)",
                "rgba(255, 206, 86, 0.8)",
                "rgba(75, 192, 192, 0.8)",
                "rgba(153, 102, 255, 0.8)"
              ],
              borderColor: [
                "rgba(255, 99, 132, 0.8)",
                "rgba(54, 162, 235, 0.8)",
                "rgba(255, 206, 86, 0.8)",
                "rgba(75, 192, 192, 0.8)",
                "rgba(153, 102, 255, 0.8)"
              ],
              pointBorderColor: [
                "rgba(255, 99, 132, 0.8)",
                "rgba(54, 162, 235, 0.8)",
                "rgba(255, 206, 86, 0.8)",
                "rgba(75, 192, 192, 0.8)",
                "rgba(153, 102, 255, 0.8)"
              ],
              pointBackgroundColor: [
                "rgba(255, 99, 132, 0.8)",
                "rgba(54, 162, 235, 0.8)",
                "rgba(255, 206, 86, 0.8)",
                "rgba(75, 192, 192, 0.8)",
                "rgba(153, 102, 255, 0.8)"
              ],
              /////////////////////////////////////////////////////////////////
              pointBorderWidth: 2,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 1,
              pointRadius: 4,
              fill: true,
              borderWidth: 1,
              //user high score for each game
              //   Math/ Add/ Sub/ Multi/ Div
              data: [
                this.state.gamesArray.math[0].time,
                this.state.gamesArray.add[0].time,
                this.state.gamesArray.sub[0].time,
                this.state.gamesArray.multi[0].time,
                this.state.gamesArray.div[0].time
              ]
            }
          ]
        };
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          bodySpacing: 4,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
          xPadding: 10,
          yPadding: 10,
          caretPadding: 10
        },
        responsive: 1,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                zeroLineColor: "transparent",
                drawBorder: false
              }
            }
          ],
          xAxes: [
            {
              display: 0,
              ticks: {
                display: false
              },
              gridLines: {
                zeroLineColor: "transparent",
                drawTicks: false,
                display: false,
                drawBorder: false
              }
            }
          ]
        },
        layout: {
          padding: { left: 20, right: 0, top: 15, bottom: 15 }
        }
      }
    };
    // ######################################################################################################
    // // // Dashboard view - Bar Chart - Card
    // #############################
    const dashboardLastScoresPerGame = {
      data: canvas => {
        var ctx = canvas.getContext("2d");
        var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
        gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
        gradientFill.addColorStop(1, hexToRGB("#2CA8FF", 0.6));
        return {
          labels: [
            "MathQuiz",
            "Addition",
            "Subtraction",
            "Multiplication",
            "Division"
          ],
          datasets: [
            {
              label: "Last Score",
              //////////////////////////////////////////////////////
              backgroundColor: [
                "rgba(255, 99, 132, 0.8)",
                "rgba(54, 162, 235, 0.8)",
                "rgba(255, 206, 86, 0.8)",
                "rgba(75, 192, 192, 0.8)",
                "rgba(153, 102, 255, 0.8)"
              ],
              borderColor: [
                "rgba(255, 99, 132, 0.8)",
                "rgba(54, 162, 235, 0.8)",
                "rgba(255, 206, 86, 0.8)",
                "rgba(75, 192, 192, 0.8)",
                "rgba(153, 102, 255, 0.8)"
              ],
              pointBorderColor: [
                "rgba(255, 99, 132, 0.8)",
                "rgba(54, 162, 235, 0.8)",
                "rgba(255, 206, 86, 0.8)",
                "rgba(75, 192, 192, 0.8)",
                "rgba(153, 102, 255, 0.8)"
              ],
              pointBackgroundColor: [
                "rgba(255, 99, 132, 0.8)",
                "rgba(54, 162, 235, 0.8)",
                "rgba(255, 206, 86, 0.8)",
                "rgba(75, 192, 192, 0.8)",
                "rgba(153, 102, 255, 0.8)"
              ],
              //////////////////////////////////////////////////////
              pointBorderWidth: 2,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 1,
              pointRadius: 4,
              fill: true,
              borderWidth: 1,
              //user high score for each game
              //   Math/ Add/ Sub/ Multi/ Div
              data: [
                this.state.gamesArray.math[0].score,
                this.state.gamesArray.add[0].score,
                this.state.gamesArray.sub[0].score,
                this.state.gamesArray.multi[0].score,
                this.state.gamesArray.div[0].score
              ]
            }
          ]
        };
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          bodySpacing: 4,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
          xPadding: 10,
          yPadding: 10,
          caretPadding: 10
        },
        responsive: 1,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                zeroLineColor: "transparent",
                drawBorder: false
              }
            }
          ],
          xAxes: [
            {
              display: 0,
              ticks: {
                display: false
              },
              gridLines: {
                zeroLineColor: "transparent",
                drawTicks: false,
                display: false,
                drawBorder: false
              }
            }
          ]
        },
        layout: {
          padding: { left: 20, right: 0, top: 15, bottom: 15 }
        }
      }
    };
    return (
      <>
      <div className="child-dash">
        <NavBar />
      </div>
        <br></br>
        <br></br>
        <br></br>
        <div className="content">
          <Row>
            <Col xs={12} md={4}>
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">High Scores</h5>
                  <CardTitle tag="h4">High Scores Per Game</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Bar
                      data={dashboardHighScores.data}
                      options={dashboardHighScores.options}
                    />
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="stats">
                    <i className="now-ui-icons" /> High Scores
                  </div>
                </CardFooter>
              </Card>
            </Col>

            <Col xs={12} md={4}>
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Finished Times</h5>
                  <CardTitle tag="h4">Total Times Per Game</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Bar
                      data={dashboardTimesPerGame.data}
                      options={dashboardTimesPerGame.options}
                    />
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="stats">
                    <i className="now-ui-icons" /> Game Times
                  </div>
                </CardFooter>
              </Card>
            </Col>

            <Col xs={12} md={4}>
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Last Scores</h5>
                  <CardTitle tag="h4">Last Scores Per Game</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Bar
                      data={dashboardLastScoresPerGame.data}
                      options={dashboardLastScoresPerGame.options}
                    />
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="stats">
                    <i className="now-ui-icons" /> Current Score Board
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
        <Row>
          <Col xs={12} md={3}></Col>
          <Col xs={12} md={6}>
            <Card>
              <CardHeader>
                <h5 className="card-category">Leader-Board</h5>
                <CardTitle tag="h4">All Time High Scores:</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>User Name:</th>
                      <th>Game:</th>
                      <th>Score:</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.allHighScores.map(game => {
                      if (game.highScore) {
                        return (
                          <tr>
                            <td>{game.user ? game.user : "TBD"}</td>
                            <td>{game.game ? game.game : "TBD"}</td>
                            <td>{game.highScore ? game.highScore : "TBD"}</td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col xs={12} md={3}></Col>
        </Row>
      </>
    );
  }
}
export default KidsProgressCharts;
