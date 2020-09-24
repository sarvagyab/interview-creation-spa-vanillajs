import GET from '../../GET.js'
import Parser from '../../parser.js'

let EditUser = {

    render: async () => {
        let request = Parser.parseRequestURL();
        let user = await GET(`http://localhost:3000/users/${request.id}.json`);

        return /*html*/ `
            <section class="section">
            <h1>Edit user</h1>
            <form id="edit_user">

                <div id="notice-field"></div>
                <div id="errors-field"></div>
                <p>
                    <label for="name">Name :</label>
                    <input type="text" id="name" name="name" value="${user.name}"><br />
                </p>
                <p>
                    <label name="email">Email : </label>
                    <input type="text" name="email" id="email" value="${user.email}">
                </p>    
                <p>
                    <input type="submit" value="Edit User">
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
            XHR.open( "PATCH", `http://localhost:3000/users/${request.id}.json` );
            
            XHR.onreadystatechange = (event)=>{
                if(XHR.readyState === XMLHttpRequest.DONE){
                    var status = XHR.status;
                    let responseJSON = JSON.parse(XHR.response);
                    let Notice = document.getElementById('notice-field');
                    Notice.innerHTML = "";
                    let Errors = document.getElementById('errors-field');
                    Errors.innerHTML = "";
                    if (status === 0 || (status >= 200 && status < 400)) {
                        Notice.innerHTML = responseJSON.notice;
                    }
                    if(responseJSON.errors){
                        for(let err of responseJSON.errors)Errors.innerHTML += `<p>${err}</p>`;
                    }
                }
            }
            
            XHR.send( FD );
        }
        const form = document.getElementById( "edit_user" );

        form.onsubmit =  ( event ) => {
            event.preventDefault();
            sendData(form);
        };
    }
}

export default EditUser