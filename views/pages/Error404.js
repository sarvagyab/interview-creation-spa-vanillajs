let Error404 = {
   render : async () => {
       let view =  /*html*/`
            <section class="section">
            <h1>No such Page exists</h1>
            <p>
                <a href="#/interviews">Please visit Homepage</a>
            </p>
            </section>
       `
       return view
   }
    , after_render: async () => {}

}

export default Error404;