const path = require('path');

const {

    email,
    apiKey,
    url,
    iterations,

    // with defaults
    appendTimestamp = false

} = require('./runOptions')();


const executeTest = require('./executeTest');
const appendQueryParam = require('./appendQueryParam');
const saveResults = require('./saveResults');

const baseOutputDirectory = path.normalize('output');

(async function(){
    try {
        const client = require('./createGtMetrixClient')({
            email,
            apikey: apiKey
        })

        const browsers = await client.browsers.listAsync();
        const locations = await client.locations.listAsync();

        let urlsResults = {};

        const timestamp = new Date().getTime();    

        const outputDirectory = path.join(baseOutputDirectory, timestamp.toString());

        const totalOperations = url.length * iterations;

        for (let urlIdx = 0; urlIdx < url.length; ++urlIdx){

            const currentUrl = url[urlIdx];        
            console.log(`${urlIdx + 1}. Working on url: ${currentUrl}`)
            
            const iterationsResults = [];

            for (let iterationIdx = 0; iterationIdx < iterations; ++iterationIdx){

                const urlToTest = appendTimestamp ? appendQueryParam(currentUrl, 'timestamp', new Date().getTime()) : currentUrl;
                const browserToTest = 3;
                const locationToTest = 1;


                console.log(`  Progress ${((urlIdx * iterations + iterationIdx) / totalOperations * 100).toFixed(1)}%`);
                console.log(`  Executing test iteration: ${iterationIdx + 1}`)

                const iterationResult = await executeTest({
                    client,
                    url: urlToTest,
                    browser: browserToTest,
                    location: locationToTest
                })

                iterationsResults.push({
                    index: iterationIdx,
                    testedUrl: urlToTest,                    
                    browser: browsers.filter(browser => browser.id == browserToTest)[0].name,
                    location: locations.filter(location => location.id == locationToTest)[0].name,

                    result: iterationResult
                })
            }

            urlsResults[currentUrl] = {
                iterations: iterationsResults
            }
        }

        console.log('');
        console.log(`Saving results into: ${outputDirectory}`)
        await saveResults(outputDirectory, urlsResults);
    } catch (error){
        console.error("An error has ocurred", error);
    }
}())