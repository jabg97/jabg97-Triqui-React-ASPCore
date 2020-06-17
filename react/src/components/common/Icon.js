import React from 'react';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ClearIcon from '@material-ui/icons/Clear';
import RefreshIcon from '@material-ui/icons/Refresh';

import PropTypes from 'prop-types';
const Icon = ({ name, ...props }) => (
  name == 'O' ? (
    <RadioButtonUncheckedIcon fontSize="large" />) :
    (name == 'X' ? (<ClearIcon fontSize="large" />):(<RefreshIcon fontSize="large" />))
);

Icon.propTypes = {
  /**
   * The name of the icon.
   */
  name: PropTypes.string.isRequired,
};

export default Icon;

