document.querySelector('#all-classes').addEventListener('click', makeReq);

async function makeReq() {
    const res = await fetch(`/api`);
    const data = await res.json();
    data.forEach(element => {
        console.log(element.message)
    });
}

// async function makeReq(){
//     const userName = document.querySelector("#userName").value;
//     const res = await fetch(`/api?student=${userName}`)
//     const data = await res.json()
  
//     console.log(data);
//     document.querySelector("#personName").textContent = data.name
//     document.querySelector("#personStatus").textContent = data.status
//     document.querySelector("#personOccupation").textContent = data.currentOccupation
// }