import * as Pages from './views/Pages.js'
import Parser from './parser.js'

const routes = {
    '/'                     : Pages.ListInterviews
    , '/interviews'         : Pages.ListInterviews
    , '/interviews/new'     : Pages.NewInterview
    , '/interviews/:id'     : Pages.ShowInterview
    , '/interviews/:id/edit': Pages.EditInterview
};


const router = async () => {

    const content = null || document.getElementById('page_container');
    
    let request = Parser.parseRequestURL();

    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '');
    
    console.log("Parsed URL - " + parsedURL);

    let page = routes[parsedURL] ? routes[parsedURL] : Pages.Error404
    content.innerHTML = await page.render();
    await page.after_render();
  
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);