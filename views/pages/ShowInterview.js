import Parser from './../../parser.js'
import GET from './../../GET.js'

let ShowInterview = {

    render : async () => {
        let request = Parser.parseRequestURL()
        let interviewDetails = await GET(`http://localhost:3000/interviews/${request.id}.json`)
        return /*html*/`
            <section class="section">
                <h1>Interview Details</h1>
                <p>
                    <p>
                        <strong>Designation - </strong> ${interviewDetails.interview.name }<br />
                        <strong>Interviewee Name - </strong> ${interviewDetails.interviewee.name }
                        ${ interviewDetails.resume?("<strong><a href= " + interviewDetails.resume + ">Resume</a></strong>"):"" }<br />

                        <strong>Date - </strong> ${Parser.parseDate(interviewDetails.interview.start_time)}<br />
                        <strong>Timings - </strong> ${Parser.parseTime(interviewDetails.interview.start_time)} -  ${Parser.parseTime(interviewDetails.interview.end_time)}<br />
                    </p>
                    <p>
                        <strong>Interviewers' Names - </strong><br />
                        <ul>
                        ${
                            interviewDetails.interviewers.map(interviewer=>
                                /*html*/`
                                <p>
                                    <li>${interviewer.name}</li>
                                </p>
                                `
                            ).join('\n ')
                        }
                        </ul>
                    </p>

                </p>
            </section>
        `
    }
    , after_render: async () => {
    }
}

export default ShowInterview;

