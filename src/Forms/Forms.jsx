import { Component } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import s from './Forms.module.css';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Too Short!')
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example: Charles de Batz de Castelmore d'Artagnan",
    )
    .required('required'),
  number: Yup.string()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number is not valid',
    )
    .min(6)
    .required('required'),
});

export default class Forms extends Component {
  render() {
    return (
      <div className={s.inputContainer}>
        <Formik
          initialValues={{ name: '', number: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(false);
            this.props.getSubmit(values);
            resetForm();
          }}
        >
          <Form>
            <div className={s.inputContainer}>
              <Field
                type="text"
                name="name"
                className={s.input}
                autocomplete="off"
              />
              <label className={s.label}>Name:</label>
              <ErrorMessage name="name" component="div" className={s.error} />
            </div>
            <div className={s.inputContainer}>
              <Field
                type="tel"
                name="number"
                className={s.input}
                autocomplete="off"
              />
              <label className={s.label}>Number:</label>
              <ErrorMessage name="number" component="div" className={s.error} />
            </div>
            <button type="submit" className={s.borderButton}>
              add contact
            </button>
          </Form>
        </Formik>
      </div>
    );
  }
}
