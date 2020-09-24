import GET from '../../GET.js'

let NewUser = {

    render: async () => {
        return /*html*/ `
            <section class="section">
            <h1>Create a new user</h1>
            <form id="new_user">

                <div id="notice-field"></div>
                <div id="errors-field"></div>
                <p>
                    <label for="name">Name :</label>
                    <input type="text" id="name" name="name"><br />
                </p>
                <p>
                    <label name="email">Email : </label>
                    <input type="text" name="email" id="email">
                </p>    
                <p>
                    <input type="submit" value="Create User">
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
        
            XHR.open( "POST", "http://localhost:3000/users.json" );
            
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
        const form = document.getElementById( "new_user" );

        form.onsubmit =  ( event ) => {
            event.preventDefault();
            sendData(form);
        };
    }
}

export default NewUser