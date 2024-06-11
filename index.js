const apiUrl = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2405-ftb-et-web-ft/events";

const init = () => {
  fetchEvents();
  document.getElementById("party-form").addEventListener("submit", addParty);
};

const fetchEvents = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayParties(data.data);
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

const displayParties = (parties) => {
  const container = document.getElementById("parties-container");
  container.innerHTML = "";
  parties.forEach((party) => {
    const partyElement = document.createElement("div");
    partyElement.className = "card mb-3";
    partyElement.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${party.name}</h5>
        <p class="card-text"><strong>Date:</strong> ${party.date}</p>
        <p class="card-text"><strong>Time:</strong> ${party.time}</p>
        <p class="card-text"><strong>Location:</strong> ${party.location}</p>
        <p class="card-text"><strong>Description:</strong> ${party.description}</p>
        <button class="btn btn-danger" onclick="deleteParty('${party.id}')">Delete</button>
      </div>
    `;
    container.appendChild(partyElement);
  });
};

const addParty = async (event) => {
  event.preventDefault();
  const newParty = {
    name: document.getElementById("name").value,
    date: new Date(document.getElementById("date").value).toISOString(),
    location: document.getElementById("location").value,
    description: document.getElementById("description").value,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newParty),
    });
    if (response.ok) {
      fetchEvents();
      document.getElementById("party-form").reset();
    } else {
      console.error("Error adding party:", await response.text());
    }
  } catch (error) {
    console.error("Error adding party:", error);
  }
};

const deleteParty = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    if (response.ok) {
      fetchEvents();
    } else {
      console.error("Error deleting party:", await response.text());
    }
  } catch (error) {
    console.error("Error deleting party:", error);
  }
};

init();