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
               
               ${ interviews.map(interview => 
                   /*html*/`
                   <h4>Interview - </h4>
                   <p>
                       <strong>Designation - </strong> ${interview.name}<br />
                       <strong>Interviewee Name - </strong> ${interviewees[interview.user_id].name}<br />
                       <strong>Date - </strong> ${Parser.parseDate(new Date(interview.start_time))}<br />
                       <strong>Timings - </strong> ${Parser.parseTime(new Date(interview.start_time))} - ${Parser.parseTime(new Date(interview.end_time))}<br />
                   </p>
                   <a href="#/interviews/${interview.id}">Show</a> | 
                   <a href="#/interviews/${interview.id}/edit">Edit</a> |
                   <a href="#/interviews" data-method="delete" data-confirm="Are you sure?">Delete</a>
                   `
                   ).join('\n ')
               }
           
           </section>
       `
       return view
   }
   , after_render: async () => {
   }

}

export default ListInterviews;