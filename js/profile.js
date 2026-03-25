document.addEventListener("DOMContentLoaded", () =>{
    let profiles =window.loadData('dlm_profiles', []);

    const nameInput = document.getElementById("name-input");
    const goalInput = document.getElementById("goal-input");
    const textInput = document.getElementById("text-input");
    const addProfileBtn = document.getElementById("add-profile-btn");
    const profilesList = document.getElementById("profiles-list");

    if (profilesList) {
       
        function renderProfiles() {
            profilesList.innerHTML = "";
            profiles.forEach((profile, index) => {
                const li = document.createElement("li");
                li.className = `list-item fade-in ${profile.completed ? 'completed' : ''}`;
                
                 li.innerHTML = `
                    <div class="item-left">
                        <input type="checkbox" ${profile.completed ? "checked" : ""} data-index="${index}">
                        <span>Name : ${profile.title}<br>Goal : ${profile.goal}<br>Bio : ${profile.text}</span>
                    </div>
                    <button class="danger" data-index="${index}">Delete</button>
                `;
                profilesList.appendChild(li);
            });
        }

        renderProfiles();

        
        addProfileBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const title = nameInput.value.trim();
            const goal = goalInput.value.trim();
            const text = textInput.value.trim();
            if (title && goal && text) {
                profiles.push({ title,goal, text, completed: false });
                window.saveData('dlm_profiles', profiles);
                nameInput.value = "";
                goalInput.value = "";
                textInput.value = "";
                renderProfiles();
            }
        });

        
        profilesList.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            if (index === null) return;

            if (e.target.tagName === "INPUT") {
              
                profiles[index].completed = e.target.checked;
                window.saveData('dlm_profiles', profiles);
                renderProfiles();
            } else if (e.target.tagName === "BUTTON") {
                
                profiles.splice(index, 1);
                window.saveData('dlm_profiles', profiles);
                renderProfiles();
            }
        });
    }
});
