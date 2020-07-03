import React from "react";
import { connect } from "react-redux";

import { newSelection } from "../../actions";

class Option extends React.Component {
    clickHandle = (option, event) => {
        if (!this.props.selection) {
            this.props.newSelection(option);
        }
    };

    getStyle = () => {
        var { selection, option, isAnswer } = this.props;
        if (selection && selection.no === option.no) {
            if (isAnswer) {
                return { backgroundColor: "green" };
            } else {
                return { backgroundColor: "red" };
            }
        } else if (selection && isAnswer && selection.no !== option.no) {
            return { backgroundColor: "green" };
        }
        return { backgroundColor: "white" };
    };

    renderOption = () => {
        var { option } = this.props;
        var style = this.getStyle();
        return (
            <div
                className="ui segment option"
                key={option.no}
                onClick={evnt => this.clickHandle(option, evnt)}
                style={style}
            >
                {option.text}
            </div>
        );
    };

    render() {
        return <React.Fragment>{this.renderOption()}</React.Fragment>;
    }
}

const mapStateToProps = state => {
    var { selection } = state;
    return { selection };
};

export default connect(mapStateToProps, { newSelection })(Option);
