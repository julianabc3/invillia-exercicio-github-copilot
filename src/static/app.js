document.addEventListener("DOMContentLoaded", () => {
  const activitiesList = document.getElementById("activities-list");
  const activitySelect = document.getElementById("activity");
  const signupForm = document.getElementById("signup-form");
  const messageDiv = document.getElementById("message");

  // Function to fetch activities from API
  async function fetchActivities() {
    try {
      const response = await fetch("/activities");
      const activities = await response.json();

      // Adicionando atividades esportivas, artísticas e intelectuais
      activities["Futebol"] = {
        description: "Jogo de futebol para todas as idades.",
        schedule: "Sábados às 10h",
        max_participants: 22,
        participants: []
      };
      activities["Basquete"] = {
        description: "Partida de basquete para iniciantes.",
        schedule: "Domingos às 14h",
        max_participants: 10,
        participants: []
      };
      activities["Pintura"] = {
        description: "Aula de pintura para iniciantes.",
        schedule: "Quartas às 16h",
        max_participants: 15,
        participants: []
      };
      activities["Teatro"] = {
        description: "Oficina de teatro para todas as idades.",
        schedule: "Sextas às 18h",
        max_participants: 20,
        participants: []
      };
      activities["Xadrez"] = {
        description: "Torneio de xadrez para todos os níveis.",
        schedule: "Sábados às 9h",
        max_participants: 16,
        participants: []
      };
      activities["Clube do Livro"] = {
        description: "Discussão de livros e troca de experiências.",
        schedule: "Domingos às 17h",
        max_participants: 25,
        participants: []
      };

      // Clear loading message
      activitiesList.innerHTML = "";

      // Populate activities list
      Object.entries(activities).forEach(([name, details]) => {
        const activityCard = document.createElement("div");
        activityCard.className = "activity-card";

        const spotsLeft = details.max_participants - details.participants.length;

        activityCard.innerHTML = `
          <h4>${name}</h4>
          <p>${details.description}</p>
          <p><strong>Schedule:</strong> ${details.schedule}</p>
          <p><strong>Availability:</strong> ${spotsLeft} spots left</p>
          <p><strong>Participants:</strong> ${details.participants.join(", ")}</p>
        `;

        activitiesList.appendChild(activityCard);

        // Add option to select dropdown
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        activitySelect.appendChild(option);
      });
    } catch (error) {
      activitiesList.innerHTML = "<p>Failed to load activities. Please try again later.</p>";
      console.error("Error fetching activities:", error);
    }
  }

  // Handle form submission
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const activity = document.getElementById("activity").value;

    try {
      const response = await fetch(
        `/activities/${encodeURIComponent(activity)}/signup?email=${encodeURIComponent(email)}`,
        {
          method: "POST",
        }
      );

      const result = await response.json();

      if (response.ok) {
        messageDiv.textContent = result.message;
        messageDiv.className = "success";
        signupForm.reset();
      } else {
        messageDiv.textContent = result.detail || "An error occurred";
        messageDiv.className = "error";
      }

      messageDiv.classList.remove("hidden");

      // Hide message after 5 seconds
      setTimeout(() => {
        messageDiv.classList.add("hidden");
      }, 5000);
    } catch (error) {
      messageDiv.textContent = "Failed to sign up. Please try again.";
      messageDiv.className = "error";
      messageDiv.classList.remove("hidden");
      console.error("Error signing up:", error);
    }
  });

  // Initialize app
  fetchActivities();
});
