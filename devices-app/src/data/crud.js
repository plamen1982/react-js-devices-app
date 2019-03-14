const request = (method) => {
        return (url, data = {}, options = {}) => { 
            fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(data),
            ...options,
        });
    }
}

export const get = request("get");
export const post = request("post");
export const put = request("put");
export const remove = request("delete");
