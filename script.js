
const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
  };

  const url = "https://pokeapi.co/api/v2/pokemon/";
  const card = document.getElementById("card");
  const btn = document.getElementById("btn");

  btn.addEventListener("click", () => {
    card.classList.add("flip");
    fetchPokemon();
  });

  const fetchPokemon = () => {
    const id = Math.floor(Math.random() * 150) + 1;
    fetch(url + id)
      .then((res) => res.json())
      .then((data) => displayPokemon(data))
      .catch(() => alert("Error fetching Pokémon data"));
  };

  const displayPokemon = (data) => {
    const hp = data.stats[0].base_stat;
    const imgSrc =
      data.sprites.other.dream_world.front_default ||
      data.sprites.front_default;
    const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    const types = data.types.map((type) => type.type.name);
    const weight = data.weight / 10; // Convert to kg
    const abilities = data.abilities
      .map((ability) => ability.ability.name)
      .join(", ");
    const stats = {
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      speed: data.stats[5].base_stat,
    };

    const themeColor = typeColor[types[0]];

    document.body.style.backgroundColor = themeColor;

    card.querySelector(".hp").innerHTML = `<span>HP</span> ${hp}`;
    card.querySelector("img").src = imgSrc;
    card.querySelector(".poke-name").textContent = name;
    card.querySelector(".details").textContent = `Weight: ${weight}kg | Abilities: ${abilities}`;
    const typeContainer = card.querySelector(".types");
    typeContainer.innerHTML = "";
    types.forEach((type) => {
      const span = document.createElement("span");
      span.textContent = type;
      span.style.backgroundColor = typeColor[type];
      typeContainer.appendChild(span);
    });
    const statDivs = card.querySelectorAll(".stats div");
    statDivs[0].querySelector("h3").textContent = stats.attack;
    statDivs[1].querySelector("h3").textContent = stats.defense;
    statDivs[2].querySelector("h3").textContent = stats.speed;

    card.classList.remove("flip");
    card.querySelector(".front").style.border = `2px solid ${themeColor}`;
  };