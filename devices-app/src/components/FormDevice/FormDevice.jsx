import React from "react";

class FormDevice extends React.Component {
    render() {
        const { titleForm, handleSumbit, handleChange,  buttonName, device } = this.props;
        const { model, description, image, price, creator } = device;
        return (
            <div className="form-wrapper">
                <h1>{titleForm}</h1>
                <form onSubmit={handleSumbit} onChange={handleChange} >
                    <div className="form-group">
                        <label htmlFor="model">model</label>
                        <input
                            type="text"
                            name="model"
                            id="model"
                            placeholder="Enter Device model"
                            value={model}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            name="description"
                            id="description"
                            placeholder="Enter Device description"
                            value={description}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image URL</label>
                        <input
                            type="text"
                            name="image"
                            id="image"
                            placeholder="Enter Device image URL"
                            value={image}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="creator">Creator</label>
                        <input
                            type="text"
                            name="creator"
                            id="creator"
                            value={creator}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            placeholder="Enter Device price"
                            value={price}
                        />
                    </div>
                    <input type="submit" value={buttonName} />
                </form>
            </div>
        );
    }
}

export default FormDevice;