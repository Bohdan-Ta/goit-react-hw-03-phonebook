import React from "react";
import { DebounceInput } from "react-debounce-input";
import PropTypes from "prop-types";

import s from "./Filter.module.css";

export default function Filter({ value, searchContact }) {
  return (
    <div className={s.form}>
      <label className={s.label}>
        Find contact by name:
        <DebounceInput
          type="text"
          autoComplete="off"
          minLength={2}
          debounceTimeout={300}
          placeholder="search ........"
          value={value}
          onChange={searchContact}
          className={s.input}
        />
      </label>
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};
