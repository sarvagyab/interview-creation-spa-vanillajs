import Parser from './../../parser.js'
import GET from './../../GET.js'

let ShowInterview = {

    render : async () => {
        let request = Parser.parseRequestURL()
        let interview = await GET(`http://localhost:3000/interviews/${request.id}.json`)
        return /*html*/`
            <section class="section">
                <h1>Interview Details</h1>
                <p>
                    <p>
                        <strong>Designation - </strong> ${interview.interview.name }<br />
                        <strong>Interviewee Name - </strong> ${interview.interviewee.name }
                        ${ interview.resume?("<strong><a href= \"http://localhost:3000" + interview.resume + "\">Resume</a></strong>"):"" }<br />

                        <strong>Date - </strong> ${Parser.parseDate(new Date(interview.interview.start_time))}<br />
                        <strong>Timings - </strong> ${Parser.parseTime(new Date(interview.interview.start_time))} -  ${Parser.parseTime(new Date(interview.interview.end_time))}<br />
                    </p>
                    <p>
                        <strong>Interviewers' Names - </strong><br />
                        <ul>
                        ${
                            interview.interviewers.map(interviewer=>
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

