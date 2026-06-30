const correctPassword = "guldstribe";

const button = document.getElementById("unlockButton");
const input = document.getElementById("password");
const error = document.getElementById("error");

function unlock() {

    if (input.value.toLowerCase().trim() === correctPassword) {

        error.textContent = "";

        document.body.style.transition = "opacity 1s ease";
        document.body.style.opacity = "0";

        setTimeout(() => {

            // Næste version kommer her
            alert("Adgangskoden er korrekt 🎉");

            document.body.style.opacity = "1";

        }, 1000);

    } else {

        error.textContent = "Adgangskoden er ikke korrekt.";

        input.animate([
            { transform: "translateX(0px)" },
            { transform: "translateX(-6px)" },
            { transform: "translateX(6px)" },
            { transform: "translateX(-6px)" },
            { transform: "translateX(0px)" }
        ], {
            duration: 300
        });

    }

}

button.addEventListener("click", unlock);

input.addEventListener("keydown", function(event){

    if(event.key === "Enter"){
        unlock();
    }

});
