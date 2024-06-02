(function () {
  /* Код компонента пишите здесь */
  const form = document.getElementById("booking-form");
  const phoneField = document.getElementById("phone");
  const phonePattern =
    /^\+7\s?(\(\d{3}\)\s?|\d{3})\s?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
  const checkInDateField = document.getElementById("checkin-date");
  const checkOutDateField = document.getElementById("checkout-date");
  const datePattern = /^(\d{4}-\d{2}-\d{2}|\d{2}\.\d{2}\.\d{4})$/;

  const phoneFieldValidate = () => {
    if (phonePattern.test(phoneField.value)) {
      phoneField.classList.add("field-correct");
    } else {
      phoneField.classList.add("field-error");
    }
  };

  const dateFieldsValidate = () => {
    if (
      datePattern.test(checkInDateField.value) &&
      datePattern.test(checkOutDateField.value)
    ) {
      const arrival = new Date(checkOutDateField.value);
      const departure = new Date(checkInDateField.value);
      const minDepartureDate = new Date(
        arrival.getTime() + 4 * 24 * 60 * 60 * 1000
      );

      if (departure > minDepartureDate) {
        checkInDateField.classList.add("field-correct");
        checkOutDateField.classList.add("field-correct");
      } else {
        checkInDateField.classList.add("field-error");
        checkOutDateField.classList.add("field-error");
      }
    } else {
      checkInDateField.classList.add("field-error");
      checkOutDateField.classList.add("field-error");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    phoneFieldValidate();
    dateFieldsValidate();
  };
  form.addEventListener("submit", (event) => submitHandler(event));
})();
