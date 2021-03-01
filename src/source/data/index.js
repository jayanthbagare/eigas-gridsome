const Airtable = require('airtable')

module.exports = function(api,opts){
    const base = new Airtable({apiKey:opts.apiKey}).base(opts.base);

    api.loadSource(async store => {
        cosnt contentType = store.addContentType({
            typeName:process.env.airtable_table,
            route:'basics/:slug',
        });

        await base('Data').select().eachPage((records,fetchNextPage) => {
            records.forEach((record) => {
                const item = record._rawJson;

                contentType.addNode({
                    id:item.id,
                    name:item.fields.Name,
                    state:item.fields.State,
                    websiteContent:item.fields.Website_Content,
                    photos:item.fields.Photos,
                    status:item.fields.Status,
                    cdnPhotoUrl:item.fields.CDN_Photo_URL,
                    altPhotos:item.fields.altPhotos,
                    altVideo:item.fields.Alt_Text_Video,
                    video:item.fields.Video,
                    changedOn:item.fields.Changed_On,
                    language:item.fields.language,
                    quote:item.fields.quote
                });
            });
            fetchNextPage();
        })
    });


}