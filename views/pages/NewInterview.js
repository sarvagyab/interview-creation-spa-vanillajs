import GET from '../../GET.js'

let NewInterview = {

    render: async () => {
        let users = await GET('http://localhost:3000/users.json');

        return /*html*/ `
            <section class="section">
            <h1>Create a new interivew</h1>
            <form id="new_interview">

                <div id="notice-field"></div>
                <div id="errors-field"></div>

                <label for="name">Designation</label>
                <input type="text" id="name" name="name"><br />

                <p>
                    <label for="sdate">Start Date</label>
                    <input type="date" id="sdate" name="start_date"><br />
                </p>
                <p>
                    <label for="stime">Start Time</label>
                    <input type="time" id="etime" name="start_time"><br />
                </p>
                
                <p>
                    <label for="etime">End Time</label>
                    <input type="time" id="etime" name="end_time"><br />
                </p>

                <p>
                    <label for="resume">Attach Resume (Optional)</label>
                    <input type="file" accept="application/pdf" id="resume" name="resume"><br />
                </p>

                ${
                    users.map(user=> /*html*/ `
                        <input type="checkbox" name="interviewers[]" value="${user.id}">
                        <input type="radio" name="interviewee" value="${user.id}">
                        <label for="interviewers[${user.id}]">${user.name}</label><br>
                    `
                    ).join('\n')
                }
                
                <p>
                    <input type="submit" value="Create Interview">
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
        
            XHR.open( "POST", "http://localhost:3000/interviews.json" );
            
            XHR.onreadystatechange = (event)=>{
                if(XHR.readyState === XMLHttpRequest.DONE){
                    var status = XHR.status;
                    let responseJSON = JSON.parse(XHR.response);
                    if (status === 0 || (status >= 200 && status < 400)) {
                        let Notice = document.getElementById('notice-field');
                        Notice.innerHTML = responseJSON.notice
                    }
                    if(responseJSON.errors){
                        let Errors = document.getElementById('errors-field');
                        Errors.innerHTML = ""
                        for(let err of responseJSON.errors)Errors.innerHTML += `<p>${err}</p>`;
                    }
                }
            }
            
            XHR.send( FD );
        }
        const form = document.getElementById( "new_interview" );

        form.onsubmit =  ( event ) => {
            event.preventDefault();
            sendData(form);
        };
    }
}

export default NewInterview