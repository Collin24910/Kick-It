import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import compose from "recompose/compose";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { getAddic } from "../actions/addicActions";

const styles = (theme) => ({
  card: {
    padding: `${theme.spacing.unit * 4}px 0`,
  },
});

export class pinnedAddic extends Component {
  state = {
    pinnedaddic: "",
  };

  componentDidMount = () => {
    const { retrieveAddic, pinned } = this.props;
    retrieveAddic(pinned).then((res) => {
      this.setState({
        pinnedaddic: res.payload.addic,
      });
    });
  };

  getPinnedAdd = () => {
    const { addicReducer, profileId } = this.props;
    const addics = addicReducer.adds;
    for (var j = 0; j < addics.length; j++) {
      if (addics[j].authorId === profileId && addics[j].pinned === true) {
        this.setPinStateTrue();
        return addics[j];
      }
    }
    this.setPinStateFalse();
    return "";
  };

  setPinStateTrue = () => {
    this.setState({
      isPinnedAdd: true,
    });
  };

  setPinStateFalse = () => {
    this.setState({
      isPinnedAdd: false,
    });
  };

  render() {
    const { pinnedaddic } = this.state;

    return (
      <Card>
        {pinnedaddic === "" ? (
          <Typography>No Pinned Addiction</Typography>
        ) : (
          <div>
            <Typography>{pinnedaddic.name}</Typography>
          </div>
        )}
      </Card>
    );
  }
}

pinnedAddic.propTypes = {
  getAddic: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  retrieveAddic: (id) => dispatch(getAddic(id)),
});

export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(pinnedAddic);
