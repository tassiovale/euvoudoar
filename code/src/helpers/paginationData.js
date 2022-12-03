const getTakeValueFromQuery = (query) => {

    const res = parseInt(query?.limit || process.env.DEFAULT_PAGE_SIZE)
    return res
}

const getSkipValueFromQuery = (query) => {
    return parseInt(query?.page || process.env.DEFAULT_PAGE_NUMBER)
    // * getTakeValueFromQuery(query)
}

export { getTakeValueFromQuery, getSkipValueFromQuery }