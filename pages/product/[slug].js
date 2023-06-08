import * as contentful from '../../utils/contentful';

export default function ProductPage(props) {
    console.log('props', props);
    if (props.error) {
        return (
            <div>
                <h1>Error: {props.error}</h1>
            </div>
        )
    }
    return <h1>{props.title}</h1>
}

export async function getStaticPaths() {
    const products = await contentful.client.getEntries({
        content_type: 'product'
    });
    const paths = products.items.map((product) => ({
        params: {
            slug: product.fields.slug
        }
    }))
    console.log('paths: ', paths);
    
    return {
        fallback: false,
        paths,
    }
}

export async function getStaticProps(context) {
    // get data
    console.log('context: ', context.params);
    const client = context.preview 
        ? contentful.previewClient 
        : contentful.client;
    
    const product = await client.getEntries({
        content_type: 'product',
        limit: 1,
        "fields.slug": context.params.slug
    });
    
    return {
        props: {
            error: !product.items.length && `No product with ID: ${context.params.slug}`,
            ...product?.items?.[0]?.fields
        }
    }
}