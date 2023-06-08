export default function handler(req, res) {
    const { secret, slug } = req.query;
    console.log('slug', slug);

    if (secret !== process.env.secret || !slug) {
        res.status(401).json({ message: 'Invalid token'})
    }

    res.setPreviewData({});
    res.redirect(`/product/${slug}`);
}