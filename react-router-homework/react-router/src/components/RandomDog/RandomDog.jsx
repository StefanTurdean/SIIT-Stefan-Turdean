import React, { Component } from 'react'
import { DogoBtn } from "./DogoBtn/DogoBtn";
import "./styles.css"

export class RandomDog extends Component {
    state = {
        dogoImgs: [],
        index : 0,
    }

    getDogo = () => {
        fetch("https://dog.ceo/api/breeds/image/random")
        .then((response) => response.json())
        .then((data) => {
          this.setState({
              dogoImgs : [...this.state.dogoImgs , data.message],
          });
        });
    }

    componentDidMount() {
        this.getDogo();
    }

    backDogo = () => {
        if (this.state.index - 1 < 0) return

        this.setState({
            index : this.state.index - 1,
        });
    }

    nextDogo = () => {
        if (!this.state.dogoImgs[this.state.index + 1]) {
            this.getDogo()
        }

        this.setState({
            index : this.state.index + 1,
        })
    }

    render() {

        return (
            <div className="dogo">
                <DogoBtn lable = "back" onClick = {this.backDogo}/>
                <div className="dogoImgContainer"
                    style={{backgroundImage: `url(${this.state.dogoImgs[this.state.index]})`
                    }}>
                </div>
                <button className='dogoBtn' onClick={this.nextDogo}>next</button>
            </div>
        )
    }
}
