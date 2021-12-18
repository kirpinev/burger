import { createSelector } from "reselect";

export const selectEmail = createSelector(
  (state) => state.email.value,
  (email) => email
);

export const selectEmailSentStatus = createSelector(
  (state) => state.email.emailSent,
  (emailSent) => emailSent
);

export const selectEmailAndEmailSentStatus = createSelector(
  selectEmail,
  selectEmailSentStatus,
  (email, emailSent) => ({ email, emailSent })
);
