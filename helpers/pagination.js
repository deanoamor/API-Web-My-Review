module.exports = {
    pagination :  (page, size) => {
        const limit = size ? +size : 6;
        const offset = page ? page * limit : 0;
        return { limit, offset };
    }
}