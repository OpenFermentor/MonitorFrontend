const generateRandomId = () =>
    Math.floor(Date.now() * Math.random()).toString(36)

export default generateRandomId
