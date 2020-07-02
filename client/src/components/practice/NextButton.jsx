import React, { Component } from "react";
import { connect } from "react-redux";
import { getQuestion, resetSelection } from "../../actions";

class Next extends Component {
    state = { show: false };

    getNewWord = () => {
        var { show } = this.state;
        if (this.props.selection) {
            this.props.getQuestion();
            this.props.resetSelection();
            this.setState({ show: false });
        } else {
            this.setState({ show: true });
        }
    };

    showWarning = () => {
        if (this.state.show && !this.props.selection) {
            return (
                <div className="ui left pointing red basic label">
                    Please Select an option!
                </div>
            );
        }
    };

    render() {
        return (
            <React.Fragment>
                <button
                    className="ui primary large button"
                    onClick={this.getNewWord}
                >
                    Next
                </button>
                {this.showWarning()}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    var { selection } = state;
    return { selection };
};

export default connect(mapStateToProps, { getQuestion, resetSelection })(Next);
