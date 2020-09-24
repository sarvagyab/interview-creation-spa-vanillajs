import GET from '../../GET.js'
import Parser from './../../parser.js'

let ListInterviews = {
   render : async () => {
       let interviews = await GET(`http://localhost:3000/interviews.json/`);
       let interviewees = {}
       for (let i =0;i<interviews.length;i++){
           if(!interviewees[interviews[i].user_id]){
               interviewees[interviews[i].user_id] = await GET(`http://localhost:3000/users/${interviews[i].user_id}.json`);
           }
       }

       let view =  /*html*/`
            <section class="section">
            <h1>Interviews</h1>
            <a href="#/interviews/new">Create new Interview</a> | 
            <a href="#/users">List Users</a>
            <p>
                <div id="notice-field"></div>
                <div id="errors-field"></div>
            </p>    
               
               ${ interviews.map(interview => 
                   /*html*/`
                   <div id="interview - ${interview.id}">
                        <h4>Interview - </h4>
                        <p>
                            <strong>Designation - </strong> ${interview.name}<br />
                            <strong>Interviewee Name - </strong> ${interviewees[interview.user_id].name}<br />
                            <strong>Date - </strong> ${Parser.parseDate(new Date(interview.start_time))}<br />
                            <strong>Timings - </strong> ${Parser.parseTime(new Date(interview.start_time))} - ${Parser.parseTime(new Date(interview.end_time))}<br />
                        </p>
                        <a href="#/interviews/${interview.id}">Show</a> | 
                        <a href="#/interviews/${interview.id}/edit">Edit</a> |
                        <a href="#/interviews" class="deleteInterview" id=${interview.id}>Delete</a>
                    </div>
                   `
                   ).join('\n ')
               }
           
           </section>
       `
       return view
   }
    , after_render: async () => {
        
        function deleteInterview(id){
            if(confirm("Are you sure?")){
                sendDeleteRequest(id)
            }
        }

        function sendDeleteRequest(id) {
            const XHR = new XMLHttpRequest();
            XHR.open("DELETE", `http://localhost:3000/interviews/${id}.json`);

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
                        let element = document.getElementById(`interview - ${id}`);
                        element.parentNode.removeChild(element);
                    }
                    if (responseJSON.errors) {
                        for (let err of responseJSON.errors) Errors.innerHTML += `<p>${err}</p>`;
                    }
                }
            }

            XHR.send();
        }

        let links = document.querySelectorAll(".deleteInterview");
        links.forEach(link=>{
            link.onclick = ()=>deleteInterview(link.id);
        })
    }

}

export default ListInterviews;