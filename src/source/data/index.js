const Airtable = require('airtable')

module.exports = function(api,opts){
    const base = new Airtable({apiKey:opts.apiKey}).base(opts.base);

    api.loadSource(async store => {
        cosnt contentType = store.addContentType({
            typeName:process.env.airtable_table,
            route:'basics/:slug',
        });

        await base('Basic').select().eachPage((records,fetchNextPage) => {
            records.forEach((record) => {
                const item = record._rawJson;

                contentType.addNode({
                    id:item.id,
                    name:item.fields.Title,
                    notes:item.fields.Story,
                    attachments:item.fields.Cover_Photo_Web,
                    status:item.fields.Status,
                    cdnurl:item.fields.cdnurl,
                    language:item.fields.language
                });
            });
            fetchNextPage();
        })
    });


}