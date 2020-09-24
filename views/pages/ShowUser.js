import Parser from './../../parser.js'
import GET from './../../GET.js'

let ShowUser = {

    render : async () => {
        let request = Parser.parseRequestURL()
        let userDetails = await GET(`http://localhost:3000/users/${request.id}.json`)
        return /*html*/`
            <section class="section">
            <h1>User Detais</h1>

            <p><strong>User name - </strong>${userDetails.name}</p>
            <p><strong>User email - </strong>${userDetails.email}</p>
            
            </section>
        `
    }
    , after_render: async () => {
    }
}

export default ShowUser;

