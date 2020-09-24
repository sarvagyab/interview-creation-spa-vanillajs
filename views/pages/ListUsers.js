import GET from '../../GET.js'
import Parser from './../../parser.js'

let ListUsers = {
   render : async () => {
       let users = await GET(`http://localhost:3000/users.json/`);

       let view =  /*html*/`
            <section class="section">
            <h1>Users</h1>
            <a href="#/interviews">List Interviews</a> |
            <a href="#/users/new">Create new Interview</a> 
            <p>
                <div id="notice-field"></div>
                <div id="errors-field"></div>
            </p>    
               
               ${ users.map(user => 
                   /*html*/`
                   <div id="user - ${user.id}">
                        <h4>User - </h4>
                        <p>
                            <strong>Name - </strong> ${user.name}<br />
                            <strong>Email - </strong> ${user.email}<br />
                        </p>
                        <a href="#/users/${user.id}">Show</a> | 
                        <a href="#/users/${user.id}/edit">Edit</a> |
                        <a href="#/users" class="deleteUser" id=${user.id}>Delete</a>
                    </div>
                   `
                   ).join('\n ')
               }
           
           </section>
       `
       return view
   }
    , after_render: async () => {
        
        function deleteUser(id){
            if(confirm("Are you sure?")){
                sendDeleteRequest(id)
            }
        }

        function sendDeleteRequest(id) {
            const XHR = new XMLHttpRequest();
            XHR.open("DELETE", `http://localhost:3000/users/${id}.json`);

            XHR.onreadystatechange = (event) => {
                if (XHR.readyState === XMLHttpRequest.DONE) {
                    var status = XHR.status;
                    let responseJSON = JSON.parse(XHR.response);
                    let Notice = document.getElementById('notice-field');
                    Notice.innerHTML = "";
                    let Errors = document.getElementById('errors-field');
                    Errors.innerHTML = ""
                    if (status === 0 || (status >= 200 && status < 400)) {
                        Notice.innerHTML = responseJSON.notice;
                        let element = document.getElementById(`user - ${id}`);
                        element.parentNode.removeChild(element);
                    }
                    if (responseJSON.errors) {
                        for (let err of responseJSON.errors) Errors.innerHTML += `<p>${err}</p>`;
                    }
                }
            }

            XHR.send();
        }

        let links = document.querySelectorAll(".deleteUser");
        links.forEach(link=>{
            link.onclick = ()=>deleteUser(link.id);
        })
    }

}

export default ListUsers;