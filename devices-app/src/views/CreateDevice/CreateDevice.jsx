import React from "react";
import withCustomForm from "../../hocs/with-data-from-service";
const CreateDevice = (props) => {
    const handleChange = ({ target }) => {
        const inputName = target.name;
        const inputValue = target.value;

        props.onChange(inputName, inputValue);
    };

    const handleSumbit = (e) => {
        e.preventDefault();
        props.onSubmit();
    };
    return (
        <div className="form-wrapper">
            <h1>Create New Device</h1>
            <form onSubmit={handleSumbit} onChange={handleChange}>
                <div className="form-group">
                    <label htmlFor="model">model</label>
                    <input
                        type="text"
                        name="model"
                        id="model"
                        placeholder="Enter Device model"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Enter Device description"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        id="image"
                        placeholder="Enter Device image URL"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="creator">Creator</label>
                    <input
                        type="text"
                        name="creator"
                        id="creator"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        placeholder="Enter Device price"
                    />
                </div>
                <input type="submit" value="Create" />
            </form>
        </div>
    );
}

export default withCustomForm('createDevice')(CreateDevice);