document.addEventListener("DOMContentLoaded", () => {
    let planners = window.loadData('dlm_planners', []);
    
    const plannerInput = document.getElementById("planner-input");
    const plannerTime = document.getElementById("planner-time");
    const addPlannerBtn = document.getElementById("add-planner-btn");
    const plannerList = document.getElementById("planner-list");

    if (plannerList) {
       
        function renderPlanner() {
            plannerList.innerHTML = "";
            planners.forEach((planner, index) => {
                const li = document.createElement("li");
                li.className = `list-item fade-in ${planner.completed ? 'completed' : ''}`;
                
                 li.innerHTML = `
                    <div class="item-left">
                        <input type="checkbox" ${planner.completed ? "checked" : ""} data-index="${index}">
                        <span>${planner.title} (${planner.time})</span>
                    </div>
                    <button class="danger" data-index="${index}">Delete</button>
                `;
                plannerList.appendChild(li);
            });
        }

        renderPlanner();

        
        addPlannerBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const title = plannerInput.value.trim();
            const time = plannerTime.value.trim();
            if (title && time) {
                planners.push({ title, time, completed: false });
                window.saveData('dlm_planners', planners);
                plannerInput.value = "";
                plannerTime.value = "";
                renderPlanner();
            }
        });

        
        plannerList.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            if (index === null) return;

            if (e.target.tagName === "INPUT") {
              
                planners[index].completed = e.target.checked;
                window.saveData('dlm_planners', planners);
                renderPlanner();
            } else if (e.target.tagName === "BUTTON") {
                
                planners.splice(index, 1);
                window.saveData('dlm_planners', planners);
                renderPlanner();
            }
        });
    }
});