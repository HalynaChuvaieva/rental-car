"use client";

import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "izitoast/dist/css/iziToast.min.css";
import css from "./BookingForm.module.css";
import { createBookingRequest } from "@/lib/booking-api";

type FormProps = {
  id: string;
};

const BookingSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Please enter your full name.")
    .max(40, "Name is too long")
    .required("Please enter your name."),
  email: Yup.string()
    .email("Invalid email format")
    .required("Please enter your email."),
  comment: Yup.string().required("Comment is required"),
});

export default function BookingForm({ id }: FormProps) {
  const STORAGE_KEY = `booking_draft_${id}`;
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      comment: "",
    },
    validationSchema: BookingSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const iziToast = (await import("izitoast")).default;
      try {
        const response = await createBookingRequest(id, values);

        iziToast.success({
          title: "Success",
          position: "topRight",
          message: response?.message || "Booking request sent successfully!",
        });
        resetForm();
        localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        iziToast.error({ title: "Error", message: "Failed to send request." });
      } finally {
        setSubmitting(false);
      }
    },
  });
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        formik.setValues(parsedData);
      } catch (error) {
        console.error("Error reading from localStorage", error);
      }
    }
  }, []);

  useEffect(() => {
    if (formik.values.name || formik.values.email || formik.values.comment) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formik.values));
    }
  }, [formik.values, STORAGE_KEY]);

  return (
    <div className={css.formContainer}>
      <h3 className={css.title}>Book your car now</h3>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <form onSubmit={formik.handleSubmit} className={css.form} noValidate>
        <div className={css.inputGroup}>
          <div
            className={`${css.fieldWrapper} ${formik.touched.name && formik.errors.name ? css.hasError : ""}`}
          >
            <input
              id="name"
              type="text"
              name="name"
              placeholder=" "
              className={css.input}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
            />
            <label htmlFor="name" className={css.label}>
              Name*
            </label>
            {formik.touched.name && formik.errors.name && (
              <svg className={css.errorIcon} width="20" height="20">
                <use href="/sprite.svg#icon-error"></use>
              </svg>
            )}
          </div>
          {formik.touched.name && formik.errors.name && (
            <span className={css.errorText}>{formik.errors.name}</span>
          )}
        </div>

        <div className={css.inputGroup}>
          <div
            className={`${css.fieldWrapper} ${formik.touched.email && formik.errors.email ? css.hasError : ""}`}
          >
            <input
              id="email"
              type="email"
              name="email"
              placeholder=" "
              className={css.input}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
            />
            <label htmlFor="email" className={css.label}>
              Email*
            </label>
            {formik.touched.email && formik.errors.email && (
              <svg className={css.errorIcon} width="20" height="20">
                <use href="/sprite.svg#icon-error"></use>
              </svg>
            )}
          </div>
          {formik.touched.email && formik.errors.email && (
            <span className={css.errorText}>{formik.errors.email}</span>
          )}
        </div>

        <div className={css.inputGroup}>
          <div
            className={`${css.fieldWrapper} ${formik.touched.comment && formik.errors.comment ? css.hasError : ""}`}
          >
            <textarea
              id="comment"
              name="comment"
              placeholder="Comment"
              className={css.textarea}
              value={formik.values.comment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
            />
            {formik.touched.comment && formik.errors.comment && (
              <svg className={css.errorIcon} width="20" height="20">
                <use href="/sprite.svg#icon-error"></use>
              </svg>
            )}
          </div>

          {formik.touched.comment && formik.errors.comment && (
            <span className={css.errorText}>{formik.errors.comment}</span>
          )}
        </div>

        <button
          type="submit"
          className={css.submitBtn}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
