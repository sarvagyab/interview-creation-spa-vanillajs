import GET from '../../GET.js'
import Parser from '../../parser.js'

let EditInterview = {

    render: async () => {
        let users = await GET('http://localhost:3000/users.json');
        let request = Parser.parseRequestURL();
        let interviewDetails = await GET(`http://localhost:3000/interviews/${request.id}.json`);
        // console.log(interviewDetails.interviewers.map(interviewer=>(interviewer.id == users[0].id)))
        let interviewerCheck = false;
        return /*html*/ `
            <section class="section">
            <h1>Edit interivew</h1>
            <form id="edit_interview">

                <div id="notice-field"></div>
                <div id="errors-field"></div>

                <label for="name">Designation</label>
                <input type="text" id="name" name="name" value=\"${interviewDetails.interview.name}\"><br />

                <p>
                    <label for="sdate">Start Date</label>
                    <input type="date" id="sdate" name="start_date" value=${Parser.parseDate(interviewDetails.interview.start_time)}><br />
                </p>
                <p>
                    <label for="stime">Start Time</label>
                    <input type="time" id="etime" name="start_time" value=${Parser.parseTime(interviewDetails.interview.start_time)}><br />
                </p>
                
                <p>
                    <label for="etime">End Time</label>
                    <input type="time" id="etime" name="end_time" value=${Parser.parseTime(interviewDetails.interview.end_time)}><br />
                </p>

                <p>
                ${
                    interviewDetails.resume?`Uploaded Resume - <a href="${interviewDetails.resume}">${interviewDetails.interview.resume_file_name}</a>`:"No Resume Currently Provided"
                }
                </p>

                <p>
                    <label for="resume">Attach or Change Resume (Optional)</label>
                    <input type="file" accept="application/pdf" id="resume" name="resume"><br />
                </p>

                ${
                    users.map(user=> /*html*/ `
                        <input type="checkbox" name="interviewers[]" value="${user.id}"
                        ${
                            interviewDetails.interviewers.map(interviewer=>{
                                interviewerCheck = interviewerCheck || (user.id == interviewer.id)
                            })
                        }
                        ${ interviewerCheck?`checked`:`` }
                        ${ interviewerCheck = false }
                        >

                        <input type="radio" name="interviewee" value="${user.id}"
                        ${
                            (interviewDetails.interviewee.id == user.id) ? `checked`:''
                        }
                        >

                        <label for="interviewers[${user.id}]">${user.name}</label><br>
                    `
                    ).join('\n')
                }
                
                <p>
                    <input type="submit" value="Update Interview">
                </p>
            </form>

            </section>
        `
    }
    // All the code related to DOM interactions and controls go in here.
    // This is a separate call as these can be registered only after the DOM has been painted
    , after_render: async () => {
        
        function sendData(form) {
            const XHR = new XMLHttpRequest();
            const FD = new FormData( form );
            let request = Parser.parseRequestURL();
            XHR.open( "PATCH", `http://localhost:3000/interviews/${request.id}.json` );
            
            XHR.onreadystatechange = (event)=>{
                if(XHR.readyState === XMLHttpRequest.DONE){
                    var status = XHR.status;
                    let responseJSON = JSON.parse(XHR.response);
                    let Notice = document.getElementById('notice-field');
                    Notice.innerHTML = "";
                    let Errors = document.getElementById('errors-field');
                    Errors.innerHTML = ""
                    if (status === 0 || (status >= 200 && status < 400)) {
                        Notice.innerHTML = responseJSON.notice
                    }
                    if(responseJSON.errors){
                        for(let err of responseJSON.errors)Errors.innerHTML += `<p>${err}</p>`;
                    }
                }
            }
            
            XHR.send( FD );
        }
        const form = document.getElementById( "edit_interview" );

        form.onsubmit =  ( event ) => {
            event.preventDefault();
            sendData(form);
        };
    }
}

export default EditInterview