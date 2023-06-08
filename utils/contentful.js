import * as contentful from 'contentful';

export const client = contentful.createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.CONTENT_DELIVERY_TOKEN
})

export const previewClient = contentful.createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.CONTENT_PREVIEW_TOKEN,
    host: 'preview.contentful.com'
})