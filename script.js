const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");

const result_day = document.querySelector(".days");
const result_month = document.querySelector(".months");
const result_year = document.querySelector(".years");

const form = document.querySelector("form");

const all_inputs_array = Array.from(
  document.querySelectorAll(".input-container input")
);

const current_year = new Date().getFullYear();

all_inputs_array.forEach((input) => {
  switch (input.id) {
    case "year":
      input.min = 1930;
      input.max = current_year;
      break;
    case "month":
      input.min = 1;
      input.max = 12;
      break;
    case "day":
      input.min = 1;
      input.max = 31;
      break;
  }
});

function calculateAge(birth_day, birth_month, birth_year) {
  const today = new Date();
  const birthDate = new Date(birth_year, birth_month - 1, birth_day);

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }

  if (days < 0) {
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
    days += lastMonth.getDate();
    months--;
  }

  display_result(days, months, years);
}

function display_result(day, month, year) {
  result_day.textContent = day;
  result_month.textContent = month;
  result_year.textContent = year;
}

function showError(input, message) {
  const container = input.closest(".input-container");
  const errorSpan = container.querySelector(".error-message");
  errorSpan.textContent = message;
  container.classList.add("error");
}

function clearErrors() {
  all_inputs_array.forEach((input) => {
    const container = input.closest(".input-container");
    const errorSpan = container.querySelector(".error-message");
    errorSpan.textContent = "";
    container.classList.remove("error");
  });
}

function isValidDate(day, month, year) {
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() == year &&
    date.getMonth() == month - 1 &&
    date.getDate() == day
  );
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearErrors();

  const day_value = parseInt(day.value);
  const month_value = parseInt(month.value);
  const year_value = parseInt(year.value);

  if (
    day_value >= 1 &&
    day_value <= 31 &&
    month_value >= 1 &&
    month_value <= 12 &&
    year_value >= 1930 &&
    year_value <= current_year
  ) {
    if (isValidDate(day_value, month_value, year_value)) {
      calculateAge(day_value, month_value, year_value);
    } else {
      showError(day, "Invalid date");
    }
  } else {
    if (day_value < 1 || day_value > 31) showError(day, "Must be a valid day");
    if (month_value < 1 || month_value > 12)
      showError(month, "Must be a valid month");
    if (year_value < 1930 || year_value > current_year)
      showError(year, "Must be in the past");
  }
});
