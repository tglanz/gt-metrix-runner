const asyncTimeout = async timeout => new Promise(resolve => setTimeout(resolve, timeout));

module.exports = async ({
    client, url, location, browser
}) => {
    const {
        credits_left,
        test_id,
        poll_state_url
    } = await client.test.createAsync({
        url, location, browser
    });

    const {
        resources: {
            report_pdf_full,
            screenshot
        },

        results: {
            page_load_time,
            page_bytes,
            redirect_duration,
            pagespeed_score,
            backend_duration
        }
    } = await client.test.getAsync(test_id, 1000);

    return  {
        pdfUrl: report_pdf_full,

        pageScreenshot: screenshot,
        pageSizeInBytes: page_bytes,

        loadTime: page_load_time,
        redirectDuration: redirect_duration,
        backendDuration: backend_duration,
        score: pagespeed_score
    }
}