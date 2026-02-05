let flightsData = [];

fetch("../data/flights.json")
  .then(response => response.json())
  .then(data => {
    flightsData = data;
    renderTable(flightsData);
    updateSummary(flightsData);
  });

function renderTable(data) {
  const tableBody = document.getElementById("flightsTable");
  tableBody.innerHTML = "";

  data.forEach(flight => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${flight.flightNo}</td>
      <td>${flight.airline}</td>
      <td>${flight.from}</td>
      <td>${flight.to}</td>
      <td>${flight.scheduled}</td>
      <td>${flight.delay > 0 ? flight.delay + " min" : "-"}</td>
      <td>
        <span class="status ${flight.status.toLowerCase().replace(" ", "-")}">
          ${flight.status}
        </span>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

function updateSummary(data) {
  const delayed = data.filter(f => f.status === "Delayed");
  const cancelled = data.filter(f => f.status === "Cancelled");

  document.getElementById("delayedCount").textContent = delayed.length;
  document.getElementById("cancelledCount").textContent = cancelled.length;

  const avg =
    delayed.reduce((sum, f) => sum + f.delay, 0) / (delayed.length || 1);

  document.getElementById("averageDelay").textContent =
    Math.round(avg) + " min";
}
