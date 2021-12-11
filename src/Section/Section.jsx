import React from 'react';
import PropTypes from 'prop-types';
import s from './Section.module.css';

export default function Sections({ title, children }) {
  return (
    <section className={s.section}>
      {title && <h2 className={s.title}>{title}</h2>}
      {children}
    </section>
  );
}

Sections.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};
